import React, { useState } from "react";
import analyzeImage from "./utils/azure-image-analysis";
import generateImage from "./utils/openai-image-generation";

function App() {

  function isConfigured() {
    return process.env.REACT_APP_AZURE_COMPUTER_VISION_API_KEY && process.env.REACT_APP_AZURE_COMPUTER_VISION_API_ENDPOINT && process.env.REACT_APP_OPENAI_API_KEY;
  }

	const loadingScreen = (
		<div>
			<h1>Generating...</h1>
		</div>
	);
	const [inputValue, setInputValue] = useState("");
	const [result, setResult] = useState(<h1>Not image data</h1>);

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const displayedAnalysis = (jsonAnalysis) => {
		return (
			<div>
				<img className="vision-image" src={inputValue} alt="ai generated" />
				<pre>{JSON.stringify(jsonAnalysis, null, 2)}</pre>
			</div>
		);
	};

  const displayedImage = (imgUrl, prompt) => {
    const imagePromptAndUrl = {prompt: prompt, url: imgUrl};
		return (
			<div>
				<img className="vision-image" src={imgUrl} alt="input" />
				<pre>{JSON.stringify(imagePromptAndUrl, null, 2)}</pre>
			</div>
		);
	};

	const handleSubmit = async (e, buttonName) => {
		e.preventDefault();
		if (buttonName === "analyze") {
      setResult(loadingScreen);
			const resp = await analyzeImage(inputValue);
			setResult(displayedAnalysis(resp));
		} else if (buttonName === "generate") {
      setResult(loadingScreen);
			const resp = await generateImage(inputValue);
      setResult(displayedImage(resp, inputValue));
		}
	};

	return (
    <div>
      {isConfigured() ? <div>
			<h1>Computer Vision</h1>
			<p>Insert URL to analyze image, or type a prompt to generate an image:</p>
			<form onSubmit={(e) => handleSubmit(e, "analyze")}>
				<label>
					input:
					<input type="text" value={inputValue} onChange={handleInputChange} />
				</label>
				<button type="submit">Analyze</button>
				<button type="button" onClick={(e) => handleSubmit(e, "generate")}>
					Generate
				</button>
			</form>
			<hr></hr>
			{result}
		</div> : <h2>Key and/or endpoint not configured for cognitive services</h2>}

    </div>
		
	);
}

export default App;
