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
                    This project is deployed in the cloud!  The frontend runs on <a href="https://firebase.google.com">Firebase</a> (within Google Cloud Platform) and the backend runs on Google App Engine (GAE).  The database is a mongodb cluster deployed to Google Cloud via <a href="https://www.mongodb.com/cloud/atlas">Atlas</a>
                </p>
                <div className="ml-3">
                    <b>Features:</b>
                    <ol>
                        <li>Upload .csv files</li>
                        <li>View previously uploaded .csv files with <b>upload date</b> and <b>size</b> information</li>
                        <li>Display contents of uploaded .csv files</li>
                        <ul>
                            <li>Contents are paged for easy viewing</li>
                            <li>Search capabilities for full-text search</li>
                            <li>Statistics on field uniqueness and date uniqueness</li>
                        </ul>
                        <li>Download previously uploaded .csv files</li>
                    </ol>
                </div>
                <p>
                    Apologies for any sluggishness: this application runs on the free tier instances with limited bandwidth, memory, and cpu resources.
                </p>
                <p>
                    <Button variant="primary" href="mailto:amorancs@gmail.com">Email Me!</Button>
                </p>
            </Jumbotron>

            <div style={{display: 'flex'}}>
                <Card className="m-2" style={{ width: '300px' }}>
                    <Card.Img variant="top" src="react.png" style={{width: '300px', padding: '50px'}}/>
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