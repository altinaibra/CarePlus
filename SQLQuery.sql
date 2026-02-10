USE careplus;

SELECT * FROM Users;
SELECT * FROM Patients;
SELECT * FROM Doctors;
SELECT * FROM Departments;


INSERT INTO Users (FirstName, Email, Password, Role)
VALUES ('Admin', 'admin@careplus.com', 'admin123', 'Admin');

INSERT INTO Patients (FirstName, LastName, Email, Password, DateOfBirth, Gender, Address, Contact)
VALUES ('John', 'Doe', 'john@careplus.com', '123456', '1995-05-10', 'Male', 'Prishtina', '049123456');

INSERT INTO Departments (Name)
VALUES 
('Cardiology'),
('Neurology'),
('Pediatrics'),
('Orthopedics'),
('Emergency');


INSERT INTO Doctors (Name, Password, DepartmentId, Specialization)
VALUES 
('Dr. Smith', '123456', 1, 'Heart Specialist'),
('Dr. Brown', '123456', 2, 'Brain Specialist'),
('Dr. Anna', '123456', 3, 'Child Care');

