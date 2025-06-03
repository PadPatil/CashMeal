CREATE TABLE Company (
    CompanyName TEXT PRIMARY KEY,
    ServiceDetails TEXT,
    Logo BLOB
);

CREATE TABLE Founder (
    FounderID INTEGER PRIMARY KEY AUTOINCREMENT,
    CompanyName TEXT,
    FounderName TEXT,
    FOREIGN KEY (CompanyName) REFERENCES Company(CompanyName)
);

CREATE TABLE CompanyPlatform (
    PlatformID INTEGER PRIMARY KEY AUTOINCREMENT,
    CompanyName TEXT,
    Platform TEXT,
    FOREIGN KEY (CompanyName) REFERENCES Company(CompanyName)
);

CREATE TABLE Customer (
    AccountNumber INTEGER PRIMARY KEY CHECK(AccountNumber BETWEEN 10000000 AND 99999999),
    CustomerName TEXT,
    CustomerAddress TEXT
);

CREATE TABLE EventPlanner (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    EventPlannerName TEXT,
    EventAddress TEXT,
    EventTime DATETIME
);

CREATE TABLE Restaurant (
    RestaurantID INTEGER PRIMARY KEY CHECK(RestaurantID BETWEEN 10000000 AND 99999999),
    RestaurantName TEXT,
    EstimateCost REAL CHECK(
        EstimateCost >= 0 AND
        EstimateCost < 1000000 AND
        CAST((EstimateCost * 100) AS INTEGER) = EstimateCost * 100
    ),
    EstimatePrepTime INTEGER,
    Location TEXT
);

CREATE TABLE Reviewer (
    ReviewerID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT
);

CREATE TABLE Review (
    ReviewID INTEGER PRIMARY KEY AUTOINCREMENT,
    ReviewerID INTEGER,
    RestaurantID INTEGER,
    ReviewText TEXT,
    Rating INTEGER CHECK(Rating BETWEEN 1 AND 5),
    FOREIGN KEY (ReviewerID) REFERENCES Reviewer(ReviewerID),
    FOREIGN KEY (RestaurantID) REFERENCES Restaurant(RestaurantID)
);

CREATE TABLE MenuItem (
    MenuItemID INTEGER PRIMARY KEY AUTOINCREMENT,
    RestaurantID INTEGER,
    ItemName TEXT,
    ItemPrice REAL CHECK(
        ItemPrice >= 0 AND
        ItemPrice < 1000000 AND
        CAST((ItemPrice * 100) AS INTEGER) = ItemPrice * 100
    ),
    EstimatePrepTime INTEGER,
    FOREIGN KEY (RestaurantID) REFERENCES Restaurant(RestaurantID)
);
