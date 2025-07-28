const express = require("express");


const  router = express.Router();


const { login , signup } = require("../Controllers/Auth");
const {auth , isStudent , isAdmin} = require("../middlewares/auth");
const User = require("../models/User");

router.post("/signup" , signup);

router.post("/login" , login);


// testing route created

router.get("/test", auth, (req, res) => {
    
res.json({
    success : true,

    message : 'welcome to the protected route for test', 
});



});
router.get("/student" , auth, isStudent , (req, res) => {

res.json({
success : true,
message : 'welcome to the protected route for student',


});

});
router.get("/admin", auth, isAdmin , (req, res) => {

res.json({

    success : true,
    message : ' welcome to the protected route for admin'
});

});



/*
router.get("/getEmail" , auth ,  async(req, res) => {



try{

const id  = req.user.id;
const user = await User.findById(id);
res.status(200).json({

    success : true,
    user :user,
message : 'welcome to the email route',

})


}
catch(error){

res.status(500).json({

    success : false,
    error : error.message,
    message : 'fat gaya code',
});

}







});*/

module.exports = router;
