CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  did VARCHAR(255) NOT NULL,
  handle TEXT NOT NULL,
  active BOOLEAN DEFAULT NULL,
  nickname VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS status (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  uri VARCHAR(255) NOT NULL,
  author_did VARCHAR(255) NOT NULL,
  content VARCHAR(500) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  indexed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS session (
  id VARCHAR(255) PRIMARY KEY,
  user_did VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS auth_session (
  sestion_key VARCHAR(255) PRIMARY KEY,
  session TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_state (
  state_key VARCHAR(255) PRIMARY KEY,
  state TEXT NOT NULL
);