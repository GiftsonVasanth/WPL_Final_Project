import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppAppBar from './modules/views/AppAppBar';
import AppFooter from './modules/views/AppFooter';
import { Pagination } from "@material-ui/lab";
import usePagination from "./pagination";

 

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

    let [page, setPage] = useState(1);
    const PER_PAGE = 24;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:9002/api/items')
            const attractionsData = await response.json()
            setAttractionData(attractionsData.slice(0, 100))
        }
        fetchData()
    }, [])

    const count = Math.ceil(attractionData.length / PER_PAGE);
    const _DATA = usePagination(attractionData, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        <><AppAppBar /><Container>
            <Row>
                {_DATA.currentData().map((attractionData, k) => (
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
            <Pagination
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
            />
        </Container><AppFooter /></>
    )
}
