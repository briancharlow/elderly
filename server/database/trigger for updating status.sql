CREATE TRIGGER tr_UpdateCaregiverStatus
ON Appointments
AFTER INSERT
AS
BEGIN
    DECLARE @caregiverID UNIQUEIDENTIFIER
    DECLARE @appointmentStart TIME
    DECLARE @appointmentEnd TIME

    SELECT @caregiverID = caregiver_id, @appointmentStart = start_time, @appointmentEnd = end_time
    FROM inserted

    UPDATE Caregivers
    SET status = 
        CASE 
            WHEN @appointmentStart <= CONVERT(TIME, GETDATE()) AND @appointmentEnd >= CONVERT(TIME, GETDATE()) THEN 'engaged'
            ELSE 'open'
        END
    WHERE id = @caregiverID
END;
