CREATE OR ALTER PROCEDURE SubmitRating
    @caregiver_id UNIQUEIDENTIFIER,
    @client_id UNIQUEIDENTIFIER,
    @rating INT,
    @comment NVARCHAR(MAX)
AS
BEGIN
    -- Check if the caregiver_id and client_id exist in their respective tables
    IF NOT EXISTS (SELECT 1 FROM Caregivers WHERE id = @caregiver_id)
    BEGIN
        PRINT 'Error: Invalid caregiver ID.';
        SELECT 'Error: Invalid caregiver ID.' AS 'ErrorMessage';
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Users WHERE id = @client_id)
    BEGIN
        PRINT 'Error: Invalid client ID.';
        SELECT 'Error: Invalid client ID.' AS 'ErrorMessage';
        RETURN;
    END

    -- Insert the rating into the Ratings table with the current date and time
    INSERT INTO Ratings (caregiver_id, client_id, rating, comment, date_submitted)
    VALUES (@caregiver_id, @client_id, @rating, @comment, GETDATE()); -- Automatically includes the current date and time

    PRINT 'Rating submitted successfully.';
    SELECT 'Rating submitted successfully.' AS 'SuccessMessage';
END;


exec SubmitRating 'A91BAC0E-0F4B-4A0F-81BF-E4798B572288', 'A77B8621-254D-40B5-A2A2-0872FD9F1F52', 4, 'love it'


select * from Users
select * from Ratings
select * from Caregivers