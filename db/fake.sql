

select 
   group_id,
   group_name,
   course_id,
   course_name,
   teacher_id,
   teacher_name

from 
   groups
inner join 
   courses
   using(course_id)
inner join 
   teachers
   using(teacher_id)



SELECT
              cust.name AS cust_name,
              emp.name AS emp_name,
              pay.amount
FROM
              Customer cust
              INNER JOIN Payment pay ON pay.customerID = cust.customerID
              INNER JOIN Employees emp ON pay.employeeID = emp.employeeID;


SELECT 
            group_id,
            group_name,
            course_id,
            course_name,
            teacher_id,
            teacher_name
FROM        
            groups
            INNER JOIN courses  ON courses.course_id = groups.course_id
            INNER JOIN teachers on teachers.teacher_id = groups.teacher_id;
