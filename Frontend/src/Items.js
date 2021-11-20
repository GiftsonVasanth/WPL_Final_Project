import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppAppBar from './modules/views/AppAppBar';
import AppFooter from './modules/views/AppFooter';

 

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      border: `#DCDCDC`,
      background: '#DCDCDC',
      marginBottom: 10,
      marginTop : 10
    },
  });

export default function Dynamic() {

    const classes = useStyles();
    const [attractionData, setAttractionData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:9002/api/items')
            const attractionsData = await response.json()
            setAttractionData(attractionsData.slice(0, 15))
        }
        fetchData()
    }, [])

    return (
        <><AppAppBar /><Container>
            <Row>
                {attractionData.map((attractionData, k) => (
                    <Col key={k} xs={12} md={4} lg={3}>
                        <Card className={classes.root}>
                            <Card.Img variant="top" src="https://fastly.4sqi.net/img/general/200x200/7990081_d_2diKN7oPHt_6Eq-pjt3Fh7oWMwiRD3Ciu5hw-OZfk.jpg" />
                            <Card.Body>
                                <Card.Title>{attractionData.name}</Card.Title>
                                <Card.Text>
                                    {attractionData.location}
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container><AppFooter /></>
    )
}

/*
<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
*/