const bcrypt = require("bcrypt");
const User = require("../models/User");

const jwt = require("jsonwebtoken");


require("dotenv").config();
//signup route handler
exports.signup = async (req,res) => {
    try{
        //get data
        const {name, email, password, role} = req.body;
        //check if user already exist
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            });
        }

        //secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return res.status(500).json({
                success:false,
                message:'Error inn hashing Password',
            });
        }

        //create entry for User
        const user = await User.create({
            name,email,password:hashedPassword,role
        })

        return res.status(200).json({
            success:true,
            message:'User Created Successfully',
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered, please try again later',
        });
    }
}



exports.login = async (req,res) => {

      try{

       // data fetch
           const {email, password} = req.body;

          if(!email || !password){

                       return res.status(400).json({

                             success : false,
                         message : 'please fill all the details carefully',
                             });
               }

         // check for register user
         let user = await User.findOne({email});
           // if not a register
            if(!user){

               return res.status(401).json({

               success : false,
                   message : ' user is not registered',

                             });
                             }

       const payload = {

       email : user.email,
        id : user._id,
       role : user.role,
                            };

            // verify password & generated a JWT token
          if(await bcrypt.compare(password , user.password)){
           let token = jwt.sign(payload, process.env.JWT_SECRET,
                                 {
                                            expiresIn : "2h",
                                         });
user = user.toObject();
user.token = token; 
 
    user.password = undefined;

    const options = {
 expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
 httpOnly : true,

    }
    
    res.cookie("token", token , options).status(200).json({

      success : true,
      token ,
       user,
       message : 'user logged in successfully',


    }); 

/*
res.status(200).json({

success : true,
token ,
user,
message : ' hai kya user logged in successfully',


    });
*/

     }
      else {

    // password not match
        return res.status(403).json({
        success  : false,
         message : 'password incorrect',

             });
    }


 }
     catch(error){
     console.error(error);
     return res.status(500).json({

    success : false,
    message : 'Login Failure ',
         });


    }




    }