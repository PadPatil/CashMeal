-- Creating Tables

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

CREATE TABLE "Order" (
    OrderNumber INTEGER PRIMARY KEY,
    CustomerName TEXT,
    AccountNumber INTEGER,
    CustomerAddress TEXT,
    RestaurantID INTEGER,
    RestaurantName TEXT,
    RestaurantAddress TEXT,
    MenuItems TEXT, -- comma-separated list of menu item names
    TotalPrepTime INTEGER,
    TotalCost REAL CHECK(
        TotalCost >= 0 AND
        TotalCost < 1000000 AND
        ROUND(TotalCost, 2) = TotalCost
    ),
    TimeConstraint INTEGER,
    CostConstraint REAL CHECK(
        CostConstraint >= 0 AND
        CostConstraint < 1000000 AND
        ROUND(CostConstraint, 2) = CostConstraint
    ),
    FOREIGN KEY (AccountNumber) REFERENCES Customer(AccountNumber),
    FOREIGN KEY (RestaurantID) REFERENCES Restaurant(RestaurantID)
);



-- Adding Sample Data for all tables


-- Adding Restaurant Data

INSERT INTO Restaurant VALUES (10000001, 'Taco Bell', 8.50, 10, 'San Diego, CA');
INSERT INTO Restaurant VALUES (10000002, 'Chipotle Mexican Grill', 11.00, 12, 'Denver, CO');
INSERT INTO Restaurant VALUES (10000003, 'McDonald''s', 9.00, 8, 'Chicago, IL');
INSERT INTO Restaurant VALUES (10000004, 'Subway', 7.50, 6, 'Milford, CT');
INSERT INTO Restaurant VALUES (10000005, 'Chick-fil-A', 9.50, 9, 'Atlanta, GA');
INSERT INTO Restaurant VALUES (10000006, 'Panda Express', 10.00, 10, 'Rosemead, CA');
INSERT INTO Restaurant VALUES (10000007, 'Wendy''s', 8.75, 7, 'Dublin, OH');
INSERT INTO Restaurant VALUES (10000008, 'Burger King', 8.25, 7, 'Miami, FL');
INSERT INTO Restaurant VALUES (10000009, 'Domino''s Pizza', 11.50, 15, 'Ann Arbor, MI');



-- Adding Menu Items

-- Taco Bell Menu
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
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000001, 'Beef Burrito', 2.49, 6);
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
-- Subway Menu
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000004, '6" Turkey Breast Sub', 5.29, 6);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000004, '6" Veggie Delite Sub', 4.99, 5);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000004, 'Footlong Italian B.M.T.', 8.99, 7);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000004, 'Footlong Meatball Marinara', 8.49, 8);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000004, '6" Tuna Sub', 5.79, 6);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000004, 'Footlong Spicy Italian', 8.29, 7);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000004, 'Chips (Lay''s Classic)', 1.49, 1);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000004, 'Fountain Drink (Medium)', 2.19, 1);
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
VALUES (10000009, 'Medium Cheese Pizza', 7.99, 15);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000009, 'Pepperoni Pizza', 8.99, 15);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000009, 'Stuffed Cheesy Bread', 6.49, 12);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000009, 'Chicken Wings (8 pc)', 7.49, 13);
INSERT INTO MenuItem (RestaurantID, ItemName, ItemPrice, EstimatePrepTime)
VALUES (10000009, 'Coke (20 oz)', 1.89, 1);



-- Filling the Company Table using Python
/*
import sqlite3

conn = sqlite3.connect("your_database.db")  # Ensure this name matches your file
cursor = conn.cursor()

with open("logo.png", "rb") as file:
    logo_blob = file.read()

cursor.execute("""
    INSERT INTO Company (CompanyName, ServiceDetails, Logo)
    VALUES (?, ?, ?)
""", ("BurgerMoney Inc", "High-value gourmet burgers", logo_blob))

conn.commit()
conn.close()
*/



-- Adding Founders
INSERT INTO Founder (CompanyName, FounderName) VALUES ('CashMeal', 'Ishaan Shete');
INSERT INTO Founder (CompanyName, FounderName) VALUES ('CashMeal', 'Padmanabh Patil');
INSERT INTO Founder (CompanyName, FounderName) VALUES ('CashMeal', 'Sahil Shukla');
INSERT INTO Founder (CompanyName, FounderName) VALUES ('CashMeal', 'Kevin Guan');
INSERT INTO Founder (CompanyName, FounderName) VALUES ('CashMeal', 'Davin Til');



-- Adding Company Platforms
INSERT INTO CompanyPlatform (CompanyName, Platform) VALUES ('CashMeal', 'iOS');
INSERT INTO CompanyPlatform (CompanyName, Platform) VALUES ('CashMeal', 'Android');
INSERT INTO CompanyPlatform (CompanyName, Platform) VALUES ('CashMeal', 'Web');



