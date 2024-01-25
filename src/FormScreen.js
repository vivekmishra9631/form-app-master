import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensure the form container takes at least the full viewport height */
  background-color: #171f38;
`;

// const Circle = styled.div`
//  position: relative;
//   bottom: 50%; /* Position 50% below the bottom of the card */
//   right: 25%; /* Position 25% to the right of the card's right edge */
//   width: 200px;
//   height: 200px;
//   background-color: #fb6ca1;
//   border-radius: 50%;
//   overflow: hidden; 

//   /* Clip the circle to the card container's boundaries */
//   clip-path: inset(0 0 50% 0); /* Clip the top and left edges */
// `;

const CardContainer = styled.div`
  background: #242e4c;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  ${"" /* display: flex; */}
  max-width: 1200px;
  width: 100%;
  ${
    "" /* background-color: rgba(250, 255, 255, 0.25); 
  backdrop-filter: blur(10px);  */
  }
  ${"" /* border: 1px solid rgba(255, 255, 255, 0.2);  */}
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
    
    margin-bottom: 5px;
    color: rgba(255, 255, 255, 0.8);
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 8px;
    background-color: inherit;
    border: 2px solid #171f38;
    border-radius: 4px;
    margin-top: 5px;
    color: #f5f5f5;

    &:focus {
      border-color: #fb6ca1; /* Pink color for focus */
      -webkit-box-shadow: 0 0 0 1px rgba(250, 109, 170, 0.5);
      box-shadow: 0 0 0 1px rgba(250, 109, 170, 0.5);
    }

    &:focus-visible {
      outline: 0.5px solid #fb6ca1; /* Add a visible outline for keyboard focus */
    }
  }
`;

const SubmitButton = styled.button`
  padding: 15px;
  font-size: 18px;
  background-color: #f56daa;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  /* Center the button horizontally */
  width: 40%;
  margin: 0 auto;
  display: block; /* Ensure button takes full width */
`;

const FormScreen = ({ setFormData, setScreen }) => {
  const [formData, setLocalFormData] = useState({
    authorizationKey: "",
    title: "",
    description: "",
    tags: "",
    date: "",
    software: "",
    thumbnail: null,
    sourceFile: null,
  });

  const [isAuthorizationKeyVisible, setIsAuthorizationKeyVisible] =
    useState(false);

  const toggleAuthorizationKeyVisibility = () => {
    setIsAuthorizationKeyVisible(!isAuthorizationKeyVisible);
  };

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
      alert("Please fill out all required fields");
      return;
    }

    try {
      // Use Axios to handle form submission
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post(
        "http://www.example.com",
        formDataToSend
      );

      // Handle success response, you can update state or navigate to the success screen
      setFormData(formData);
      setScreen("success");
    } catch (error) {
      console.error("Form submission error:", error);
      // Handle error, show error message to the user
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <CardContainer>
          {/* <Circle /> */}
          <ContentContainer>
            <LeftColumn>
              <FormField>
                <label htmlFor="authorizationKey">Authorization Key *</label>
                <input
                  type={isAuthorizationKeyVisible ? "text" : "password"} // Use password type initially
                  name="authorizationKey"
                  value={formData.authorizationKey}
                  onChange={handleInputChange}
                  required
                />
                <button onClick={toggleAuthorizationKeyVisibility}>
                  {isAuthorizationKeyVisible ? "Hide" : "Show"}
                </button>
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
                  rows={8} /* Adjust the number of visible rows as needed */
                  style={{
                    height: "200px",
                  }} /* Alternatively, set a fixed height */
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
                  required
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
                  <option value="invision">InVision</option>
                  <option value="figma">Figma</option>
                  <option value="sketch">Sketch</option>
                </select>
              </FormField>
              <FormField>
                <label htmlFor="thumbnail">Thumbnail Image</label>
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleFileUpload}
                  required
                />
              </FormField>
              <FormField>
                <label htmlFor="sourceFile">Source File</label>
                <input
                  type="file"
                  name="sourceFile"
                  accept=".pdf, .doc, .docx"
                  onChange={handleFileUpload}
                  required
                />
              </FormField>
            </RightColumn>
          </ContentContainer>
          <SubmitButton type="submit">Submit</SubmitButton>
        </CardContainer>
      </FormContainer>
    </form>
  );
};

export default FormScreen;
