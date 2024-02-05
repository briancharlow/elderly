CREATE PROCEDURE AcceptAppointment 
    @AppointmentId UNIQUEIDENTIFIER, 
    @CaregiverId UNIQUEIDENTIFIER
AS
BEGIN
    -- Check if the appointment exists and belongs to the caregiver
    IF NOT EXISTS (SELECT 1 FROM Appointments WHERE id = @AppointmentId AND caregiver_id = @CaregiverId)
        THROW 50002, 'Appointment not found or does not belong to this caregiver', 1;

    -- Update the appointment status to approved
    UPDATE Appointments
    SET status = 'approved'
    WHERE id = @AppointmentId;
END

select * from Users
select * from Caregivers

exec AcceptAppointment '17B38017-AB68-42B4-9E1A-1BB16472E197', 'AAC7B635-2526-4216-AF46-08685B5B338B'

select * from Appointments