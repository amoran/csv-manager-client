import React, {useState} from 'react';
import Spinner from "react-bootstrap/Spinner";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import pretty from 'pretty-date-js';
import prettyBytes from 'pretty-bytes';

import {API_BASE} from "../constants";

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ExportButton from "./ExportButton";

const { SearchBar } = Search;

const FileData = (props) => {
    const {file} = props;

    let [data, setData] = useState(null);

    const onToggleClick = async () => {
        if (data === null) {
            let response = await axios.get(API_BASE + "files/" + file._id);
            setData(response.data);
        }
    }

    let columns;
    if (data !== null) {
        columns = Object.keys(data[0])
            .map(key => {
                const hidden = key === '_id' || key === 'fileId'
                return {
                    hidden: hidden,
                    dataField: key,
                    text: key,
                    csvExport: !hidden,
                }
            });
    }

    let prettyDate = pretty(file.uploadDate);
    let prettyDateStr = prettyDate.value ?
        `${prettyDate.value} ${prettyDate.lang} ${prettyDate.misc}` :
        '';

    return (
        <>
            <Accordion.Toggle as={Card.Header} eventKey={`${file._id}`} onClick={onToggleClick}>
                <div className="spaceBetween">
                    <div><b>{file.fileName}</b> - {prettyBytes(file.size)}</div>
                    <div>{prettyDateStr}</div>
                </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={`${file._id}`}>
                <Card.Body className="mb-5">
                    {data === null ?
                        <Spinner animation="border" variant="primary"/> :
                        <ToolkitProvider
                            keyField="_id"
                            data={ data }
                            columns={ columns }
                            exportCSV
                            search
                        >
                            {
                                props =>
                                    <div>
                                        <div className="spaceBetween">
                                            <ExportButton { ...props.csvProps } />
                                            <SearchBar { ...props.searchProps } />
                                        </div>
                                        <hr />
                                        <BootstrapTable
                                            pagination={ paginationFactory() }
                                            {...props.baseProps}
                                        />
                                    </div>

                            }
                        </ToolkitProvider>
                    }
                </Card.Body>
            </Accordion.Collapse>
        </>
    )


}

export default FileData;
