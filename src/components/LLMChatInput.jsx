import { useState } from "react";

export default function LLMChatInput({ onNewMessage, currentCode }) {

  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState();
  const [conversationHistory, setConversationHistory] = useState([]); // New state variable

  async function onSubmit(event) {

    //Create a new chat card on the UI (locally)
    // const modifiedInput = `Remember the TLA+ spec currently is: ${currentCode}, here is my prompt: ${userInput}`;
    const newUserChatMessage = { role: 'user', content: userInput };
    onNewMessage(newUserChatMessage);

    // Add the user's input message to the conversation history
    setConversationHistory(prevHistory => [...prevHistory, newUserChatMessage]);

    //clear out the input form
    event.target.value = '';
    event.preventDefault();
    setUserInput("");
    
    //make the API call to OpenAI conversation
    console.log("****newUserChatMessage****");
    console.log(newUserChatMessage);
    console.log("********");


    try {
      //generate2 is
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserChatMessage), // Send conversation history
      });

      const data = await response.json();

      //Convert to stream
      // const reader = data.getReader();
      // const decoder = new TextDecoder();
      // let done = false;
      // while (!done) {
      //   const { value, done: doneReading } = await reader.read();
      //   done = doneReading;
      //   const chunkValue = decoder.decode(value);
      //   setGeneratedBios((prev) => prev + chunkValue);
      // }





      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log("DATA RESULT FROM API");
      console.log(data);
      console.log("********");


      // Take the result from the LLM and add it as a card
      setMessage(data.result[0]);

      const newBotChatMessage = { role: 'assistant', content: data.result.content };
      onNewMessage(newBotChatMessage);

      // Add the assistant's message to the conversation history
      // setConversationHistory(prevHistory => [...prevHistory, newBotChatMessage]);
    } catch(error) {

      //the the user to try again
      const newBotChatMessage = { role: 'assistant', content: 'Apologies, there was error in system, please try again.' };
      onNewMessage(newBotChatMessage);

      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="userInput"
            className="block w-full rounded-full border-0 px-20 py-7.5 text-2xl text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"
            placeholder="Ask the LLM"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            autoComplete="off"
          />
        </form>
    </div>
  );
}
