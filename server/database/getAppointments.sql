CREATE OR ALTER PROCEDURE getAppointments
  @id UNIQUEIDENTIFIER
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if the provided ID belongs to a caregiver
  IF EXISTS (SELECT 1 FROM Caregivers WHERE id = @id)
  BEGIN
    -- Retrieve appointments for the caregiver
    SELECT *
    FROM Appointments
    WHERE caregiver_id = @id;
  END
  -- Check if the provided ID belongs to a client
  ELSE IF EXISTS (SELECT 1 FROM Users WHERE id = @id)
  BEGIN
    -- Retrieve appointments for the client
    SELECT *
    FROM Appointments
    WHERE client_id = @id;
  END
  ELSE
  BEGIN
    -- Invalid ID, return an error message or handle as needed
    SELECT 'Invalid ID' AS ErrorMessage;
  END
END
