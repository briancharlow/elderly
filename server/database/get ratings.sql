CREATE PROCEDURE GetRatings
    @caregiver_id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    -- Retrieve all ratings of the caregiver, sorted by most recent date submitted
    SELECT id, caregiver_id, client_id, rating, comment, date_submitted
    FROM Ratings
    WHERE caregiver_id = @caregiver_id
    ORDER BY date_submitted DESC;
END;


select * from Caregivers
select * from Ratings
exec GetRatings 'C1D928CF-517C-4A45-962E-457E1BD77B9E'