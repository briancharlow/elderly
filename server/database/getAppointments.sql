CREATE PROCEDURE getAppointments
  @caregiverId UNIQUEIDENTIFIER
  AS
  BEGIN
      select * from Appointments where caregiver_id= @caregiverId

 END


 exec getAppointments '207E5D8E-E88F-455F-8A2F-202C3F1F7F56'

  