const axios = require("axios");

exports.renderHome = (req, res) => {
  res.render("index");
};

//Fake News
exports.renderFakeNewsForm = (req, res) => {
  res.render("fakeNews", { result: null, content: "" });
};

exports.predictFakeNews = async (req, res) => {
  try {
    const { content } = req.body;

    const response = await axios.post("http://127.0.0.1:8000/predict/fake-news", {
      content
    });

    const data = response.data;
    const result = {
      label: data.prediction ? data.prediction : "Error",
      confidence: data.confidence ? Number(data.confidence).toFixed(2) : 0
    };

    console.log("FINAL FAKE NEWS RESULT:", result);

    res.render("fakeNews", { result, content });

  } catch (error) {
    console.error("FAKE NEWS ERROR:", error);
    res.render("fakeNews", { result: { label: "Error", confidence: 0 }, content: "" });
  }
};


//Toxicity
exports.renderToxicityForm = (req, res) => {
  res.render("toxicity", { result: null, text: "" });
};

exports.predictToxicity = async (req, res) => {
  try {
    const { text } = req.body;

    const response = await axios.post(
      "http://127.0.0.1:8000/predict/toxicity",
      { text }
    );

    console.log("RAW TOXICITY RESPONSE:", response.data);

    const confidence = Number(response.data.confidence) * 100;

    const result = {
      label: confidence >= 50 ? "TOXIC" : "NON_TOXIC",   
      confidence: confidence.toFixed(2)
    };

    console.log("FINAL RESULT SENT TO EJS:", result);

    res.render("toxicity", { result, text });
  } catch (error) {
    console.error("TOXICITY ERROR:", error);
    res.render("toxicity", {
      result: { label: "Error", confidence: 0 },
      text: ""
    });
  }
};



//Sentiment
exports.renderSentimentForm = (req, res) => {
  res.render("sentiment", { result: null, text: "" });
};

exports.predictSentiment = async (req, res) => {
  try {
    const { text } = req.body;

    const response = await axios.post(
      "http://127.0.0.1:8000/predict/sentiment",
      { text }
    );

    console.log("SENTIMENT RESPONSE:", response.data);

    const result = {
      label: response.data.sentiment,                
      confidence: (response.data.confidence * 100).toFixed(2)
    };

    console.log("FINAL SENTIMENT RESULT:", result);

    res.render("sentiment", { result, text });

  } catch (error) {
    console.error("SENTIMENT ERROR:", error);
    res.render("sentiment", {
      result: { label: "Error", confidence: 0 },
      text: ""
    });
  }
};
