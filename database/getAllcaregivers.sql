CREATE PROCEDURE GetAllCaregivers
AS
BEGIN
    SELECT *
    FROM Caregivers;
END;


EXEC GetAllCaregivers;

