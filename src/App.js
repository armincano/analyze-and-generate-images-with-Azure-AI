import React, { useState } from "react";
import analyzeImage from "./utils/azure-image-analysis";
import generateImage from "./utils/openai-image-generation";

function App() {
	const loadingScreen = (
		<div>
			<h1>Not image data</h1>
		</div>
	);
	const [inputValue, setInputValue] = useState("");
	const [result, setResult] = useState(loadingScreen);

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const displayedAnalysis = (jsonAnalysis) => {
		return (
			<div>
				<img src={inputValue} alt="ai generated" />
				<pre>{JSON.stringify(jsonAnalysis, null, 2)}</pre>
			</div>
		);
	};

  const displayedImage = (imgUrl, prompt) => {
    const imagePromptAndUrl = {prompt: prompt, url: imgUrl};
    console.log(imagePromptAndUrl);
		return (
			<div>
				<img src={imgUrl} alt="input" />;
				<pre>{JSON.stringify(imagePromptAndUrl, null, 2)}</pre>
			</div>
		);
	};

	const handleSubmit = async (e, buttonName) => {
		e.preventDefault();
		if (buttonName === "analyze") {
			const resp = await analyzeImage(inputValue);
			setResult(displayedAnalysis(resp));
		} else if (buttonName === "generate") {
			const resp = await generateImage(inputValue);
      setResult(displayedImage(resp, inputValue));
		}
	};

	return (
		<div>
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
		</div>
	);
}

export default App;
