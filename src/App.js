import React from 'react';
import {
  Navbar,
  NavbarBrand,
  TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col,
  Spinner,
  Form, FormGroup, Label, Input
} from 'reactstrap';
import * as firebase from 'firebase';
import classnames from 'classnames';
import './App.css';
import { SecondTab } from './components/secondTab';

class App extends React.Component {
  state = {
    activeTab: '1',
    title: '',
    price: 0,
    type: 'Best Collection',
    imgUri: '',
    loading: false,
    bestCollections: [],
    womenColths: [],
    accessories: []
  };

  componentDidMount() {
    firebase.database().ref(`/products`).on('value', snap => {
      let data = snap.val();
      let accessories = [];
      let womenColths = [];
      let bestCollections = [];
      for(let key in data) {
        if(data[key].type === "Best Collection"){
          bestCollections.push({ ...data[key], key })
        }else if(data[key].type === "Women Cloths") {
          womenColths.push({ ...data[key], key });
        }else if(data[key].type === "Accessories") {
          accessories.push({ ...data[key], key });
        }
      }
      this.setState({ accessories, womenColths, bestCollections });
    });
  }

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
      this.setState({ loading: false, imageUri: null });
    } catch (err) {
      this.setState({ loading: false });
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
    const { type, bestCollections, womenColths, accessories } = this.state;
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
                Women Cloths
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '4' })}
                onClick={() => { this.toggle('4'); }}
              >
                Accessories
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
                        <option>Women Cloths</option>
                        <option>Accessories</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label for="image">Upload Image</Label>
                      <Input type="file" onChange={this.onImageChange} name="file" id="image" />
                    </FormGroup>
                    {
                      this.handleContent()
                    }
                  </Form>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <div style={{ paddingTop: '20px' }}>
                <Row>
                  {
                    bestCollections && bestCollections.length ?
                    bestCollections.map((data, ind) => <SecondTab {...data} key={ind} />)
                    : null
                  }
                </Row>
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div style={{ paddingTop: '20px' }}>
                <Row>
                  {
                    womenColths && womenColths.length ?
                    womenColths.map((data, ind) => <SecondTab {...data} key={ind} />)
                    : null
                  }
                </Row>
              </div>
            </TabPane>
            <TabPane tabId="4">
              <div style={{ paddingTop: '20px' }}>
                <Row>
                  {
                    accessories && accessories.length ?
                    accessories.map((data, ind) => <SecondTab {...data} key={ind} />)
                    : null
                  }
                </Row>
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default App;