CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,          
    title VARCHAR(30) NOT NULL,                
    status ENUM('Todo', 'Working', 'Done') NOT NULL DEFAULT 'Todo'  
);