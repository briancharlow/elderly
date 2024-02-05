CREATE PROCEDURE RequestAppointment 
    @ClientId UNIQUEIDENTIFIER, 
    @CaregiverId UNIQUEIDENTIFIER, 
    @Date DATE, 
    @StartTime TIME, 
    @EndTime TIME
AS
BEGIN
    -- Validating if the client and caregiver exist
    IF NOT EXISTS (SELECT 1 FROM Users WHERE id = @ClientId)
        THROW 50000, 'Client not found', 1;
    IF NOT EXISTS (SELECT 1 FROM Caregivers WHERE id = @CaregiverId)
        THROW 50001, 'Caregiver not found', 1;

    -- Inserting the appointment request
    INSERT INTO Appointments (client_id, caregiver_id, date, start_time, end_time)
    VALUES (@ClientId, @CaregiverId, @Date, @StartTime, @EndTime);
END

select * from Users
select * from Caregivers


exec RequestAppointment '38EEEFAF-5D27-4459-8465-01B5379FF767', 'AAC7B635-2526-4216-AF46-08685B5B338B', '01-09-2024', '09:00', '12:00'

select * from Appointments