import { OpenAI } from "openai";

async function generateImage(prompt) {
    const key = process.env.REACT_APP_OPENAI_API_KEY;
	const client = new OpenAI({apiKey: key, dangerouslyAllowBrowser: true});
    try {
	const response = await client.images.generate({
		prompt: prompt,
		n: 1,
		size: "1024x1024"
	});
	const image_url = response.data[0].url;
	return image_url;
} catch (error) {
    if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
    } else {
        console.log(error.message);
    }
}
}

export default generateImage;
