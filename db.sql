DROP DATABASE IF EXISTS todo_2023_03;
CREATE DATABASE todo_2023_03;
USE todo_2023_03;

# todo 테이블 생성
CREATE TABLE todo (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    regDate DATETIME NOT NULL,
    update_date DATETIME NOT NULL,
    user_code CHAR(50) NOT NULL,
    `no` INT UNSIGNED NOT NULL,
    perform_date DATETIME NOT NULL,
    content VARCHAR(200) NOT NULL,
    is_completed TINYINT UNSIGNED NOT NULL DEFAULT 0
);

# user_code와 no의 조합에 대해서 unique 설정 
ALTER TABLE todo ADD UNIQUE INDEX(`user_code`, `no`);

# 테스트용 데이터 생성
INSERT INTO todo
SET regDate = NOW(),
update_date = NOW(),
user_code = 'localhost',
`no` = 1,
perform_date = NOW(),
content = '기상';

INSERT INTO todo
SET regDate = NOW(),
update_date = NOW(),
user_code = 'localhost',
`no` = 2,
perform_date = NOW(),
content = '조깅';

INSERT INTO todo
SET regDate = NOW(),
update_date = NOW(),
user_code = 'localhost',
`no` = 3,
perform_date = NOW(),
content = '명상';

SELECT * FROM todo;