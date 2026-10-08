INSERT INTO student (name, email)
VALUES ('Rahul Sharma', 'rahul@gmail.com');

INSERT INTO student (name, email)
VALUES ('Aman Singh', 'aman@gmail.com');

INSERT INTO student (name, email)
VALUES ('Riya Sharma', 'riya@gmail.com');

INSERT INTO student (name, email)
VALUES ('Simran Kaur', 'simran@gmail.com');

INSERT INTO student (name, email)
VALUES ('Karan Singh', 'karan@gmail.com');


INSERT INTO task
(title, description, status, priority, created_at, student_id)
VALUES
('Complete Java Assignment',
 'Complete Spring Boot assignment',
 'Pending', 5, CURRENT_TIMESTAMP, 1);

INSERT INTO task
(title, description, status, priority, created_at, student_id)
VALUES
('Prepare DBMS',
 'Prepare SQL and normalization',
 'Completed', 4, CURRENT_TIMESTAMP, 1);

INSERT INTO task
(title, description, status, priority, created_at, student_id)
VALUES
('Complete DSA',
 'Solve tree questions',
 'Pending', 5, CURRENT_TIMESTAMP, 2);

INSERT INTO task
(title, description, status, priority, created_at, student_id)
VALUES
('Machine Learning',
 'Revise ML concepts',
 'Pending', 3, CURRENT_TIMESTAMP, 2);

INSERT INTO task
(title, description, status, priority, created_at, student_id)
VALUES
('Computer Networks',
 'Study TCP and UDP',
 'Completed', 4, CURRENT_TIMESTAMP, 3);

INSERT INTO task
(title, description, status, priority, created_at, student_id)
VALUES
('Soft Computing',
 'Prepare viva questions',
 'Pending', 5, CURRENT_TIMESTAMP, 3);

INSERT INTO task
(title, description, status, priority, created_at, student_id)
VALUES
('Full Stack',
 'Complete Spring Boot work',
 'Pending', 4, CURRENT_TIMESTAMP, 4);

INSERT INTO task
(title, description, status, priority, created_at, student_id)
VALUES
('Competitive Coding',
 'Solve LeetCode problems',
 'Pending', 5, CURRENT_TIMESTAMP, 5);