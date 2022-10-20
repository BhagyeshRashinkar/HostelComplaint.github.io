const express = require('express'); 
const path = require('path');
const app = express();
const hbs = require('hbs');
const dotenv = require('dotenv');

require('./db/conn');
const Register = require('./models/registercomplaint');

dotenv.config();
const port = process.env.PORT || 3000;


const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

//Rendering front page.
app.get('/', function (req, res) {
    res.render("Hostel_Complaint");
})

//Data from database to complaint table.
app.get('/table', function (req, res) {
    Register.find().sort({_id:-1})
        .then(data => {
            // console.log(data);
            res.render("table", { users: data });
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

//Data from database to complaint management table.
app.get("/hosteltable", function (req, res) {
    Register.find().sort({_id:-1})
        .then(data => {
            // console.log(data);
            res.render("hosteltable", { users: data });
        })
        .catch(err => {
            res.status(500).send(err)
        })
})






//Posting data from complaint form to database.
app.post("/", function (req, res) {
    if (!req.body) {
        res.status(400).send({ message: "Please fill all fields!" });
        return;
    }

    const registerComplaint = Register({
        complaintnumber: req.body.number,
        studentroll: req.body.roll,
        studentname: req.body.name,
        studentcontact: req.body.contact,
        hostelblock: req.body.block,
        hostelroom: req.body.room,
        complainttype: req.body.type,
        description: req.body.description,
    })

    registerComplaint
        .save(registerComplaint)
        .then(
            res.status(201).redirect("/table"))
        .catch(err => {
            res.status(500).send({ message: err.message || "Data can't be sent to database" })
        });
})


//Delete from both the tables and database.
app.post('/table/:id', function (req, res) {
    const id = req.params.id;

    Register.deleteOne({id:id})
        .then(data => {
            if (!data) {
                res.status(404).send(`Data with ${id} was not found`);
            }
            else {
                res.redirect("http://localhost:8080/table");
            }
        })
        .catch(err => {
            res.status(500).send(`User with ${id} was can't be deleted.`)
        })
})


//Update complaint status in both the tables and database.
app.post('/hosteltabl/:_id', function (req, res) {
    if(!req.body){
        return res
        .status(400)
        .send("Data to update status can't be found");
    }
    else{
        const id = req.params._id;
        Register.updateOne({_id:id},{
            $set:{complaintstatus: "resolved"}
        })
        .then(data => {
            if(!data){
                res.status(404).send(`Cannot update complaint status of user with ${id}`);
            }
            else{
                res.redirect("http://localhost:8080/hosteltable");
            }
        })
        .catch(err => {
            res.status(500).send("Error updating complaint status" +err)
        })
    }
})

//Delete from both the tables and database.
app.post('/hosteltable/:id', function (req, res) {
    const id = req.params.id;

    Register.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send(`Data with ${id} was not found`);
            }
            else {
                res.redirect("http://localhost:8080/hosteltable");
            }
        })
        .catch(err => {
            res.status(500).send(`User with ${id} was can't be deleted.`)
        })
})


app.listen(port, function (err) {
    console.log(`server is running at port http://localhost:${port}`);
})