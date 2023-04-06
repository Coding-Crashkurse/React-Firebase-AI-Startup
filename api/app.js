const express = require("express");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages;
    const userInfo = req.body.userInfo;

    const systemMessage = `Always be very personal in the user interaction. Always take Username, Level, Interests, and age into consideration when you answer.
Here is the information
Username: ${userInfo.username},
Level: ${userInfo.level},
Interests: ${userInfo.interests},
Age: ${userInfo.age}`;

    const conversationHistory = [
      { role: "system", content: systemMessage },
      ...messages,
    ];

    console.log(messages);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: conversationHistory,
    });

    const aiMessage = completion.data.choices[0].message.content;

    res.json({
      aiMessage: aiMessage,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
