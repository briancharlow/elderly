-- Create Users table
CREATE TABLE Users (
    id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    fullname VARCHAR(255),
    location VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    emergency_contact INT UNIQUE,
    created_at DATETIME,
    last_seen DATETIME
);

-- Create Caregivers table
CREATE TABLE Caregivers (
    id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    fullname VARCHAR(255),
    location VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(20) UNIQUE,
    description VARCHAR(255),
    created_at DATETIME,
    last_seen DATETIME,
    ratings INT,
    status VARCHAR(50)
);

-- Create Appointments table
CREATE TABLE Appointments (
    id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    caregiver_id UNIQUEIDENTIFIER,
    client_id UNIQUEIDENTIFIER,
    date DATE,
    start_time TIME,
    end_time TIME,
    FOREIGN KEY (caregiver_id) REFERENCES Caregivers(id),
    FOREIGN KEY (client_id) REFERENCES Users(id)
);

CREATE TABLE Ratings (
    id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    caregiver_id UNIQUEIDENTIFIER,
    client_id UNIQUEIDENTIFIER,
    rating INT,
    comment TEXT,
    date_submitted DATETIME,
    FOREIGN KEY (caregiver_id) REFERENCES Caregivers(id),
    FOREIGN KEY (client_id) REFERENCES Users(id)
);


