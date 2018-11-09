const express = require('express');
const app = express();

const courses = 
[
    {id:1, course: 'okay'},
    {id:2, course: 'okay2'},
    {id:3, course: 'okay3'}
]

app.get('/', (req,res)=>{
    res.send('HELLO THERE BOY');
} );

app.get('/api/courses', (req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id', (req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('No such id');
    res.send(course);
});

const port = process.env.PORT || 3000; //Either specified port or set it to 3000
app.listen(port, () => console.log("listening on port 3000"))