import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import {API_BASE} from "./constants";
import FileData from "./components/FileData";

const Files = () => {

    let [files, setFiles] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let response = await axios.get(API_BASE + "files")
            setFiles(response.data)
        }
        getData();
    }, []);

    const getCards = () => {
        return files.map((file, index) => {
            return (
                <Card key={`${file.fileName}_${index}`}>
                    <FileData file={file} />
                </Card>
            )
        })
    }

    // const defaultKey = (files[0] || {})._id;
    return (
        <div>
            <Container fluid className="mt-5 mb-5">
                <Accordion>
                    {getCards()}
                </Accordion>
            </Container>

        </div>
    );

}

export default Files;
