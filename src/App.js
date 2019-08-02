import React from 'react';
import {
  Navbar,
  NavbarBrand,
  TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col,
  Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import classnames from 'classnames';
import './App.css';

class App extends React.Component {
  state = {
    activeTab: '1'
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        image: URL.createObjectURL(event.target.files[0])
      });
    }
   };

  render() {
    return (
      <div className="App">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Strawberry Blonde</NavbarBrand>
          <img style={{ width: 50 }} src={require('./assets/strawberry.png')} />
        </Navbar>
        <div className="App-header">
          <Nav tabs>
            <NavItem>
              <NavLink
                 className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Add Product
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
               className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Best Colletions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
               className={classnames({ active: this.state.activeTab === '3' })}
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
                  <Form style={{ paddingTop: 20 }}>
                    <FormGroup>
                      <Label for="title">Product Title</Label>
                      <Input type="text" name="title" id='title' placeholder="Enter title" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="price">Product Price</Label>
                      <Input type="number" name="price" id="price" placeholder="Enter price" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="category">Select Product Category</Label>
                      <Input type="select" name="select" id="category">
                        <option>Best Collection</option>
                        <option>Women</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="image">Upload Image</Label>
                      <Input type="file" onChange={this.onImageChange} name="file" id="image" />
                      {/* <FormText color="muted">
                        This is some placeholder block-level help text for the above input.
                        It's a bit lighter and easily wraps to a new line.
                      </FormText> */}
                    </FormGroup>
                    <Button>Add Product</Button>
                  </Form>
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
