// src/SuccessScreen.js
import React from 'react';

const SuccessScreen = ({ formData }) => {
  return (
    <div>
      <h2>Form Submitted Successfully!</h2>
      <p>Name: {formData.name}</p>
      <p>Email: {formData.email}</p>
      {/* Display other form data as needed */}
    </div>
  );
};

export default SuccessScreen;
