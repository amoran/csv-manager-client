import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import prettyBytes from 'pretty-bytes';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Container from "react-bootstrap/Container";
import bsCustomFileInput from 'bs-custom-file-input';

import { API_BASE } from "../util/constants";

class Upload extends Component {

    state = {
        selectedFile: null,
        processing: false
    };

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    onFileUpload = async () => {
        this.setState({processing: true});
        const formData = new FormData();

        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        try {
            await axios.post(API_BASE + "files", formData);
            this.props.history.push('/');
        } catch (error) {
            alert(error);
        }
    };

    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <span>{prettyBytes(this.state.selectedFile.size)} - </span>
                    <span>
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </span>
                </div>
            );
        }
    };

    componentDidMount() {
        bsCustomFileInput.init()
    }

    render() {
        return (
            <Container fluid className="mt-5">
                <h3>
                    Upload a new file
                </h3>
                <Form>
                    <Form.File
                        id="custom-file"
                        label="Choose File"
                        onChange={this.onFileChange}
                        custom
                    />
                    <div className="spaceBetween mt-3">
                        <div>
                            <Button
                                disabled={this.state.selectedFile === null || this.state.processing}
                                variant="primary"
                                onClick={this.onFileUpload}
                            >
                                {this.state.processing ?
                                    <span>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />{" "}
                                        Processing File...
                                    </span> :
                                    "Submit"}
                            </Button>
                        </div>
                        <div>
                            {this.fileData()}
                        </div>
                    </div>

                </Form>
            </Container>
        );
    }
}

export default withRouter(Upload);