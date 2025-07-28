const express = require("express");
const app = express();

  require("dotenv").config();

  const PORT = process.env.PORT;

const cookieParser = require("cookie-parser");

app.use(cookieParser());




app.use(express.json());

require("./config/database").connect();

console.log('above case is correct');

const user = require("./routes/user");
// api mount 



console.log('thi is secure.........');

app.use("/api/v1" , user);


app.listen(PORT , () => {

console.log(`server run at ${PORT}`);

});
