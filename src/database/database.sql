--@block
SELECT * FROM comunities;

--@block
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    bio TEXT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    joinedAt DATETIME NOT NULL DEFAULT NOW()
);

--@block
CREATE TABLE IF NOT EXISTS comunities(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    admin BIGINT NOT NULL,
    description TEXT,
    createdAt DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (admin) REFERENCES users(id)
)
--@block
SELECT username, first_name, last_name, bio, joinedAt FROM users WHERE id = 1;

--@block
SELECT EXISTS (
    SELECT 1
    FROM users
    WHERE id = 6
);

--@block
DROP TABLE comunities;