const express = require("express");
const app = express();
const path = require("path");
const { compose } = require("stream");
let port = 8080;
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
