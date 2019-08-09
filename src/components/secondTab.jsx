import React from 'react';
import {
    CardImg,
    CardBody,
    CardSubtitle,
    Col,
    CardTitle,
    Card
  } from 'reactstrap';

export const SecondTab = ({ imageUri, title, price }) => 
  <Col sm="3">
    <Card style={{ marginTop: '20px' }}>
      <CardImg top width="100%" src={imageUri} alt="Card image cap" />
      <CardBody>
        <CardTitle style={{ color: '#000' }}>{title}</CardTitle>
        <CardSubtitle style={{ color: '#000' }}>€{price}</CardSubtitle>
        {/* <Button>Button</Button> */}
      </CardBody>
    </Card>
</Col>;