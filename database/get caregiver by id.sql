CREATE PROCEDURE GetCaregiverById
    @caregiverId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT *
    FROM Caregivers
    WHERE id = @caregiverId;
END;


exec GetCaregiverById '207E5D8E-E88F-455F-8A2F-202C3F1F7F56'
