import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

// DB 설정
const pool = mysql.createPool({
  host: "localhost",
  user: "korad",
  password: "kor123414",
  database: "todo_2023_03",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const app = express();
// codepen의 요청만 허락하겠다.
const corsOptions = {
  origin: "https://cdpn.io",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const port = 3000;

app.get("/:user_code/todos", async (req, res) => {
  const {user_code} = req.params;

  const [rows] = await pool.query(
    `
    SELECT *
    FROM todo
    WEHER user_code = ?
    ORDER BY id dDESC
    `,
    [user_code]
  );

  res.json({
    resultCode: "S-1",
    msg: "성공",
    data: rows,
  })
});

//todos에 접속해서 id 1, 2의 데이터 가져오기.
app.get("/todos", (req, res) => {
  res.json([{ id: 1}, { id: 2}]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});