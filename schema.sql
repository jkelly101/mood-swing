DROP DATABASE IF EXISTS `quotes_db`;
CREATE DATABASE `quotes_db`;

USE quotes_db;

CREATE TABLE quotes(
  id INTEGER AUTO_INCREMENT NOT NULL,
  mood VARCHAR(100),
  quote VARCHAR(2000),
  PRIMARY KEY (id)
);

INSERT INTO quotes_db (mood, quote)
VALUES ("happy", `“Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared.” – Buddha`)

