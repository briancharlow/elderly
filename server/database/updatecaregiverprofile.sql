CREATE PROCEDURE UpdateCaregiverProfile
    @caregiverId UNIQUEIDENTIFIER,
    @fullname VARCHAR(255) = NULL,
    @location VARCHAR(255) = NULL,
    @password VARCHAR(255) = NULL,
    @description VARCHAR(255) = NULL,
	@email VARCHAR(255) = NULL,
	@phone_number INT = NULL
AS
BEGIN
    UPDATE Caregivers
    SET
        fullname = ISNULL(@fullname, fullname),
        location = ISNULL(@location, location),
        password = ISNULL(@password, password),
        description = ISNULL(@description, description),
		email = ISNULL(@email, email),
		phone_number = ISNULL(@phone_number, phone_number)
    WHERE
        id = @caregiverId;
END;




DECLARE @caregiverIdToUpdate UNIQUEIDENTIFIER;
SET @caregiverIdToUpdate = '50FE3AF2-F698-4F12-A648-C94F6BC884A9';



DECLARE @newLocation VARCHAR(255);
SET @newLocation = 'nyeri';

EXEC UpdateCaregiverProfile
    @caregiverId = '50FE3AF2-F698-4F12-A648-C94F6BC884A9',
    @phone_number = 0678889402;


select * from Caregivers