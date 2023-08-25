import OpenAI from 'openai';

//THIS IS THE BACKEND OF THE APP

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

//We will save the message history in memory for now
const messageHistory = [ ];

export default async function (req, res) {
  // if (!configuration.apiKey) {
  //   res.status(500).json({
  //     error: {
  //       message: "OpenAI API key not configured, please follow instructions in README.md",
  //     }
  //   });
  //   return;
  // }

  const userMessage = req.body;

  const modifiedUserInputForPrompt = `${userMessage.content}`;

  //add the latest user message to the message history
  messageHistory.push({"role": "user", "content": modifiedUserInputForPrompt});

  try {

    //make the API request with the user prompt
    const chatCompletion = await openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messageHistory,
      temperature: 0.8,
    });

    //add the AI message to the message history
    messageHistory.push({"role": "assistant", "content": chatCompletion.choices[0].message.content});

    res.status(200).json({ result: chatCompletion.choices[0].message, conversationHistory: messageHistory });
  } catch(error) {

    messageHistory.push({"role": "assistant", "content": 'Apologies, there was error in system, please try again.'});

    if (error instanceof OpenAI.APIError) {
      console.error(error.status);  // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code);  // e.g. 'invalid_api_key'
      console.error(error.type);  // e.g. 'invalid_request_error'
      res.status(error.status).json(error.message);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
