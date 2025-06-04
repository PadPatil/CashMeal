
CREATE TABLE IF NOT EXISTS Customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  dietary_restrictions TEXT,
  budget REAL NOT NULL,
  time_limit INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS Restaurants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  contact TEXT,
  cuisine TEXT
);

CREATE TABLE IF NOT EXISTS MenuItems (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  restaurant_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  prep_time INTEGER NOT NULL,
  restrictions TEXT, -- comma-separated values: e.g., "Vegan,Gluten Free"
  FOREIGN KEY (restaurant_id) REFERENCES Restaurants(id)
);

CREATE TABLE IF NOT EXISTS Menu (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  prep_time INTEGER,
  restrictions TEXT,
  restaurant_id INTEGER NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES Restaurants(id)
);

DROP TABLE IF EXISTS Customer;

DROP TABLE IF EXISTS Customers;

CREATE TABLE IF NOT EXISTS Customers (
  AccountNumber INTEGER PRIMARY KEY CHECK(AccountNumber BETWEEN 10000000 AND 99999999),
  CustomerName TEXT NOT NULL,
  CustomerEmail TEXT UNIQUE NOT NULL,
  CustomerPassword TEXT NOT NULL,
  CustomerAddress TEXT NOT NULL,
  DietaryRestrictions TEXT,
  Budget INTEGER,
  TimeLimit INTEGER
);

CREATE TABLE IF NOT EXISTS EventPlanner (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  EventPlannerName TEXT NOT NULL,
  EventAdress TEXT NOT NULL,
  EventPlannerEmail TEXT UNIQUE NOT NULL,
  EventPlannerPassword TEXT NOT NULL,
  DietaryRestrictions TEXT,
  Budget INTEGER,
  TimeLimit INTEGER,
  EventTime DATETIME
);

CREATE TABLE CateringMenu (
    CateringMenuID INTEGER PRIMARY KEY AUTOINCREMENT,
    RestaurantID INTEGER,
    ItemName TEXT,
    ItemPrice REAL CHECK(ItemPrice >= 0 AND ItemPrice < 1000000 AND ROUND(ItemPrice, 2) = ItemPrice),
    EstimatePrepTime INTEGER,
    DefaultQuantity INTEGER CHECK(DefaultQuantity > 0),
    FOREIGN KEY (RestaurantID) REFERENCES Restaurant(RestaurantID),
    UNIQUE (RestaurantID, ItemName, ItemPrice, EstimatePrepTime, DefaultQuantity)
);

CREATE TABLE CateringOrder (
    CateringOrderID INTEGER PRIMARY KEY AUTOINCREMENT,
    EventPlannerID INTEGER,
    CateringMenuID INTEGER,
    Quantity INTEGER CHECK(Quantity > 0),
    FOREIGN KEY (EventPlannerID) REFERENCES EventPlanner(ID),
    FOREIGN KEY (CateringMenuID) REFERENCES CateringMenu(CateringMenuID)
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

DELETE FROM MenuItems;
DELETE FROM Restaurants;
DELETE FROM Customers;

CREATE TABLE IF NOT EXISTS Orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER,
  restaurant_id INTEGER,
  items TEXT, -- comma-separated MenuItem IDs (e.g., "1:2,3:1" → 2 of item 1, 1 of item 3)
  total_cost REAL,
  total_time INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
