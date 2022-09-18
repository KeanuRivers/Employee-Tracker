INSERT INTO department (name) VALUES ("Marketing"),("Finance"),("Human Resources");

INSERT INTO role (title, salary, department_id) VALUES ("Chief Marketing Officer","2000",1),("Public Relations","1000",1),("Chief Financial Officer","3000",2),("Bookkeeper","6000",2),("HR Manager","2000",3),("Recruiter","7000",3);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Sabrina","Hanson",1),("Bill","Smith",2),("Sandra","Allen",3),("Chris","Davis",4),("Peter","Marsh",5),("Amber","Walters",6);

SELECT e.first_name, e.last_name, e.id AS employee_id, r.salary, r.title, d.name AS department_name
FROM employee e
LEFT JOIN employee m ON e.manager_id = m.id
INNER JOIN role r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id 
ORDER BY e.id;