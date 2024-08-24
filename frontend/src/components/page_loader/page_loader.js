// Loader.js
import React from 'react';
import './pageloader.css'; // Import your CSS for styling

function PageLoader() {
  return (
    <>
    <div class="loader-container">
  <div class="custom-loader">
    <div class="loader-inner"></div>
    <div class="icon-wrapper">
      <span class="material-symbols-outlined">eco</span>
    </div>
  </div>
  <p className='loader_text'>NoteFlect Loading
  <div class="customloader"></div>
  </p>
</div>


</>
  );
}

export default PageLoader;
