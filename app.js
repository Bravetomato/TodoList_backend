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
// 데이터 생성을 위해서.
app.use(express.json());

// codepen의 요청만 허락하겠다.
const corsOptions = {
  origin: "https://cdpn.io",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// codepen의 요청만 허락 끝.

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
    data: todoRows,
  });
});

// 단건 삭제
app.delete("/:user_code/todos/:no", async (req, res) => {
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

    await pool.query(
      `DELETE FROM todo
      WHERE user_code = ?
      AND no = ?
      `,
      [user_code, no]
    );

  // 성공메세지 
  res.json({
    resultCode: "S-1",
    msg: `${no}번 할 일을 삭제하였습니다.`,
  });
});

// 데이터 생성하기
app.post("/:user_code/todos", async (req, res) => {
  const {user_code} = req.params;

  const { content, perform_date, is_completed = 0 } = req.body;
  // is_completed = 0. default 가 0.

  if(!content) {
    res.status(404).json({
      resultCode: "F-1",
      msg: "content required"
    });
  };

  if(!perform_date) {
    res.status(400).json({
      resultCode: "F-1",
      msg: "perform_date required"
    });
  };

  const [[lastTodoRow]] = await pool.query(
    `
    SELECT no
    FROM todo
    WEHER user_code = ?
    ORDER BY id DESC
    LIMIT 1
    `,
    [user_code]
  );

    const no =lastTodoRow?.no + 1 || 1;

    const [insertTodoRs] =  await pool.query(
      `
      INSERT INTO todo
      SET reg_date = NOW(),
      update_date = NOW(),
      user_code =?,
      no = ?,
      content = ?,
      perform_date =?,
      is_completed = ?,
      `,
      [user_code, no, content, perform_date, is_completed]
    );

      const [justCreatedTodoRow] = await pool.query(
        `
        SELECT *
        FROM todo
        WEHER id = ?
        `,
        [justCreatedTodoRow, insertId]
      );

  res.json({
    resultCode: "S-1",
    msg: `${justCreatedTodoRow.id}번 할일을 생성하였습니다.`,
    data: justCreatedTodoRow,
  });
});

//todos에 접속해서 id 1, 2의 데이터 가져오기.
app.get("/todos", (req, res) => {
  res.json([{ id: 1}, { id: 2}]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});