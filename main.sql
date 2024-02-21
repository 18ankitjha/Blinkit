-- Create Authors table
CREATE TABLE IF NOT EXISTS Authors (
    author_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create Customers table
CREATE TABLE IF NOT EXISTS Customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL
);

-- Create Orders table
CREATE TABLE IF NOT EXISTS Orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- Create Books table
CREATE TABLE IF NOT EXISTS Books (
    book_id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    publisher_id INT,
    price DECIMAL(10,2) NOT NULL,
    quantity_in_stock INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id)
    -- Assuming publisher_id is another table, which is not provided in this script
);
   -- metadata of order_items
CREATE TABLE IF NOT EXISTS Order_Items (
    order_id INT,
    book_id INT,
    quantity_ordered INT NOT NULL,
    PRIMARY KEY (order_id, book_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

-- metadata of Authors table
INSERT INTO Authors (author_id, name) VALUES
(1, 'John Doe'),
(2, 'Jane Smith'),
(3, 'Michael Johnson'),
(4, 'Emily Brown'),
(5, 'Michael Clark'),
(6, 'Jessica Jones'),
(7, 'Daniel Wilson'),
(8, 'Sarah Adams'),
(9, 'David Lee'),
(10, 'Rachel Taylor');

-- metadata of Customers table
INSERT INTO Customers (customer_id, name, email, phone_number) VALUES
(1, 'Alice Brown', 'alice@example.com', '123-456-7890'),
(2, 'Bob Green', 'bob@example.com', '987-654-3210'),
(3, 'Charlie White', 'charlie@example.com', '555-123-4567'),
(4, 'David Smith', 'david@example.com', '111-222-3333'),
(5, 'Emma Johnson', 'emma@example.com', '444-555-6666'),
(6, 'Oliver Brown', 'oliver@example.com', '777-888-9999'),
(7, 'Sophia Davis', 'sophia@example.com', '000-111-2222'),
(8, 'James Wilson', 'james@example.com', '333-444-5555'),
(9, 'Isabella Taylor', 'isabella@example.com', '666-777-8888'),
(10, 'Logan Martinez', 'logan@example.com', '999-000-1111');

-- metadata of Books table
INSERT INTO Books (book_id, title, author_id, price, quantity_in_stock) VALUES
(1, 'The Great Adventure', 1, 15.99, 100),
(2, 'Mystery at Midnight', 2, 12.50, 75),
(3, 'The Science of Everything', 3, 20.00, 50),
(4, 'Into the Unknown', 4, 18.50, 80),
(5, 'Secrets of the Universe', 5, 22.99, 60),
(6, 'The Lost City', 6, 14.75, 90),
(7, 'The Power Within', 7, 16.99, 70),
(8, 'A New Beginning', 8, 19.25, 85),
(9, 'Journey to the Stars', 9, 21.50, 55),
(10, 'Echoes of the Past', 10, 17.99, 95);

-- metadata of Orders table
INSERT INTO Orders (order_id, customer_id, order_date) VALUES
(1, 1, '2024-01-05'),
(2, 2, '2024-01-10'),
(3, 3, '2024-01-15'),
(4, 4, '2024-01-20'),
(5, 5, '2024-01-25'),
(6, 6, '2024-01-30'),
(7, 7, '2024-02-05'),
(8, 8, '2024-02-10'),
(9, 9, '2024-02-15'),
(10, 10, '2024-02-20');

-- Insert random data into Order_Items table
INSERT INTO Order_Items (order_id, book_id, quantity_ordered) VALUES
(1, 1, 2),
(1, 2, 3),
(2, 2, 1),  
(3, 3, 2),
(4, 4, 7),
(5, 5, 1),
(6, 6, 3),
(7, 7, 78),
(8, 8, 1),
(9, 9, 2),
(10, 10, 6);


 
-- Top selling books based on total quantity ordered
SELECT b.title, a.name AS author, SUM(oi.quantity_ordered) AS  Top_selling_Books
FROM Books b
JOIN Order_Items oi ON b.book_id = oi.book_id
JOIN Authors a ON b.author_id = a.author_id
GROUP BY b.title, a.name
ORDER BY Top_selling_Books DESC
LIMIT 3; -- Adjust the LIMIT according to how many top-selling books you want to retrieve



-- Total sales revenue for a given period
SELECT SUM(oi.quantity_ordered * b.price) AS total_revenue
FROM Orders o
JOIN Order_Items oi ON o.order_id = oi.order_id
JOIN Books b ON oi.book_id = b.book_id
WHERE o.order_date >= '2024-01-01' AND o.order_date < '2024-02-01';
