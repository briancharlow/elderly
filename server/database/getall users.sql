CREATE PROCEDURE GetAllUsers
AS
BEGIN
    SELECT *
    FROM Users;
END;


EXEC GetAllUsers;
