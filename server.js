const express = require('express');
const app = express();
var mysql = require('mysql');


//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin' need to call this in mysql database to fix error
var connection = mysql.createConnection({
    host: 'localhost',
    port:'3306',
    user:'root',
    password:'admin',
    database: 'customers'
});

connection.connect(function(error) //To check whether the database is connected
{
    if(error)
    {
        console.log(error);
    }
    else{
        console.log('Connected');
    }
})



const courses = 
[
    {id:1, course: 'okay'},
    {id:2, course: 'okay2'},
    {id:3, course: 'okay3'}
]

app.get('/', (req,res)=>{
  
    connection.query('SELECT * from `students`', function(error,results,field)//Results is everything and field just shows the field data 
    {
        if(error)
        {
            console.log("ERROR QUERYING");
        }
        else{
            
            res.send(results);
        }
    })
} );

app.get('/api/courses', (req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id', (req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('No such id');
    res.send(course);
});

const port = process.env.PORT || 3000; //Either specified port or set it to 3000, this is to set whichever port you want to open
app.listen(port, () => console.log("listening on port 3000"))