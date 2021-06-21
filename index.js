const express = require("express");
const http = require("http");
const morgan = require("morgan");

const dishRuoter = require("./routes/dishRouter");
const promoRuoter = require("./routes/promoRouter");
const leaderRuoter = require("./routes/leaderRouter");

const hostname = "localhost";
const port = 3000;

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/dishes", dishRuoter);
app.use("/promotions", promoRuoter);
app.use("/leaders", leaderRuoter);

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express server</h1></body></html>");
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
