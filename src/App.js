import React, { useState } from "react";
import analyzeImage from "./utils/azure-image-analysis";

function App() {
  const loadingScreen = (
		<div>
			<h1>Not image data</h1>
		</div>
	);
	const [inputValue, setInputValue] = useState("");
	const [analysisResult, setAnalysisResult] = useState(loadingScreen);

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

  const displayedData = (resp) => {
    return <div>
      <img src={inputValue} alt="input" />
      <pre>{JSON.stringify(resp, null, 2)}</pre>
      </div>
  }

	const handleSubmit = async (e) => {
		e.preventDefault();
    const resp = await analyzeImage(inputValue)
		setAnalysisResult(displayedData(resp));
	};

	return (
		<div>
			<h1>Computer Vision</h1>
			<p>Insert URL to analyze image, or type a prompt to generate an image:</p>
			<form onSubmit={handleSubmit}>
				<label>
					input:
					<input type="text" value={inputValue} onChange={handleInputChange} />
				</label>
				<button type="submit">Submit</button>
			</form>
			<hr></hr>
			{analysisResult}
		</div>
	);
}

export default App;
