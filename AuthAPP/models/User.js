const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

name : {
    type : String,
    required : true,
    trim : true,
},
email : {

type : String,
required : true, 
trim : true,

}
,
password : {
    type : String , 
    required : true,
},
role : {
   type : String,
   required : true,
    enum : ["Admin", "student" , "visitor"]
}

});

module.exports = mongoose.model("user", userSchema);