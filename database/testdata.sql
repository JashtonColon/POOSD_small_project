-- Test data to populate our currently empty sql tables

-- Inserting some users
INSERT INTO Users(FirstName, LastName, Username, Password)
VALUES('John', 'Doe', 'myusername', 'mypassword');

INSERT INTO Users(FirstName, LastName, Username, Password)
VALUES('Jane', 'Doe', 'janedoe1', 'abcd');

INSERT INTO Users(FirstName, LastName, Username, Password)
VALUES('Jimmy', 'Goober', 'ilikehats', 'pleasedonthackme');

-- Insert some contacts

INSERT INTO Contacts(FirstName, LastName, Phone, Email, UserID)
VALUES ('John', 'Smith', '(123)456-7890', 'jsmith@email.com', '1');

INSERT INTO Contacts(FirstName, LastName, Phone, Email, UserID)
VALUES ('Jim', 'Pop', '(941)456-7890', 'jpop@email.com', '2');

INSERT INTO Contacts(FirstName, LastName, Phone, Email, UserID)
VALUES ('Hol', 'Low', '(941)456-0010', 'hlow@email.com', '2');

INSERT INTO Contacts(FirstName, LastName, Phone, Email, UserID)
VALUES ('Aura', 'Monster', '(123)456-6767', 'nsubaru@email.com', '3');

INSERT INTO Contacts(FirstName, LastName, Phone, Email, UserID)
VALUES ('Tim', 'Kneearaise', '(123)456-3261', 'traise@email.com', '3');

INSERT INTO Contacts(FirstName, LastName, Phone, Email, UserID)
VALUES ('Who', 'Areyou', '(123)050-0707', 'who@email.com', '3');

SELECT *
FROM Users;

SELECT *
FROM Contacts;