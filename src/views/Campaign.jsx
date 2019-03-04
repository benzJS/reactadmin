import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

class Tables extends React.Component {
  state = {
    data: [{}]
  }
  async componentDidMount() {
    const data = await (await fetch('https://test.bdtnetworks.com/api/test/campaigndata')).json();
    this.setState(() => {
      return {
        data: JSON.parse(data)
      }
    })
  }
  render() { 
    return (
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Campaign</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" bordered responsive>
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
                              {Object.values(row).map(value => {
                                return typeof value === 'number' ? (
                                  <td className="text-center">{value}</td>
                                )
                                : (
                                  <td>{value}</td>
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
