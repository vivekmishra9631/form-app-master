import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensure the form container takes at least the full viewport height */
  background-color: #87ceeb; /* Sky Blue */
`;
const CardContainer = styled.div`
  background: linear-gradient(135deg, #0a4466, #00bcd4); /* Sea Blue to Cyan */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  max-width: 800px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2); /* Glass-like transparent white background */
  backdrop-filter: blur(10px); /* Apply a blur for better transparency effect */
  border: 1px solid rgba(255, 255, 255, 0.4); /* Optional: Add a border for better visibility */
`;


const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Distribute space evenly between children */
  width: 100%; /* Ensure the content container takes full width */
`;


const LeftColumn = styled.div`
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;  

const RightColumn = styled.div`
  padding: 20px;
  flex: 1;
`;

const FormField = styled.div`
  margin-bottom: 15px;

  label {
    font-weight: bold;
    margin-bottom: 5px;
    color: rgba(255, 255, 255, 0.8); /* Slightly transparent white */
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 8px;
    background-color: rgba(255, 255, 255, 0.2); /* Slightly transparent white background */
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 5px;
  }
`;

const SubmitButton = styled.button`
  padding: 15px;
  font-size: 18px;
  background-color: #ff4070;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%; /* Expand the button to the full width */
  margin-top: auto;
  margin: 20px 0 0; /* Center the button vertically and add top margin */
`;
const FormScreen = ({ setFormData, setScreen }) => {
  const [formData, setLocalFormData] = useState({
    authorizationKey: '',
    title: '',
    description: '',
    tags: '',
    date: '',
    software: '',
    thumbnail: null,
    sourceFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    setLocalFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (
      !formData.authorizationKey ||
      !formData.title ||
      !formData.description ||
      !formData.tags
    ) {
      alert('Please fill out all required fields');
      return;
    }

    try {
      // Use Axios to handle form submission
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post('http://www.example.com', formDataToSend);

      // Handle success response, you can update state or navigate to the success screen
      setFormData(formData);
      setScreen('success');
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle error, show error message to the user
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <CardContainer>
            
          <ContentContainer>
            <LeftColumn>
              <FormField>
                <label htmlFor="authorizationKey">Authorization Key *</label>
                <input
                  type="text"
                  name="authorizationKey"
                  value={formData.authorizationKey}
                  onChange={handleInputChange}
                  required
                />
              </FormField>
              <FormField>
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </FormField>
              <FormField>
                <label htmlFor="description">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </FormField>
            </LeftColumn>
            <RightColumn>
              <FormField>
                <label htmlFor="tags">Tags *</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  required
                />
              </FormField>
              <FormField>
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </FormField>
              <FormField>
                <label htmlFor="software">Software</label>
                <select
                  name="software"
                  value={formData.software}
                  onChange={handleInputChange}
                >
                  <option value="">Select Software</option>
                  {/* Add software options */}
                </select>
              </FormField>
              <FormField>
                <label htmlFor="thumbnail">Thumbnail Image</label>
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </FormField>
              <FormField>
                <label htmlFor="sourceFile">Source File</label>
                <input
                  type="file"
                  name="sourceFile"
                  accept=".pdf, .doc, .docx"
                  onChange={handleFileUpload}
                />
              </FormField>
              <SubmitButton type="submit">Submit</SubmitButton>
            </RightColumn>
          </ContentContainer>
          
        </CardContainer>
      </FormContainer>
    </form>
  );
};

export default FormScreen;
