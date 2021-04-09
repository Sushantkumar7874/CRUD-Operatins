const { request } = require("express");
const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const app = express();
const port = process.env.PORT || 8000

app.use(express.json());
// app.get("/",(req,res)=>{
//     res.send("Hello from the other side. by sushant");
// })

// Create a new Students

// app.post("/students", (req, res) => {

//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     })

// })
// -----OR----   //
app.post("/students", async (req, res) => {
    try {

        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(user);

    } catch (e) {
        res.status(400).send(e);
    }


})

// read the data of registered Students

app.get("/students", async (req, res) => {
    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (e) {
        res.send(e);
    }
})

//get indivisual Student data
app.get("/Students/:id", async (req, res) => {
    try {
        const _id = req.params.id;

        const studData = await Student.findById({ _id: _id });
        if (!studData) {
            return res.status(404).send();
        } else {
            res.send(studData);
        }

        res.send(studentsData);

    } catch (e) {
        res.send(e);
    }
})

//update students by id
app.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(updateStudents);

    } catch (e) {
        res.status(404).send(e);

    }
})

//delete students by id
app.delete("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(404).send();
        }
        res.send(deleteStudent);
    } catch (e) {
        res.status(500).send(e);
    }
})


app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})
