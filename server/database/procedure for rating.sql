CREATE OR ALTER PROCEDURE sp_SubmitRating
    @caregiver_id UNIQUEIDENTIFIER,
    @client_id UNIQUEIDENTIFIER,
    @rating INT,
    @comment NVARCHAR(MAX),
    @date_submitted DATETIME
AS
BEGIN
    -- Check if the caregiver_id and client_id exist in their respective tables
    IF NOT EXISTS (SELECT 1 FROM Caregivers WHERE id = @caregiver_id)
    BEGIN
        PRINT 'Error: Invalid caregiver ID.';
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Users WHERE id = @client_id)
    BEGIN
        PRINT 'Error: Invalid client ID.';
        RETURN;
    END

    -- Insert the rating into the Ratings table
    INSERT INTO Ratings (caregiver_id, client_id, rating, comment, date_submitted)
    VALUES (@caregiver_id, @client_id, @rating, @comment, @date_submitted);

    PRINT 'Rating submitted successfully.';
END;


-- Sample EXEC statement for sp_SubmitRating stored procedure
DECLARE @caregiver_id UNIQUEIDENTIFIER = '207D82E9-820A-45FD-A2B1-1723F8EE322A';
DECLARE @client_id UNIQUEIDENTIFIER = 'D71F1CEC-61B0-4E7F-83E6-A05CA7518A24';
DECLARE @rating INT = 5;
DECLARE @comment NVARCHAR(MAX) = 'good service!';
DECLARE @date_submitted DATETIME = GETDATE();

EXEC sp_SubmitRating @caregiver_id, @client_id, @rating, @comment, @date_submitted;


select * from Users
select * from Caregivers
select * from Ratings