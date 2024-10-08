// ModalComponent.js
import React from 'react';

const ModalComponent = ({ isOpen, onClose , Modal }) => {
  if (!isOpen) return null;

  return (
    <div className="modal fade show bd-example-modal-lg" tabIndex="-1" role="dialog" style={{ display: 'block',backgroundColor:'#00000080' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content" style={{maxHeight:'fit-content'}}>
          <div className="bg-primary d-flex justify-content-between modal-header p-4 text-white" style={{height:'0px'}}>
            <h5 className="modal-title" id="exampleModalLabel">{Modal?.Title}</h5>
            <button type="button" className="btn text-end text-white" onClick={onClose}>
            <span className="material-symbols-outlined" style={{fontSize:'26px'}}>
close
</span>
            </button>
          </div>
          <div className="modal-body" style={{maxHeight:'350px',overflowX:'auto'}}>
            <p dangerouslySetInnerHTML={{ __html:Modal?.Content }}></p>
          </div>
          
          { Modal.Action ? <><div className="modal-footer" >
           <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button><button type="button" className="btn btn-primary">Save changes</button></div></>  :""}
          
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
