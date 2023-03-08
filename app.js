import express from "express";
import cors from "cors";

const app = express();
// codepen의 요청만 허락하겠다.
const corsOptions = {
  origin: "https://cdpn.io",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//todos에 접속해서 id 1, 2의 데이터 가져오기.
app.get("/todos", (req, res) => {
  res.json([{ id: 1}, { id: 2}]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});