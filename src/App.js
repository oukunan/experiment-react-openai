import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import "./App.css";


const configuration = new Configuration({
  apiKey: '' // TODO: Put OpenAPI key here
})

const openai = new OpenAIApi(configuration)

function App() {
  const [userInput, setUserInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async () => {
    setFetching(true);
    try {
     const response = await openai.createImage({
      prompt: userInput,
      n: 1,
      size: "256x256"
     })
      setImageUrl(response.data.data[0].url);
    } catch (error) {
      setError("Something went wrong creating image");
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="container">
      <h1>Generate Image with AI</h1>
      <input
        type="text"
        value={userInput}
        autoFocus
        onChange={handleInputChange}
        disabled={fetching}
      />
      <button
        onClick={generateImage}
        disabled={fetching || userInput.length === 0}
      >
        Generate Image
      </button>
      {fetching && "Loading..."}
      {error && <span className="error-message">{error}</span>}
      {!fetching && imageUrl && <img src={imageUrl} alt="generated AI" />}
    </div>
  );
}

export default App;
