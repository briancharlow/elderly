CREATE or ALTER PROCEDURE GetRatings
    @caregiver_id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    -- Retrieve all ratings of the caregiver with client names, sorted by most recent date submitted
    SELECT R.id, R.caregiver_id, R.client_id, R.rating, R.comment, R.date_submitted, U.fullname AS client_name
    FROM Ratings R
    INNER JOIN Users U ON R.client_id = U.id
    WHERE R.caregiver_id = @caregiver_id
    ORDER BY R.date_submitted DESC;
END;

exec GetRatings 'C1D928CF-517C-4A45-962E-457E1BD77B9E'