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
  Col
} from "reactstrap";

class Tables extends React.Component {
  state = {
    data: [{}],
    searchResult: [{}],
    inputValue: ''
  }

  async componentDidMount() {
    const data = await (await fetch('https://test.bdtnetworks.com/api/test/networkdata')).json();
    this.setState(() => {
      return {
        ...this.state,
        data: JSON.parse(data),
        searchResult: JSON.parse(data)
      }
    })
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
      return Object.values(row).some(value => value.toString().includes(ev.target.value));
    })
    this.setState(() => {
      return {
        ...this.state,
        searchResult: result.length > 0 ? [...result] : this.state.data
      }
    });
  }

  render() { 
    return (
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Networks</CardTitle>
                  <CardTitle>
                    <Input placeholder="Search here" value={this.state.inputValue} onChange={this.onChange} onKeyUp={this.searchHandle}/>
                  </CardTitle>
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
        </div>
    );
  }
}

export default Tables;
