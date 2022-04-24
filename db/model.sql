-- students
-- Courses
-- 


CREATE TABLE courses (
   course_id serial primary key,
   course_title varchar(64) not null,
   course_name varchar(64) not null
);


CREATE TABLE teachers (
   teacher_id serial primary key,
   teacher_name varchar(64) not null,
   course_id int references courses(course_id)
);

CREATE TABLE students (
   student_id serial primary key,
   studnet_name varchar(64) not null,
   group_id references groups(group_id)
)

CREATE TABLE groups (
   group_id serial primary key,
   group_name varchar(64) not null,
   teacher_id  int references teachers(teacher_id)
   course_id int  references courses(course_id)
)




SELECT
   group_id,
   group_name,
   course_id,
   course_name
FROM
	groups gr
   FULL OUTER JOIN courses using(course_id)
   FULL OUTER JOIN teachers using(teacher_id)

where group_id >0;
   

SELECT 
      groups.group_id,
      groups.group_name,
      courses.course_name,
      courses.course_id,
      teachers.teacher_name,
      teachers.teacher_id

FROM groups
      FULL OUTER JOIN courses ON groups.course_id = courses.course_id
      FULL OUTER JOIN teachers ON groups.teacher_id = teachers.teacher_id

WHERE group_id >0;

SELECT groups.group_id, groups.group_name,courses.course_name, courses.course_id, teachers.teacher_name, teachers.teacher_id FROM groups  FULL OUTER JOIN courses ON groups.course_id = courses.course_id FULL OUTER JOIN teachers ON groups.teacher_id = teachers.teacher_id WHERE group_id >0;


select 
   student_id ,
   student_name,
   group_name,
   group_id
from 
   students

INNER JOIN groups
   using(group_id);