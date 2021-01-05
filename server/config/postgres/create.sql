CREATE TABLE IF NOT EXISTS category(
  id UUID PRIMARY KEY,
  category TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS college(
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  studentNumber INTEGER 
);

CREATE TABLE IF NOT EXISTS users(
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  displayImg TEXT,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  age INTEGER NOT NULL,
  collegeId UUID REFERENCES college(id),
  year INTEGER NOT NULL,
  contact JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS product(
  id UUID PRIMARY KEY,
  sellerId UUID REFERENCES users(id),
  title TEXT NOT NULL,
  img TEXT[],
  price INTEGER NOT NULL,
  avialable BOOLEAN NOT NULL,
  description TEXT NOT NULL,
  categoryId UUID REFERENCES category(id)
);

