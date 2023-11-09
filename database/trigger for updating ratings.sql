CREATE TRIGGER tr_UpdateCaregiverRating
ON Ratings
AFTER INSERT, UPDATE
AS
BEGIN
    UPDATE Caregivers
    SET ratings = (
        SELECT AVG(rating) 
        FROM Ratings 
        WHERE caregiver_id = Caregivers.id
    )
    FROM Caregivers
    INNER JOIN inserted ON Caregivers.id = inserted.caregiver_id;

    PRINT 'Caregiver ratings updated successfully.';
END;
