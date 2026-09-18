-- Create our database
CREATE DATABASE IF NOT EXISTS COP4331
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_0900_ai_ci;

ALTER DATABASE COP4331
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_0900_ai_ci;

USE COP4331;

-- Create our tables for our DB
-- First, lets create our user table



CREATE TABLE IF NOT EXISTS Users(
    ID INT NOT NULL AUTO_INCREMENT, -- Unique ID for each user
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Username VARCHAR(50) NOT NULL UNIQUE,
    RegDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Default value is the current time when they register
    Password VARCHAR(255) NOT NULL,

    PRIMARY KEY (ID)
)ENGINE = InnoDB;

-- Now lets create the contacts table
CREATE TABLE IF NOT EXISTS Contacts(
    ID INT NOT NULL AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Phone VARCHAR(50) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    UserID INT NOT NULL, -- used to tell us which contacts belong to which users
    DateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Default value is the current time when they register

    PRIMARY KEY (ID),

    INDEX idx_contacts_user_name (UserID, LastName, FirstName),

    CONSTRAINT fk_contacts_user
        FOREIGN KEY (UserID)
        REFERENCES Users(ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)ENGINE = InnoDB;