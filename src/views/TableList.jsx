import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Input,
  Row,
  Col,
  Button, 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  ButtonGroup
} from "reactstrap";

class Tables extends React.Component {
  state = {
    href: this.props.href.split('/').find((_, index, arr) => index === arr.length -1),
    data: [{}],
    searchResult: [{}],
    inputValue: '',
    modal: false,
    modalData: {
      title: 'Add new item',
      name: '',
      type: 'banner',
      action: 'Submit',
      submit: (ev) => this.handleSubmit(ev, 1)
    }
  }

  myRef = React.createRef();

  async componentDidMount() {
    // const href = this.props.href.split('/');
    const data = await (await fetch(`https://test.bdtnetworks.com/api/test/${this.state.href}data`)).json();
    this.setState(() => {
      return {
        ...this.state,
        data: JSON.parse(data),
        searchResult: JSON.parse(data)
      }
    });
  }

  onChange = (ev) => {
    ev.persist();
    this.setState(() => {
      return {
        ...this.state,  
        inputValue: ev.target.value
      }
    })
  }

  searchHandle = (ev) => {
    ev.persist();

    const result = this.state.data.filter(row => {
      return Object.values(row).some(value => value.toString().toLowerCase().includes(ev.target.value.toLowerCase()));
    })

    this.setState(() => {
      return {
        ...this.state,
        searchResult: result.length > 0 ? [...result] : [{}] // render table with result data
      }
    });
  }

  toggle = () => { // modal toggle handler
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSubmit = async (ev, mode, id = -1) => {
    ev.persist();
    ev.preventDefault();

    // generate request data
    let data = new FormData(ev.target);
    const { key } = await (await fetch('https://test.bdtnetworks.com/api/test/getkey')).json();
    data.append('Key', key);
    // ev.target['Type'].value = 'banner' ? data.set('Type', 1) : data.set('Type', 0);

    // create body
    let body = `https://test.bdtnetworks.com/api/test/${this.state.href}excute?`;
    if(id !== -1) {
      body = body.concat(`ID=${id}`, '&');
      data.delete('Key');
    }
    for(let k of data.keys()) {
      body = body.concat(k, '=', data.get(k), '&');
    } console.log(body.concat(`mode=${mode}`));
    
    // send request
    fetch(body.concat(`mode=${mode}`))
      .then(() => this.componentDidMount())
  }

  updateBtnClickHandle(id) {
    if(id !== -1) {
      const item = this.state.data.find(item => item.ID === id);
      this.setState(() => {
        return {
          ...this.state,
          modalData: {
            title: 'Edit',
            name: item.Name,
            type: item.Type,
            action: 'Edit',
            submit: (ev) => this.handleSubmit(ev, 2, id)
          }
        }
      });
    } else {
      this.setState(() => {
        return {
          ...this.state,
          modalData: {
            title: 'Add new item',
            name: '',
            type: 'banner',
            action: 'Submit',
            submit: (ev) => this.handleSubmit(ev, 1)
          }
        }
      });
    }
    this.toggle();
  }

  delBtnClickHandle(id) {
    //eslint-disable-next-line
    confirm('Sure?') && fetch(`https://test.bdtnetworks.com/api/test/${this.state.href}excute?ID=${id}&mode=3`)
      .then(() => this.componentDidMount());
  }

  render() {
    const href = this.props.href.split('/');
    const { modalData } = this.state;
    return (
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4" style={{textTransform: 'capitalize'}}>{href[href.length - 1]}
                  </CardTitle>
                  <CardTitle>
                    <Input placeholder="Search here" value={this.state.inputValue} onChange={this.onChange} onKeyUp={this.searchHandle}/>
                  </CardTitle>
                  <Button color="primary" onClick={this.updateBtnClickHandle.bind(this, -1)}>Add item</Button>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter">
                    <thead className="text-primary">
                      <tr>
                        {
                          Object.keys(this.state.searchResult[0]).map(key => {
                            if(key !== 'LinkIF' && key !== 'Pars') {
                              return key === 'Response' || key === 'Type' || key === 'Date' ? (
                                <th className="text-center">{key}</th>
                              )
                              : (
                                <th>{key}</th>
                              )
                            }
                          })
                        }
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.searchResult.map(row => {
                          return (
                            <tr>
                              {Object.keys(row).map(key => {
                                if(key !== 'LinkIF' && key !== 'Pars') {
                                  return key === 'Response' || key === 'Type' || key === 'Date' ? (
                                    <td className="text-center">{row[key]}</td>
                                  )
                                  : (
                                    <td>{row[key]}</td>
                                  )
                                }
                              })}
                              { row['ID'] && // we don't want these btn below to be rendered when search result is empty
                                <td className="text-center">
                                  <ButtonGroup>
                                    <Button onClick={this.updateBtnClickHandle.bind(this, row['ID'])}><i class="tim-icons icon-pencil"/></Button>
                                    <Button onClick={this.delBtnClickHandle.bind(this, row['ID'])}><i class="tim-icons icon-trash-simple"/></Button>
                                  </ButtonGroup>
                                </td>
                              }
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>{modalData.title}</ModalHeader>
              <Form onSubmit={modalData.submit}>
                <ModalBody>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input style={{color: 'black'}} name="Name" defaultValue={modalData.name} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Banner/Wall</Label>
                    <Input type="select" style={{color: 'black'}} name="Type" defaultValue={modalData.type}>
                      <option value="1">Banner</option>
                      <option value="0">Wall</option>
                    </Input>
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" color="primary" onClick={this.toggle}>{modalData.action}</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
              </Form>
            </Modal>
        </div>
    );
  }
}

export default Tables;
