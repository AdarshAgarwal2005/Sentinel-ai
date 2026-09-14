const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const routes = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

app.get(/.*/, (req, res) => {
    const reactIndex = path.join(__dirname, "dist", "index.html");
    res.sendFile(reactIndex, (error) => {
        if (error) {
            res.status(200).render("index");
        }
    });
});

app.listen(3000, () => {
    console.log("Node server running on http://localhost:3000");
});
