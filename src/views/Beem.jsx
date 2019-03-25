import React, { Component } from 'react';

import { 
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    Button,
    CardTitle,
    CardText,
    CardImg,
    CardBody,
    CardSubtitle,
    Row,
    Col
} from 'reactstrap';
import classnames from 'classnames';

class Beem extends Component {
    state = {
        activeTab: '2',
        campaign: []
    }

    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentDidMount() {
        fetch('https://test.bdtnetworks.com/api/test/campaigndata')
            .then(res => res.json())
            .then(data => this.setState({campaign: JSON.parse(data)}));
    }

    render() {
        return (
            <div className="content">
                <Nav tabs style={{cursor: 'pointer'}}>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}
                        >
                        Banner
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}
                        >
                        Walls
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <h4>Tab 1 Contents</h4>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        {
                            this.state.campaign.map(item => {
                                return (
                                    <Col sm="3">
                                        <Card>
                                            <CardBody>
                                                <CardTitle>
                                                    <h4>
                                                        {item.CamName}
                                                    </h4>
                                                </CardTitle>
                                                <CardSubtitle>
                                                    Point: {item.Point}
                                                </CardSubtitle>
                                                <Button>Go somewhere</Button>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </TabPane>
                </TabContent>
            </div>
        )
    }
}

export default Beem;