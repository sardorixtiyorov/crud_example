-- CREATE TABLE if not exists user(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(255),
--     email VARCHAR(255),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );

-- CREATE table if not exists book(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(255)
-- );

CREATE table if not exists orders(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    address VARCHAR(64),
    FOREIGN KEY (book_id) REFERENCES book(id) ON delete cascade
);