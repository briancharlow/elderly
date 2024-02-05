CREATE PROCEDURE sp_CreateCaregiver
    @fullname VARCHAR(255),
    @location VARCHAR(255),
    @email VARCHAR(255),
    @phone_number VARCHAR(20),
    @description VARCHAR(255),
    @ratings INT,
    @status VARCHAR(50)
AS
BEGIN
    DECLARE @newCaregiverID UNIQUEIDENTIFIER
    SET @newCaregiverID = NEWID()

    DECLARE @created_at DATETIME
    SET @created_at = GETDATE()

    DECLARE @last_seen DATETIME
    SET @last_seen = GETDATE()

    INSERT INTO Caregivers (id, fullname, location, email, phone_number, description, created_at, last_seen, ratings, status)
    VALUES (@newCaregiverID, @fullname, @location, @email,
            @phone_number, @description, @created_at, @last_seen, @ratings, @status)
END;


EXEC sp_CreateCaregiver 'joseph wamalwa', 'kisumu', 'josephwamalwa@gmail.com', '0760354654', 'blind, amnesia', 5, 'Active';


select * from Caregivers