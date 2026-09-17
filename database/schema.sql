-- Create our database
CREATE DATABASE COP4331;
USE COP4331;

-- Create our tables for our DB
-- First, lets create our user table

CREATE TABLE Users(
    ID INT PRIMARY KEY AUTO_INCREMENT, -- Unique ID for each user
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Username VARCHAR(50) NOT NULL UNIQUE,
    RegDate DATE NOT NULL DEFAULT (CURRENT_DATE()), -- Default value is the current time when they register
    Password VARCHAR(50) NOT NULL DEFAULT ''
)ENGINE = InnoDB;

-- Now lets create the contacts table
CREATE TABLE Contacts(
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Phone VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    UserID INT NOT NULL, -- used to tell us which contacts belong to which users

    FOREIGN KEY (UserID) REFERENCES Users(ID)

)ENGINE = InnoDB;
