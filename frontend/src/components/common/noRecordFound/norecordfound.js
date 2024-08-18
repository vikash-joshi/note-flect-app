import React from 'react';
import './NoRecordFound.css'; // External CSS for styling

const NoRecordFound = () => {
    return (


<div className="no-record-card">
    <div className="no-record-icon">
        <img src="https://careergraph.com/assets/images/global/no-record-found.png" style={{width: '90%'}} />
        </div>
        <div className="no-record-content">
            <h2>Opps! No Records Found</h2>
            <p>It seems like there are no records available at the moment. Please check back later.</p>
            </div>
            </div>
    );
};

export default NoRecordFound;

        {/*<div className="no-record-card">
            <div className="no-record-icon"><span className="material-symbols-outlined">
folder_open
</span></div>
            <div className="no-record-content">
                <h2>No Records Found</h2>
                <p>It seems like there are no records available at the moment. Please check back later.</p>
            </div>
        </div>*/}
