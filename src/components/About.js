import React from 'react';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import {Link} from "react-router-dom";

const About = () => {
    return (
        <Container className="mt-5">
            <Jumbotron>
                <h1>About this Project</h1>
                <p>
                    This is a clean and simple CSV Management App. Visit the <Link to="upload">Upload</Link> page to Upload your first CSV! The <Link to="/">Home</Link> page will show all of the CSV files you've previously uploaded.
                </p>
                <p>
                    <Button variant="primary" href="mailto:amorancs@gmail.com">Email Me!</Button>
                </p>
            </Jumbotron>

            <div style={{display: 'flex'}}>
                <Card className="m-2" style={{ width: '300px' }}>
                    <Card.Img variant="top" src="react.png" style={{width: '300px'}}/>
                    <Card.Body>
                        <Card.Title>Frontend Codebase</Card.Title>
                        <Card.Text>
                            Built in React and available at <a href="https://csvmanager.com">csvmanager.com</a>
                        </Card.Text>
                        <Button variant="primary" href="https://github.com/amoran/csv-manager-client">Github</Button>
                    </Card.Body>
                </Card>
                <Card className="m-2" style={{ width: '300px' }}>
                    <Card.Img variant="top" src="nodejs.png" style={{width: '300px'}}/>
                    <Card.Body>
                        <Card.Title>Backend Codebase</Card.Title>
                        <Card.Text>
                            Built in NodeJS with Express and backed by Mongo db.
                        </Card.Text>
                        <Button variant="primary" href="https://github.com/amoran/csv-manager-server">Github</Button>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default About;