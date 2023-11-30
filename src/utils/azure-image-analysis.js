async function analyzeImage(imageUrl) {

    const key = process.env.REACT_APP_AZURE_COMPUTER_VISION_API_KEY;
    const endpoint = process.env.REACT_APP_AZURE_COMPUTER_VISION_API_ENDPOINT;
    const visualFeatures = ["Categories", "Description", "Color", "Objects", "Tags"];
    const visualFeaturesParam = visualFeatures.join(',');
    const apiUrl = `${endpoint}/vision/v3.2/analyze?visualFeatures=${visualFeaturesParam}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': key
        },
        body: JSON.stringify({ url: imageUrl })
    });

    if (!response.ok) {
        throw new Error(`Azure Computer Vision API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export default analyzeImage;
