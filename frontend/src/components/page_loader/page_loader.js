// Loader.js
import React from 'react';
import './pageloader.css'; // Import your CSS for styling

function PageLoader() {
  return (
    <>
    <div className="loader-container">
  <div className="custom-loader">
    <div className="loader-inner"></div>
    <div className="icon-wrapper">
      <span className="material-symbols-outlined">eco</span>
    </div>
  </div>
  <p className='loader_text'>NoteFlect Loading
  <div className="customloader"></div>
  </p>
</div>


</>
  );
}

export default PageLoader;
