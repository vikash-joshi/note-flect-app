// FullScreenSpinner.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const FullScreenSpinner = () => {
  return (
    <div style={fullscreenSpinnerStyles}>
      <ClipLoader color="#3498db" size={60} />
    </div>
  );
};

const fullscreenSpinnerStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

export default FullScreenSpinner;
