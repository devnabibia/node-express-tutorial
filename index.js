const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]
app.get('/', (req,res) => {
    res.send('Hello World!!!')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
}) 
//POST
app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema)

    if (result.error) {
        res.status(400).send(result.error.details[0].message )
        return
    }

         //if (!req.body.name || req.body.name.length < 3) {
        //400 Bad request
        req.status(400).send('Name is required and should be minimum 3 character')
        return; 
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    } 
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {

    //look up the course
    //if not existing return 404
    const course = courses.find(c => c.id ===parseInt(req.params.id))
   if(!course) res.status(404).send('The course of the given ID was not found');
    

    //validate
    //if invalid, return 400 -bad request
    const result = validateCourse(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message )
        return
    }

    
    //update course
    //return the updated course
    course.name = req.body.name
    res.send(course)
    
})




// /api/courses/1
app.get('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id ===parseInt(req.params.id))
   if(!course) res.status(404).send('The course of the given ID was not found');
   res.send(course)
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)

    if (result.error) {
        res.status(400).send(result.error.details[0].message )
        return
    }

}

//PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listen on port ${port}...`))