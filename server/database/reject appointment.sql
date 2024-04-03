CREATE PROCEDURE RejectAppointment 
    @AppointmentId UNIQUEIDENTIFIER, 
    @CaregiverId UNIQUEIDENTIFIER
AS
BEGIN
    -- Check if the appointment exists and belongs to the caregiver
    IF NOT EXISTS (SELECT 1 FROM Appointments WHERE id = @AppointmentId AND caregiver_id = @CaregiverId)
    BEGIN
        THROW 50002, 'Appointment not found or does not belong to this caregiver', 1;
    END

    -- Update the appointment status to rejected
    UPDATE Appointments
    SET status = 'rejected'
    WHERE id = @AppointmentId;
END
