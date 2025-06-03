CREATE TABLE "Company" (
	"CompanyName"	VARCHAR(100),
	"ServiceDetails"	TEXT,
	"AvailablePlatforms"	VARCHAR(100),
	"Logo"	VARCHAR(100),
	"Founders"	VARCHAR(100),
	PRIMARY KEY("CompanyName")
);

CREATE TABLE "Customer" (
	"AccountNumber"	INT,
	"CustomerName"	VARCHAR(100),
	"CustomerAddress"	VARCHAR(255),
	PRIMARY KEY("AccountNumber")
);

CREATE TABLE "EventPlanner" (
	"ID"	INT,
	"EventPlannerName"	VARCHAR(100),
	"EventAddress"	VARCHAR(255),
	"EventTime"	DATETIME,
	PRIMARY KEY("ID")
);

CREATE TABLE "Restaurant" (
	"RestaurantID"	INT,
	"RestaurantName"	VARCHAR(100),
	"EstimateCost"	DECIMAL(6, 2),
	"EstimatePrepTime"	INT,
	"Location"	VARCHAR(255),
	PRIMARY KEY("RestaurantID")
);

CREATE TABLE "Reviewer" (
	"ReviewerID"	INT,
	"Name"	VARCHAR(100),
	PRIMARY KEY("ReviewerID")
);
