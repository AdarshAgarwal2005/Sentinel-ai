const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

// Home
router.get("/", homeController.renderHome);

// Fake News
router.get("/fake-news", homeController.renderFakeNewsForm);
router.post("/fake-news", homeController.predictFakeNews);

// Toxicity
router.get("/toxicity", homeController.renderToxicityForm);
router.post("/toxicity", homeController.predictToxicity);

// Sentiment
router.get("/sentiment", homeController.renderSentimentForm);
router.post("/sentiment", homeController.predictSentiment);

module.exports = router;
