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
    srchInputValue: ''
  }
  async componentDidMount() {
    const data = await (await fetch('https://test.bdtnetworks.com/api/test/networkdata')).json();
    this.setState(() => {
      return {
        data: JSON.parse(data)
      }
    })
  }
  searchHandle = (ev) => {
    
    return Object.values(row).some(value => value.toString().indexOf(this.state.srchInputValue) !== -1)
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
                    <Input placeholder="Search here" value={this.state.srchInputValue} onChange={this.searchHandle}/>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        {
                          Object.keys(this.state.data[0]).map(key => {
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
                        this.state.data.map(row => {
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
