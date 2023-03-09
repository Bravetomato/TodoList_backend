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
  dateStrings: true,
});

const app = express();
// codepen의 요청만 허락하겠다.
const corsOptions = {
  origin: "https://cdpn.io",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const port = 3000;

// todo데이터 조회
app.get("/:user_code/todos", async (req, res) => {
  const {user_code} = req.params;

  const [rows] = await pool.query(
    `
    SELECT *
    FROM todo
    WEHER user_code = ?
    ORDER BY id DESC
    `,
    [user_code]
  );

  // 성공메세지 
  res.json({
    resultCode: "S-1",
    msg: "성공",
    data: rows,
  });
});

// todo 데이터 단건 조회
app.get("/:user_code/todos/:no", async (req, res) => {
  const {user_code, no} = req.params;

  const [todoRow] = await pool.query(
    `
    SELECT *
    FROM todo
    WEHER user_code = ?
    AND no = ?
    `,
    [user_code, no]
  );

  // 오류메세지
    if (todoRow == undefined) {
      res.status(404).json({
        resultCode: "F-1",
        msg: "not found"
      });
      return;
    }

  // 성공메세지 
  res.json({
    resultCode: "S-1",
    msg: "성공",
    data: todorows,
  });
});

//todos에 접속해서 id 1, 2의 데이터 가져오기.
app.get("/todos", (req, res) => {
  res.json([{ id: 1}, { id: 2}]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});