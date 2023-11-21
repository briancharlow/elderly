ALTER PROCEDURE [dbo].[GetUserByEmail]
    @email VARCHAR(255)
AS
BEGIN
    -- Check if the provided email belongs to a User
    IF EXISTS (SELECT 1 FROM Users WHERE email = email)
    BEGIN
        SELECT 'User' as 'entityType', * FROM Users WHERE email = email;
    END
    -- If not a User, check if it belongs to a Caregiver
    ELSE IF EXISTS (SELECT 1 FROM Caregivers WHERE email = email)
    BEGIN
        SELECT 'Caregiver' as 'entityType', * FROM Caregivers WHERE email = email;
    END
    -- If the email doesn't belong to either, set the entity type to 'Not Found'
    ELSE
    BEGIN
        SELECT 'Not Found' as 'entityType';
    END
END;



DECLARE @email VARCHAR(255);
SET @email = 'brian@gmail.com';

-- Declare a variable to store the result from the stored procedure
DECLARE @entityType NVARCHAR(50);

-- Execute the stored procedure and capture the output value into a variable
EXEC [dbo].[GetUserByEmail] 
    @entityType = @entityType OUTPUT,  -- Output parameter
    @email;

-- Now you can access the retrieved entityType
PRINT 'Entity Type: ' + @entityType;






select * from caregivers
select * from Users