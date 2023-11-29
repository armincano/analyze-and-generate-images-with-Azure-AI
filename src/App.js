import React, { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${inputValue} was Submitted!`);
    setInputValue(''); // Clear the input field after submission
  };

  return (
    <div>
      <h1>Computer Vision</h1>
      <p>Insert URL to analyze image, or type a prompt to generate an image:</p>
      <form onSubmit={handleSubmit}>
        <label>
          input:
          <input type="text" value={inputValue} onChange={handleInputChange}/>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;