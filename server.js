const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5000
const {Pool} = require('pg')

app.use(express.urlencoded({extended:false}));

app.use(express.json())
app.use(cors())

const pool = new Pool({
   user: 'hkplkuzt',
   host: 'heffalump.db.elephantsql.com',
   database: 'hkplkuzt',
   password: 'K4aaQ8Gd7yXK4uSyiWxAoUY-nHjcffDA',
   port: 5432,
 })





app.route('/teachers')
   .get(async(req,res)=> {
      const client = await pool.connect()
      let {course_id} = req.query
      if(course_id) {
         const {rows:teacher} = await client.query('select * from teachers where course_id=$1',[course_id])
         res.json(teacher)
      }else{
         const {rows} = await client.query('select teacher_name,teacher_id,course_name  from courses inner join teachers using(course_id);')
         res.json(rows)
      }
      client.release()
   })
   .post(async(req,res)=>{
      const {teacher_name,course_id} = req.body

      if(teacher_name&&course_id) {
         const client = await pool.connect()
         const {rows} = await client.query('insert into teachers (teacher_name,course_id) values($1 , $2) returning *',[teacher_name,course_id])
         client.release()
         res.json(rows)
      }else{
         res.json({message:"Something is wrong"})
      }
   })
   .put(async(req,res)=>{
      const {teacher_name,course_id,teacher_id} = req.body

      if(teacher_id) {
         if(teacher_name && course_id) {
            const client = await pool.connect()
            const {rows} = await client.query('update courses set course_name=$1 ,course_title=$2 where course_id = $3 returning *',[teacher_name,course_id,teacher_id])
            client.release()
            res.json(rows)
         }else{
            res.json({message:"Something is wrong :("})
         }
      }else{
         res.json({message:"Something is wrong"})
      }
   })
   .delete(async(req,res)=>{
      const {teacher_id} = req.body
      if(course_id) {
         const client = await pool.connect()
         const { rows } = await client.query("delete from courses where course_id= $1 returning *",[teacher_id])
         res.json(rows)
      }else{
         res.json({message:"Something is wrong"})
      }
   })

   /*  Courses router  */



   

app.route('/courses')
   .get(async(req,res)=> {
      const {id} = req.query
      const client = await pool.connect()
      if(id) {
         const {rows} = await client.query('select * from courses where course_id = $1',[id])
         res.json(rows)
      }else{
         const {rows} = await client.query('select * from courses')
         res.json(rows)
      }
      client.release()
   })
   .post(async(req,res)=>{
      const {course_name,course_title} = req.body

      if(course_name&&course_title) {
         const client = await pool.connect()
         const {rows} = await client.query('insert into courses (course_name,course_title) values($1 , $2) returning *',[course_name,course_title])
         client.release()
         res.json(rows)
      }else{
         res.json({message:"Something is wrong"})
      }
   })
   .put(async(req,res)=>{
      const {course_name,course_title,course_id} = req.body

      if(course_id) {
         if(course_name && course_title) {
            const client = await pool.connect()
            const {rows} = await client.query('update courses set course_name=$1 ,course_title=$2 where course_id = $3 returning *',[course_name,course_title,course_id])
            client.release()
            res.json(rows)
         }else{
            res.json({message:"Something is wrong :("})
         }
      }else{
         res.json({message:"Something is wrong"})
      }
   })
   .delete(async(req,res)=>{
      const {course_id} = req.body
      if(course_id) {
         const client = await pool.connect()
         const { rows } = await client.query("delete from courses cascade where course_id= $1 returning *",[course_id])
         res.json(rows)
      }else{
         res.json({message:"Something is wrong"})
      }
   })

// app.get('/courses/:id',async(req,res)=>{
//    const {id} = req.params
//    const client = await pool.connect()
//    const {rows} = await client.query('select * from courses where course_id = $1',[id])
//    client.release()
//    res.json(rows)
// })



app.route('/students')
   .get(async(req,res)=> {
      const client = await pool.connect()
      const {rows} = await client.query('select student_id , studnet_name, group_name, group_id from  students INNER JOIN groups using(group_id)')
      client.release()
      res.json(rows)
   })
   .post(async(req,res)=>{
      const {studnet_name,group_id} = req.body

      if(studnet_name&&group_id) {
         const client = await pool.connect()
         const {rows} = await client.query('insert into students (studnet_name,group_id) values($1 , $2) returning *',[studnet_name,group_id])
         client.release()
         res.json(rows)
      }else{
         res.json({message:"Something is wrong"})
      }
   })
   .put(async(req,res)=>{
      const {course_name,course_title,course_id} = req.body

      if(course_id) {
         if(course_name && course_title) {
            const client = await pool.connect()
            const {rows} = await client.query('update courses set course_name=$1 ,course_title=$2 where course_id = $3 returning *',[course_name,course_title,course_id])
            client.release()
            res.json(rows)
         }else{
            res.json({message:"Something is wrong :("})
         }
      }else{
         res.json({message:"Something is wrong"})
      }
   })
   .delete(async(req,res)=>{
      const {course_id} = req.body
      if(course_id) {
         const client = await pool.connect()
         const { rows } = await client.query("delete from courses where course_id= $1 returning *",[course_id])
         res.json(rows)
      }else{
         res.json({message:"Something is wrong"})
      }
   })



app.route('/groups')
   .get(async(req,res)=> {
      let {id} = req.query

      const client = await pool.connect()
      if(id) {
         const {rows} = await client.query('select * from groups where course_id = $1',[id])
         res.json(rows)
      }else{
         const {rows} = await client.query('SELECT groups.group_id, groups.group_name,courses.course_name, courses.course_id, teachers.teacher_name, teachers.teacher_id FROM groups  FULL OUTER JOIN courses ON groups.course_id = courses.course_id FULL OUTER JOIN teachers ON groups.teacher_id = teachers.teacher_id WHERE group_id >0;')
         res.json(rows)
      }
      client.release()
   })
   .post(async(req,res)=>{
      const {group_name,course_id,teacher_id} = req.body

      const client = await pool.connect()
      if(group_name&&course_id) {
         if(teacher_id) {
            const {rows} = await client.query('insert into groups (group_name,course_id,teacher_id) values ($1,$2,$3) returning *',[group_name,course_id,teacher_id])
            res.json(rows)
         }else{
            res.json({message:"Something is wrong"})
         }
      }else{
         res.json({message:"Something is wrong"})
      }
      client.release()
   })
   .put(async(req,res)=>{
      const {course_name,course_title,course_id} = req.body

      if(course_id) {
         if(course_name && course_title) {
            const client = await pool.connect()
            const {rows} = await client.query('update courses set course_name=$1 ,course_title=$2 where course_id = $3 returning *',[course_name,course_title,course_id])
            client.release()
            res.json(rows)
         }else{
            res.json({message:"Something is wrong :("})
         }
      }else{
         res.json({message:"Something is wrong"})
      }
   })
   .delete(async(req,res)=>{
      const {course_id} = req.body
      if(course_id) {
         const client = await pool.connect()
         const { rows } = await client.query("delete from courses where course_id= $1 returning *",[course_id])
         res.json(rows)
      }else{
         res.json({message:"Something is wrong"})
      }
   })


app.get('/*',(_,res)=>{
   res.sendStatus(404)
})

app.listen(PORT,()=>{
   console.log(`Server is runing at ${PORT}`)
})