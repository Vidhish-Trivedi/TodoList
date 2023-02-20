const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// EJS: Tell our app to use EJS.
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connect to DB.
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

// Schema.
const itemsSchema = new mongoose.Schema({
    task: String
});

// Model.
const Item = new mongoose.model("Item", itemsSchema);

// Instantiate documents.
const i_1 = new Item({
    task: "Welcome to your ToDoList!"
});

const i_2 = new Item({
    task: "Click the + button to add a new task."
});

const i_3 = new Item({
    task: "<--- Click this to delete a task."
});

const defaultItems = [i_1, i_2, i_3];


// Root route.
app.get("/", function(req, res){
    var today = new Date();

    var options = {weekday: "long", day: "numeric", month: "long"};
    var day = today.toLocaleDateString("en-US", options);    // Format: Saturday, January 21

    // Find...
    Item.find({}, function(err, items){
        if(err){
            console.log(`There was an error: ${err}`);
        }

        else{            
            if(items.length === 0){
                Item.insertMany(defaultItems, function(err){
                    if(err){
                        console.log(`There was an error: ${err}`);
                    }
                    else{
                        console.log("Defaults inserted.");
                    }
                });
            }

            console.log("Found successfully");
            
            // items.forEach(el => {
            //     console.log(el);
            // });

            res.render("list", {listTitle: day, newListItems: items});
        }
    });
});


app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});


app.post("/", function(req, res){
    
    if(req.body.listBtn === "Work"){
        workItems.push(req.body.newTask);
        res.redirect("/work");
    }
    else{
        newItems.push(req.body.newTask);
        res.redirect("/");
    }
});


app.post("/work", function(req, res){
    workItems.push(req.body.newTask);
    console.log(workItems);

    // We need to pass/redirect this newItem to the get method.
    res.redirect("/work");
});


app.listen(3000, function(){
    console.log("Server listening on port 3000.");
});
