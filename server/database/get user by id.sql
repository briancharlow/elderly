CREATE PROCEDURE GetUserById
    @userId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT *
    FROM Users
    WHERE id = @userId;
END;

exec GetUserById '992F50EC-7D68-44B8-BDA3-448C07A5D4CD'


