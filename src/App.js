import React from 'react';
import {
  Navbar,
  NavbarBrand,
  TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col
} from 'reactstrap';
import './App.css';

class App extends React.Component {
  state = {
    activeTab: 1
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Strawberry Blonde</NavbarBrand>
        </Navbar>
        <div className="App-header">
          <Nav tabs>
            <NavItem>
              <NavLink
                onClick={() => { this.toggle('1'); }}
              >
                Add Product
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => { this.toggle('2'); }}
              >
                Best Colletions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => { this.toggle('3'); }}
              >
                Women
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
                <Col sm="6">
                  <Card body>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>Go somewhere</Button>
                  </Card>
                </Col>
                <Col sm="6">
                  <Card body>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>Go somewhere</Button>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <h4>Tab 3 Contents</h4>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default App;
