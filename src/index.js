const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./routes");

app.use("/", router);

app.get("/", function (req, res) {
	res.send("Hello World");
});
 
app.listen(3000);