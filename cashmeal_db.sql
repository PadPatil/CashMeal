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
		ROUND("ItemPrice", 2) = "ItemPrice"
    ),
    EstimatePrepTime INTEGER,
    FOREIGN KEY (RestaurantID) REFERENCES Restaurant(RestaurantID),
    UNIQUE (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
);



-- Adding Sample Data

INSERT INTO Restaurant VALUES (10000001, 'Taco Bell', 8.50, 10, 'San Diego, CA');
INSERT INTO Restaurant VALUES (10000002, 'Chipotle Mexican Grill', 11.00, 12, 'Denver, CO');
INSERT INTO Restaurant VALUES (10000003, 'McDonald''s', 9.00, 8, 'Chicago, IL');
INSERT INTO Restaurant VALUES (10000004, 'Subway', 7.50, 6, 'Milford, CT');
INSERT INTO Restaurant VALUES (10000005, 'Chick-fil-A', 9.50, 9, 'Atlanta, GA');
INSERT INTO Restaurant VALUES (10000006, 'Panda Express', 10.00, 10, 'Rosemead, CA');
INSERT INTO Restaurant VALUES (10000007, 'Wendy''s', 8.75, 7, 'Dublin, OH');
INSERT INTO Restaurant VALUES (10000008, 'Burger King', 8.25, 7, 'Miami, FL');
INSERT INTO Restaurant VALUES (10000009, 'Domino''s Pizza', 11.50, 15, 'Ann Arbor, MI');



-- Taco Bell Menu
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000001, 'Crunchy Taco', 1.69, 5);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000001, 'Chicken Quesadilla', 4.99, 7);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000001, 'Beef Burrito', 2.49, 6);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000001, 'Nachos BellGrande', 4.89, 8);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000001, 'Cheesy Gordita Crunch', 4.59, 7);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000001, 'Chalupa Supreme', 3.99, 7);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000001, 'Bean Burrito', 1.49, 5);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000001, 'Cinnamon Twists', 1.00, 2);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000001, 'Baja Blast (Medium)', 2.29, 1);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000001, 'Mexican Pizza', 5.49, 9);



-- Chipotle Menu
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000002, 'Burrito Bowl', 9.25, 10);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000002, 'Chicken Burrito', 9.50, 11);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000002, 'Chips & Guac', 4.25, 3);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000002, 'Veggie Tacos', 8.75, 10);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000002, 'Fountain Drink', 2.25, 1);



-- McDonald's Menu
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000003, 'Big Mac', 5.69, 6);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000003, 'Medium Fries', 2.89, 3);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000003, '10 pc McNuggets', 5.49, 4);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000003, 'Filet-O-Fish', 4.89, 5);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000003, 'McFlurry (Oreo)', 3.89, 2);



-- Chick-fil-A Menu
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000005, 'Chicken Sandwich', 4.69, 5);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000005, 'Waffle Fries', 2.35, 4);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000005, 'Spicy Chicken Deluxe', 5.75, 6);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000005, 'Chick-n-Strips (3 pc)', 4.85, 6);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000005, 'Iced Tea', 1.89, 1);



-- Panda Express Menu
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000006, 'Orange Chicken Bowl', 7.50, 8);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000006, 'Beijing Beef Bowl', 8.25, 9);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000006, 'Chow Mein', 3.25, 5);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000006, 'Fried Rice', 3.25, 5);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000006, 'Veggie Spring Rolls (2 pc)', 2.99, 4);



-- Wendy's Menu
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000007, 'Dave''s Single', 5.19, 6);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000007, 'Spicy Chicken Sandwich', 5.49, 7);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000007, 'Baconator', 6.99, 8);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000007, 'Small Fries', 2.19, 3);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000007, 'Frosty (Chocolate)', 1.79, 2);



-- Burger King Menu
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000008, 'Whopper', 5.49, 6);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000008, 'Chicken Fries (9 pc)', 4.49, 5);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000008, 'Impossible Whopper', 6.79, 7);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000008, 'Mozzarella Sticks (4 pc)', 2.49, 4);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000008, 'Soft Drink (Medium)', 1.99, 1);



-- Domino's Pizza Menu
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000010, 'Medium Cheese Pizza', 7.99, 15);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000010, 'Pepperoni Pizza', 8.99, 15);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000010, 'Stuffed Cheesy Bread', 6.49, 12);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000010, 'Chicken Wings (8 pc)', 7.49, 13);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000010, 'Coke (20 oz)', 1.89, 1);
