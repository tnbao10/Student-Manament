use master

DROP DATABASE IF EXISTS APIDB
CREATE DATABASE APIDB
GO

USE APIDB
GO

DROP TABLE IF EXIStS Courses
DROP TABLE IF EXISTS Students
GO

CREATE TABLE Students
(
	StuId INT PRIMARY KEY IDENTITY,
	StuName NVARCHAR(255) NOT NULL,
	StuAddr NVARCHAR(255) NOT NULL,
	StuPhone NVARCHAR(255) NOT NULL,
	StuDob DATE NOT NULL
)
GO

CREATE TABLE Courses
(
	CourId INT PRIMARY KEY IDENTITY NOT NULL,
	StuId INT NOT NULL,
	CourName NVARCHAR(255) NOT NULL,
	CourScore FLOAT NOT NULL,
    FOREIGN KEY (StuId) REFERENCES Students(StuId)
)
GO

INSERT INTO Students (StuName,StuAddr,StuPhone,StuDob)  
VALUES('nhubao','105 Nguyen Trai','0346006090','2024/06/03')
INSERT INTO Students (StuName,StuAddr,StuPhone,StuDob)  
VALUES('Thong','33 Nguyen Trai','0989876786','2022/06/03')
INSERT INTO Students (StuName,StuAddr,StuPhone,StuDob)  
VALUES('Kiet','45 Nguyen Trai','0897263745','2023/06/03')
GO

INSERT INTO Courses (StuId,CourName,CourScore )  
VALUES('1','Math','32')
INSERT INTO Courses (StuId,CourName,CourScore )  
VALUES('2','Physics','27')
GO
