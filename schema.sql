-- DROP DATABASE IF EXISTS test;

-- CREATE DATABASE test;

-- USE test;

-- CREATE TABLE items (
--   id int NOT NULL AUTO_INCREMENT,
--   quantity integer NOT NULL,
--   description varchar(50) NOT NULL,
--   PRIMARY KEY (ID)
-- );

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

DROP DATABASE IF EXISTS priceline;

CREATE DATABASE priceline;

USE priceline;

CREATE TABLE restaurants (
  id INTEGER AUTO_INCREMENT NOT NULL,
  email VARCHAR(50) NOT NULL,
  address VARCHAR(100),
  org VARCHAR(200),
  phone VARCHAR(12),
  lng VARCHAR(50),
  lat VARCHAR(50),
  cPassword VARCHAR(1000) NOT NULL,
  verified BOOLEAN, /*might not need this, non restuarants should be able to not waste food also */
  PRIMARY KEY (id)
);

CREATE TABLE listing (
  id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(100),
  listing_id INTEGER NOT NULL,
  description VARCHAR(255),
  address VARCHAR(200),
  lng VARCHAR(50),
  lat VARCHAR(50),
  phone VARCHAR(12),
  numOfOrders INTEGER NOT NULL,
  outOfOrder BOOLEAN DEFAULT FALSE,
  restaurants_id INTEGER,
  createdAt INTEGER,
  photoUrl VARCHAR(3000),
  price VARCHAR(50),
  PRIMARY KEY (id),
  FOREIGN KEY (listing_id) REFERENCES restaurants(id),
  FOREIGN KEY (restaurants_id) REFERENCES restaurants(id),
  CHECK (listing_id <> restaurants_id)
)