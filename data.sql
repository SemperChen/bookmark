create table users(
    id INT(10) PRIMARY KEY AUTO_INCREMENT,
    pid VARCHAR(100) UNIQUE NOT NULL,
    platform VARCHAR(20),
    count1 INT(10),
    count2 INT(10)
);

