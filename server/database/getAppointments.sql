CREATE OR ALTER PROCEDURE getAppointments
  @id UNIQUEIDENTIFIER
AS
BEGIN
  SET NOCOUNT ON;

  -- Retrieve appointments with client and caregiver names
  SELECT 
		A.status AS status,
		A.id AS appointment_id,
         A.date,
         A.start_time,
         A.end_time,
         U.fullname AS client_name,
         C.fullname AS caregiver_name
  FROM Appointments A
  LEFT JOIN Users U ON A.client_id = U.id
  LEFT JOIN Caregivers C ON A.caregiver_id = C.id
  WHERE A.client_id = @id OR A.caregiver_id = @id;
END


select * from Appointments

exec getAppointments 'A77B8621-254D-40B5-A2A2-0872FD9F1F52'