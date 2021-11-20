import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      border: `2px solid red`,
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
        <Container>
            <Row>
                {attractionData.map((attractionData, k) => (
                    <Col key={k} xs={12} md={4} lg={3}>
                        <Card className={classes.root}>
                            <Card.Img variant="top" src="holder.js/100px180" />
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
        </Container>
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