const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// EJS: Tell our app to use EJS.
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Global List to track new tasks to be added.
var newItems = [];
var workItems = [];

app.get("/", function(req, res){
    var today = new Date();

    // Replacing the switch statement.
    var options = {weekday: "long", day: "numeric", month: "long"};
    var day = today.toLocaleDateString("en-US", options);    // Format: Saturday, January 21
    
    res.render("list", {listTitle: day, newListItems: newItems});  // Returns a number, 0 --> Sunday, 6 --> Saturday.
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});  // Returns a number, 0 --> Sunday, 6 --> Saturday.
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
