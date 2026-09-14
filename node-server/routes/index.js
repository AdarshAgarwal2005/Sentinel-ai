const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.post("/api/predict/fake-news", homeController.predictFakeNewsApi);
router.post("/api/predict/toxicity", homeController.predictToxicityApi);
router.post("/api/predict/sentiment", homeController.predictSentimentApi);

module.exports = router;
