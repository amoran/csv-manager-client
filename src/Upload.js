import React,{Component} from 'react';
import axios from 'axios';
import prettyBytes from 'pretty-bytes';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import bsCustomFileInput from 'bs-custom-file-input';
import {withRouter} from 'react-router-dom';

import { API_BASE } from "./constants";

class Upload extends Component {

    state = {
        selectedFile: null
    };

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    onFileUpload = async () => {
        const formData = new FormData();

        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        try {
            await axios.post(API_BASE + "files", formData);
            this.props.history.push('/');
        } catch {

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
            <div>
                <div className="container mt-5">
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
                                    disabled={this.state.selectedFile === null}
                                    variant="primary"
                                    onClick={this.onFileUpload}
                                >
                                    Submit
                                </Button>
                            </div>
                            <div>
                                {this.fileData()}
                            </div>
                        </div>

                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(Upload);