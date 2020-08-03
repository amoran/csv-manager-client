import React from 'react';

const ExportButton = (props) => {
    const handleClick = () => {
        props.onExport();
    };
    return (
        <div>
            <button className="btn btn-success" onClick={ handleClick }>Export CSV</button>
        </div>
    );
};

export default ExportButton