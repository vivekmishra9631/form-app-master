// src/App.js
import React, { useState } from 'react';
import FormScreen from './FormScreen';
import SuccessScreen from './SuccessScreen';

const App = () => {
  const [screen, setScreen] = useState('form');
  const [formData, setFormData] = useState(null);

  return (
    <div>
      {screen === 'form' && <FormScreen setFormData={setFormData} setScreen={setScreen} />}
      {screen === 'success' && <SuccessScreen formData={formData} />}
    </div>
  );
};

export default App;
