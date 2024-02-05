USE [elderly care network]
GO
/****** Object:  StoredProcedure [dbo].[sp_SubmitRating]    Script Date: 04/02/2024 23:40:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE [dbo].[sp_SubmitRating]
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


select * from Ratings