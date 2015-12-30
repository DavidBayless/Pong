DROP TABLE preferences;
CREATE TABLE preferences(
  id SERIAL PRIMARY KEY,
  username VARCHAR(32),
  first_name VARCHAR(32),
  last_name VARCHAR(32),
  password VARCHAR(32)
);

DROP TABLE friends;
CREATE TABLE friends(
  user_id1 integer,
  user_id2 integer
);
