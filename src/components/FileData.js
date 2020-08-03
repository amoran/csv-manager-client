import React, {useState} from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import pretty from 'pretty-date-js';
import prettyBytes from 'pretty-bytes';

import {API_BASE} from '../util/constants';
import ExportButton from './ExportButton';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

const { SearchBar } = Search;

const FileData = (props) => {
    const {file} = props;

    let [data, setData] = useState(null);
    let [stats, setStats] = useState(null);
    let [dateStats, setDateStats] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showExtraMessage, setShowExtraMessage] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const onToggleClick = async () => {
        if (data === null) {
            setTimeout(() => {
                setShowExtraMessage(true);
            }, 7000)
            let response = await axios.get(API_BASE + 'files/' + file._id + '/rows');
            setData(response.data);
        }
    }

    let columns;
    if (data !== null && data.length > 0) {
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

    const getBodyContent = () => {
        if (data === null) {
            return (
                <span>
                    <Spinner animation='border' variant='primary'/>
                    {showExtraMessage ? " This is a large file... a few more seconds..." : ""}
                </span>
            );
        } else if (data.length === 0) {
            return <div>No data found</div>
        } else {
            return (
                <ToolkitProvider
                    keyField='_id'
                    data={ data }
                    columns={ columns }
                    exportCSV
                    search
                >
                    {
                        props =>
                            <div>
                                <div className='spaceBetween'>
                                    <div>
                                        <ExportButton { ...props.csvProps } />
                                        <Button className="ml-2" onClick={handleShow}>Statistics</Button>
                                    </div>
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
            )
        }
    }

    const getStatistics = () => {
        if (data === null || data.length === 0) {
            return "No Stats to show";
        }

        let orgData = {};
        let dateData = {};
        if (!stats) {
            data.forEach(row => {
                Object.keys(row).forEach(key => {
                    if (key === '_id' || key === 'fileId') return;
                    if (orgData[key]) {
                        orgData[key].add(row[key])
                    } else {
                        orgData[key] = new Set();
                        orgData[key].add(row[key])
                    }

                    if (key === 'date') {
                        let fullYear = (new Date(row.date)).getFullYear();
                        if (dateData[fullYear]) {
                            dateData[fullYear] += 1;
                        } else {
                            dateData[fullYear] = 1;
                        }
                    }

                })
            });
            setStats(orgData);
            setDateStats(dateData);
        } else {
            orgData = stats;
            dateData = dateStats;
        }

        return (
            <div>
                <div>Unique counts:</div>
                {Object.keys(orgData).map(key => {
                    return (
                        <div key={key}>
                            <b>{key}: </b>
                            <span>{orgData[key].size}</span>
                        </div>
                    );
                })}
                <br />
                {Object.keys(dateData).length > 0 ? <div>Date counts:</div> : ''}
                {Object.keys(dateData).map(key => {
                    return (
                        <div key={key}>
                            <b>{key}: </b>
                            <span>{dateData[key]}</span>
                        </div>
                    );
                })}
            </div>
        )
    }

    return (
        <>
            <Accordion.Toggle as={Card.Header} eventKey={`${file._id}`} onClick={onToggleClick}>
                <div className='spaceBetween'>
                    <div><b>{file.fileName}</b> - {prettyBytes(file.size)}</div>
                    <div>{prettyDateStr}</div>
                </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={`${file._id}`}>
                <Card.Body className='mb-5'>
                    {getBodyContent()}
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Statistics for <b>{file.fileName}</b></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{getStatistics()}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Accordion.Collapse>
        </>
    )
}

export default FileData;
