import React from 'react'
import { Col, Row, Card } from 'react-bootstrap'
import Test from '../assets/Home/testpic.png'
import './ProfileCards.css'
function ProfileCards () {
  return (
    
    <div class="container" style={{ marginTop:'40px'}}>
      <div className="box">dddd</div>







      
      <Row xs={1} md={2} lg={4} className="g-4">
  {Array.from({ length: 12 }).map((_, idx) => (
    <Col>
      <Card className ="box:hover">
        <Card.Body>
        <Card.Img style={{ borderRadius: 150 }} variant="top" src={Test} />
        <hr/>
          <Card.Title>Username</Card.Title>
          <Card.Text>
            Userprofile
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
    </div>
  )
}

export default ProfileCards