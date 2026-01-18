const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(3000, () => {
    console.log("Node server running on http://localhost:3000");
});
