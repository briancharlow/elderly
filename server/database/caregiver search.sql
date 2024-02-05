CREATE OR ALTER PROCEDURE SearchCaregiver
    @searchTerm NVARCHAR(255)
AS
BEGIN
    SELECT
       *
    FROM
        Caregivers
    WHERE
        fullname LIKE '%' + @searchTerm + '%' OR
        description LIKE '%' + @searchTerm + '%' OR
        location LIKE '%' + @searchTerm + '%' OR
		email LIKE '%' + @searchTerm + '%';
END;

exec SearchCaregiver 'koweeet'