const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
    task: String
});

const Item = new mongoose.model("Item", itemsSchema);

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


const listsSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]                    // Type is array of "Item" documents.
});

const List = new mongoose.model("List", listsSchema);

module.exports.List = List;
module.exports.Item = Item;
module.exports.defaultItems = defaultItems;