-- Adding Customers
INSERT INTO Customer (AccountNumber, CustomerName, CustomerAddress) VALUES (10000001, 'Alice Johnson', '123 Main St, Springfield, IL');
INSERT INTO Customer (AccountNumber, CustomerName, CustomerAddress) VALUES (10000002, 'Gwen Stacy', '456 Elm St, Denver, CO');
INSERT INTO Customer (AccountNumber, CustomerName, CustomerAddress) VALUES (10000003, 'Raj Malhotra', '789 Maple Ave, Austin, TX');
INSERT INTO Customer (AccountNumber, CustomerName, CustomerAddress) VALUES (10000004, 'Tongo Gatau', '321 Oak Rd, Seattle, WA');
INSERT INTO Customer (AccountNumber, CustomerName, CustomerAddress) VALUES (10000005, 'Kim Curry', '654 Pine Ln, Boston, MA');



-- Adding Event Planners
INSERT INTO EventPlanner (EventPlannerName, EventAddress, EventTime) VALUES ('Jamie Events', 'Hotel Plaza, NY', '2025-06-05 10:00:00');
INSERT INTO EventPlanner (EventPlannerName, EventAddress, EventTime) VALUES ('BrightOccasions', 'Lakeside Hall, MI', '2025-06-09 11:00:00');
INSERT INTO EventPlanner (EventPlannerName, EventAddress, EventTime) VALUES ('FestiveCo', 'Sunset Arena, FL', '2025-06-16 12:00:00');
INSERT INTO EventPlanner (EventPlannerName, EventAddress, EventTime) VALUES ('MerryMakers', 'Beachfront Club, CA', '2025-06-12 18:00:00');
INSERT INTO EventPlanner (EventPlannerName, EventAddress, EventTime) VALUES ('GalaPro', 'City Convention Center, TX', '2025-06-07 14:00:00');



-- Adding Reviewers
INSERT INTO Reviewer (Name) VALUES ('Tina Taste');
INSERT INTO Reviewer (Name) VALUES ('Your Food Lab');
INSERT INTO Reviewer (Name) VALUES ('Crunch Labs');
INSERT INTO Reviewer (Name) VALUES ('Seattle Snackies');
INSERT INTO Reviewer (Name) VALUES ('Raju''s Rasoi');



-- Adding Reviews
INSERT INTO Review (ReviewID, ReviewerID, RestaurantID, ReviewText, Rating) VALUES
(1, 1, 10000001, 'Delicious tacos, fast service!', 5),
(2, 1, 10000002, 'Burrito bowl was good, guac extra.', 4),
(3, 2, 10000003, 'Standard McD quality, fries were fresh.', 4),
(4, 3, 10000004, 'Sub was okay, staff seemed bored.', 3),
(5, 4, 10000002, 'Food was fresh, but staff mixed ingredients. Bad service.', 2),
(6, 5, 10000005, 'Loved the spicy chicken sandwich!', 5);



-- Set Taco Bell in Chicago (restaurant location switch)
UPDATE Restaurant
SET Location = 'Chicago, IL'
WHERE RestaurantName = 'Taco Bell';


-- Adding Sample orders

-- Make an order suggestion for Gwen Stacy from available options in her state
INSERT INTO "Order" (
    OrderNumber, CustomerName, AccountNumber, CustomerAddress,
    RestaurantID, RestaurantName, RestaurantAddress,
    MenuItems, TotalPrepTime, TotalCost, TimeConstraint, CostConstraint
) VALUES (
    1, 'Gwen Stacy', 10000002, '456 Elm St, Denver, CO',
    10000002, 'Chipotle Mexican Grill', 'Denver, CO',
    'Chips & Guac, Fountain Drink', 4, 6.5, 20, 10.0
);
-- Make order suggestions for Alice Johnson from available options in her state
INSERT INTO "Order" (
    OrderNumber, CustomerName, AccountNumber, CustomerAddress,
    RestaurantID, RestaurantName, RestaurantAddress,
    MenuItems, TotalPrepTime, TotalCost, TimeConstraint, CostConstraint
) VALUES (
    2, 'Alice Johnson', 10000001, '123 Main St, Springfield, IL',
    10000003, 'McDonald''s', 'Chicago, IL',
    'Big Mac, ', 6, 5.69, 15, 7.0
);
INSERT INTO "Order" (
    OrderNumber, CustomerName, AccountNumber, CustomerAddress,
    RestaurantID, RestaurantName, RestaurantAddress,
    MenuItems, TotalPrepTime, TotalCost, TimeConstraint, CostConstraint
) VALUES (
    3, 'Alice Johnson', 10000001, '123 Main St, Springfield, IL',
    10000001, 'Taco Bell', 'Chicago, IL',
    'Bean Burrito, Cinnamon Twists, Baja Blast (Medium)', 8, 4.78, 10, 5.00
);
-- No restaurant near other customers




-- Realized that restaurant does not need estimate prep time or estimate cost, it varies based on customer, thus order entity
-- creating temporary storage for the restaurant
CREATE TABLE Restaurant_new (
    RestaurantID INTEGER PRIMARY KEY CHECK(RestaurantID BETWEEN 10000000 AND 99999999),
    RestaurantName TEXT,
    Location TEXT
);
INSERT INTO Restaurant_new (RestaurantID, RestaurantName, Location)
SELECT RestaurantID, RestaurantName, Location FROM Restaurant;
-- drop old table and rename new one with old name
PRAGMA foreign_keys = OFF;
DROP TABLE Restaurant;
ALTER TABLE Restaurant_new RENAME TO Restaurant;
PRAGMA foreign_keys = ON;
