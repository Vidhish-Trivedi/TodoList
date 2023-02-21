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

// Item Schema.
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

// List Schema.
const listsSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]                    // Type is array of "Item" documents.
});

// Model.
const List = new mongoose.model("List", listsSchema);


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

            res.render("list", {listTitle: day, newListItems: items});
        }
    });
});


// app.get("/work", function(req, res){
//     res.render("list", {listTitle: "Work List", newListItems: workItems});
// });

// Dynamic routic using Express.
app.get("/:customListName", function(req, res){
    const customListName = req.params.customListName;

    List.findOne({name: customListName}, function(err, foundList){      // foundList is an object from DB.
        if(err){
            console.log(`There was an error: ${err}`);
        }

        else{
            if(foundList){
                console.log("List exists...");
                res.render("list", {listTitle: customListName, newListItems: foundList.items});
            }
        
            else{
                console.log("Creating new list...");
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect(`/${customListName}`);
            }
        }
    });

});


app.post("/", function(req, res){
   
    // Add newly created task to DB.
    const itemName = req.body.newTask;
    const listName = req.body.listBtn;
    const item = new Item({task: itemName});

    var today = new Date();
    var options = {weekday: "long", day: "numeric", month: "long"};
    var day = today.toLocaleDateString("en-US", options);    // Format: Saturday, January 21

    if(listName === day){
        item.save();
        res.redirect("/");
    }
    else{
        // Find the customList in DB and update it by adding the new item to its items array.
        List.findOne({name: listName}, function(err, foundList){
            if(err){
                console.log(`There was an error: ${foundList}`);
            }
            else{
                foundList.items.push(item);
                foundList.save();
                res.redirect(`/${listName}`);
            }
        });
    }


});

app.post("/delete", function(req, res){
    const checked_id = req.body.id_checked;

    // Remove item checked by user.
    Item.findByIdAndRemove({_id: checked_id}, function(err){
        if(err){
            console.log(`There was an error: ${err}`);
        }
        else{
            console.log(`Removed ${checked_id} successfully.`);
            res.redirect("/");
        }
    });
});


app.listen(3000, function(){
    console.log("Server listening on port 3000.");
});
