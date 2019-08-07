import React from 'react';
import {
  Navbar,
  NavbarBrand,
  TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col,
  Spinner,
  Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import * as firebase from 'firebase';
import classnames from 'classnames';
import './App.css';

class App extends React.Component {
  state = {
    activeTab: '1',
    title: '',
    price: 0,
    type: 'Best Collection',
    imgUri: '',
    loading: false
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        imgUri: event.target.files[0]
      });
    }
  };

  uploadData = () => {
    const { title, imgUri, price, type } = this.state;
    if (title.length && imgUri && price && type) {
      this.setState({ loading: true }, () => {
        let formdata = new FormData();
        formdata.append('file', imgUri);
        formdata.append('cloud_name', 'atif786');
        formdata.append('upload_preset', 'e7bxdahf');
        formdata.append('api_key', '628766992677356');

        var xhr = new XMLHttpRequest();
        xhr.open('POST', "https://api.cloudinary.com/v1_1/cloud_name/image/upload", true);

        xhr.onload = function () {
          // do something to response
          if (xhr.status === 200) {
            var url = JSON.parse(xhr.responseText);
            this.uploadToFirebase(url.url);
          }
        }.bind(this);
        xhr.send(formdata);
      });
    } else {
      alert('Please submit all fields');
    }
  };

  uploadToFirebase = async (imageUri) => {
    const { title, price, type } = this.state;
    try {
      const resp = await firebase.database().ref(`products/`).push({ title, price, type, imageUri });
      this.setState({ loading: false });
      console.log(resp, "success  yahOooooooo");
    } catch (err) {
      this.setState({ loading: false });
      console.log(err, "errrrrrorrrrr");
    }

  };

  handleContent = () => {
    const { loading } = this.state;
    if (loading) {
      return <Spinner size="sm" color="primary" />
    } else {
      return <Button onClick={this.uploadData}>Add Product</Button>
    }
  }

  render() {
    const { type } = this.state;
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
                      <Input onChange={this.handleOnChange} type="text" name="title" id='title' placeholder="Enter title" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="price">Product Price</Label>
                      <Input onChange={this.handleOnChange} type="number" name="price" id="price" placeholder="Enter price" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="category">Select Product Category</Label>
                      <Input value={type} onChange={this.handleOnChange} type="select" name="type" id="category">
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
                    {
                      this.handleContent()
                    }
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



/*
uploadFile = (uri) => {
    let timestamp = (Date.now() / 1000 | 0).toString();
    let api_key = '628766992677356'
    let api_secret = 'j0AhW_lMX9zakkaA9ZT5MBLXfkE'
    let cloud = 'atif786'
    var PRESET_URL = "aheer_preset"
    let hash_string = 'timestamp=' + timestamp + api_secret
    let signature = hash_string.toString();
    let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'

    let xhr = new XMLHttpRequest();
    xhr.open('POST', upload_url);
    xhr.onload = () => {
      var url = xhr
      const res = url._response
      var cloudImgUrl = JSON.parse(res);
      this.optimizeImage(cloudImgUrl.url);


    };
    let formdata = new FormData();
    formdata.append('file', { uri: uri, type: 'image/png', name: 'upload.png' });
    formdata.append("upload_preset", PRESET_URL)
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', api_key);
    // formdata.append('signature', signature);
    xhr.send(formdata)
  }

*/