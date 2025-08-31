-- MySQL schema for Nextgen Computing
-- Compatible with XAMPP (MariaDB/MySQL)

CREATE DATABASE IF NOT EXISTS nextgen_computing CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nextgen_computing;

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(36) NOT NULL,
  name VARCHAR(191) NOT NULL UNIQUE,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Products (stores category name for compatibility; optional category_id)
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(36) NOT NULL,
  category VARCHAR(191) NOT NULL,
  category_id VARCHAR(36) NULL,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(191) NOT NULL,
  price BIGINT NOT NULL,
  image TEXT NOT NULL,
  features JSON NULL,
  buyLink TEXT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  PRIMARY KEY (id),
  INDEX idx_category_name (category),
  INDEX idx_category_id (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Pages (about, contact)
CREATE TABLE IF NOT EXISTS pages (
  slug VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  body MEDIUMTEXT NULL,
  meta JSON NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  PRIMARY KEY (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
