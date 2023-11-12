CREATE PROCEDURE SearchUserCaregiverByName
    @namePart VARCHAR(255)
AS
BEGIN
    -- Search for Users
    SELECT 'User' as 'Type', id, fullname, location, email
    FROM Users
    WHERE fullname LIKE '%' + @namePart + '%';

    -- Search for Caregivers
    SELECT 'Caregiver' as 'Type', id, fullname, location, email
    FROM Caregivers
    WHERE fullname LIKE '%' + @namePart + '%';
END;


EXEC SearchUserCaregiverByName @namePart = 'brian';
