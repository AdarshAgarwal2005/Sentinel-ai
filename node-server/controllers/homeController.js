const axios = require("axios");
const ML_SERVER_URL = process.env.ML_SERVER_URL || "http://127.0.0.1:8000";

const formatConfidence = (value) => {
  const confidence = Number(value);
  if (!Number.isFinite(confidence)) return 0;
  return confidence <= 1 ? Number((confidence * 100).toFixed(2)) : Number(confidence.toFixed(2));
};

const formatToxicityResult = (data) => {
  const toxicProbability = Number(data.confidence);
  const isToxic = Boolean(data.toxic);
  const labelConfidence = isToxic ? toxicProbability : 1 - toxicProbability;

  return {
    label: isToxic ? "TOXIC" : "NON_TOXIC",
    confidence: formatConfidence(labelConfidence),
    toxicProbability: formatConfidence(toxicProbability)
  };
};

const sendPredictionError = (res, error, feature) => {
  console.error(`${feature} ERROR:`, error.message);
  res.status(502).json({
    error: "ML server is not reachable. Start the FastAPI server on port 8000 and try again."
  });
};

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

exports.predictFakeNewsApi = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: "News content is required." });
    }

    const response = await axios.post(`${ML_SERVER_URL}/predict/fake-news`, {
      content
    });

    res.json({
      label: response.data.prediction || "Unknown",
      confidence: formatConfidence(response.data.confidence),
      inputType: "News article"
    });
  } catch (error) {
    sendPredictionError(res, error, "FAKE NEWS");
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

    const toxicityResult = formatToxicityResult(response.data);
    const result = {
      label: toxicityResult.label,
      confidence: toxicityResult.confidence.toFixed(2)
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

exports.predictToxicityApi = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Text is required." });
    }

    const response = await axios.post(`${ML_SERVER_URL}/predict/toxicity`, {
      text
    });

    const toxicityResult = formatToxicityResult(response.data);

    res.json({
      label: toxicityResult.label,
      confidence: toxicityResult.confidence,
      toxicProbability: toxicityResult.toxicProbability,
      inputType: "Conversation"
    });
  } catch (error) {
    sendPredictionError(res, error, "TOXICITY");
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

exports.predictSentimentApi = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Text is required." });
    }

    const response = await axios.post(`${ML_SERVER_URL}/predict/sentiment`, {
      text
    });

    res.json({
      label: response.data.sentiment || response.data.prediction || "Unknown",
      confidence: formatConfidence(response.data.confidence),
      inputType: "Audience signal"
    });
  } catch (error) {
    sendPredictionError(res, error, "SENTIMENT");
  }
};
