import React from 'react';

const ExportButton = (props) => {
    const handleClick = () => {
        props.onExport();
    };

    return (
        <button className="btn btn-success" onClick={ handleClick }>Export CSV</button>
    );
};

export default ExportButton