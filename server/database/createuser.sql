CREATE PROCEDURE CreateNewUser
    @fullname VARCHAR(255),
    @location VARCHAR(255),
    @email VARCHAR(255),
    @emergency_contact INT
AS
BEGIN
    DECLARE @newUserID UNIQUEIDENTIFIER
    SET @newUserID = NEWID()

    DECLARE @created_at DATETIME
    SET @created_at = GETDATE()

    DECLARE @last_seen DATETIME
    SET @last_seen = GETDATE()

    INSERT INTO Users (id, fullname, location, email, emergency_contact, created_at, last_seen)
    VALUES (@newUserID, @fullname, @location, @email, @emergency_contact, @created_at, @last_seen)
END;

EXEC CreateNewUser 'John Doe', 'New York', 'john.doe@example.com', 123456789;


select * from Users