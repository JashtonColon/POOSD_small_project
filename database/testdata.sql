-- Development test data for fresh, empty tables only
<<<<<<< HEAD
-- Test password for all users is "TestPassword123!"
=======
--Test password for all users is "TestPassword123!"
>>>>>>> origin/database
USE COP4331;
-- Inserting some users
INSERT INTO Users(FirstName, LastName, Username, Password)
VALUES('John', 'Doe', 'myusername', '$2y$12$8dEbZqVy/wwyR/UiD6MeCu1cLRNM5IuRDeZ5/v5PADUO2dfRiGoyu');

INSERT INTO Users(FirstName, LastName, Username, Password)
VALUES('Jane', 'Doe', 'janedoe1', '$2y$12$OCLo31FwS.mGu4QWtvSobuPSr0uWxmH01Oyq6mpUAoBh78svigfya');

INSERT INTO Users(FirstName, LastName, Username, Password)
VALUES('Jimmy', 'Goober', 'ilikehats', '$2y$12$YCdM5A8uYs1eVwnh6Vtsk.N4LUGoln2csl33vaUbshvSwxIulBHhm');

-- Insert some contacts

INSERT INTO Contacts(FirstName, LastName, Phone, Email, UserID)
SELECT 'John', 'Smith', '(123)456-7890', 'jsmith@email.com', ID
FROM Users
WHERE Username = 'myusername';

INSERT INTO Contacts(FirstName, LastName, Phone, Email, UserID)
SELECT 'Jordan', 'Jones', '(941)456-7890', 'jordan.jones@email.com', ID
FROM Users
WHERE Username = 'myusername';

INSERT INTO Contacts(FirstName, LastName, Phone, Email, UserID)
SELECT 'Sarah', 'Jobs', '(941)456-0010', 'sarah.jobs@email.com', ID
FROM Users
WHERE Username = 'myusername';

<<<<<<< HEAD
-- This contact belongs to Jane
=======
--This contact belongs to Jane
>>>>>>> origin/database

INSERT INTO Contacts(FirstName, LastName, Phone, Email, UserID)
SELECT 'Jim', 'Pop', '(123)456-6767', 'jpop@email.com', ID
FROM Users
WHERE Username = 'janedoe1';

<<<<<<< HEAD
-- These contacts belong to Jimmy
=======
--These contacts belong to Jimmy
>>>>>>> origin/database

INSERT INTO Contacts(FirstName, LastName, Phone, Email, UserID)
SELECT 'Tim', 'Kneearaise', '(123)456-3261', 'traise@email.com', ID
FROM Users
WHERE Username = 'ilikehats';

INSERT INTO Contacts(FirstName, LastName, Phone, Email, UserID)
SELECT 'Who', 'Areyou', '(123)050-0707', 'who@email.com', ID
FROM Users
WHERE Username = 'ilikehats';

SELECT ID, FirstName, LastName, Username, RegDate
FROM Users
ORDER BY ID;

SELECT ID, FirstName, LastName, Phone, Email, UserID, DateCreated
FROM Contacts
ORDER BY UserID, LastName, FirstName;