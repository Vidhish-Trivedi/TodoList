function getDay(){
    var today = new Date();
    var options = {weekday: "long", day: "numeric", month: "long"};
    var day = today.toLocaleDateString("en-US", options);    // Format: Saturday, January 21

    return(day);
};

module.exports.getDay = getDay();
