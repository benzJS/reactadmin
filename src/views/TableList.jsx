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
  FormFeedback,
  FormText,
  InputGroup,
  InputGroupAddon
} from "reactstrap";

class Tables extends React.Component {
  state = {
    data: [{}],
    searchResult: [{}],
    inputValue: '',
    modal: false,
    formData: {
      postBack: 'https://api.bdtnetworks.com/ZcYgkpHPvUu3zYlUbOOmPg/{sub_id}'
    }
  }

  myRef = React.createRef();

  async componentDidMount() {
    const href = this.props.href.split('/');
    const data = await (await fetch(`https://test.bdtnetworks.com/api/test/${href[href.length -1]}data`)).json();
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
    // const data = [...this.state.data];
    const result = this.state.data.filter(row => {
      return Object.values(row).some(value => value.toString().toLowerCase().includes(ev.target.value.toLowerCase()));
    })
    this.setState(() => {
      return {
        ...this.state,
        searchResult: result.length > 0 ? [...result] : [{}]
      }
    });
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  copyToClipboard = () => {
    console.log(this.myRef.current);
    // this.myRef.current.select();
    // document.execCommand('copy');
  }

  handleSubmit = async (ev) => {
    ev.persist();
    ev.preventDefault();

    // create XMLHttpRequest
    // const request = new XMLHttpRequest();
    // request.open('POST', 'https://test.bdtnetworks.com/api/test/networkexcute?mode=1', false);

    // generate request data
    let data = new FormData(ev.target);
    const { key } = await (await fetch('https://test.bdtnetworks.com/api/test/getkey')).json();
    data.append('Key', key);
    ev.target['Type'].value = 'banner' ? data.set('Type', 0) : data.set('Type', 1);

    let body = {};

    for(let k of data.keys()) {
      body[k] = data.get(k);
    }

    //send request
    fetch('https://test.bdtnetworks.com/api/test/networkexcute?mode=1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(() => this.componentDidMount())

    
  }

  render() {
    const href = this.props.href.split('/');
    return (
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4" style={{textTransform: 'capitalize'}}>{href[href.length - 1]}</CardTitle>
                  <CardTitle>
                    <Input placeholder="Search here" value={this.state.inputValue} onChange={this.onChange} onKeyUp={this.searchHandle}/>
                  </CardTitle>
                  <Button color="primary" onClick={this.toggle}>Add item</Button>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        {
                          Object.keys(this.state.searchResult[0]).map(key => {
                            return key === 'Response' || key === 'Type' || key === 'Date' ? (
                              <th className="text-center">{key}</th>
                            )
                            : (
                              <th>{key}</th>
                            )
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.searchResult.map(row => {
                          return (
                            <tr>
                              {Object.keys(row).map(key => {
                                return key === 'Response' || key === 'Type' || key === 'Date' ? (
                                  <td className="text-center">{row[key]}</td>
                                )
                                : (
                                  <td>{row[key]}</td>
                                )
                              })}
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
          <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
              <Form onSubmit={this.handleSubmit}>
                <ModalBody>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input style={{color: 'black'}} name="Name"/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Banner/Wall</Label>
                    <Input type="select" style={{color: 'black'}} name="Type">
                      <option value="banner">Banner</option>
                      <option value="wall">Wall</option>
                    </Input>
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
              </Form>
            </Modal>
          </div>
        </div>
    );
  }
}

export default Tables;
