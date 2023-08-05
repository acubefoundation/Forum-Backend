require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 80;
const userRouter = require('./server/api/users/user.router');
const questionRouter = require('./server/api/question/question.router');
const answerRouter = require('./server/api/answer/answer.router');
const pool = require('./server/config/database');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/question", questionRouter);
app.use("/api/answer", answerRouter);
// app.get("/api/question", (req, res) => {
//     let select1 = `SELECT user_name,question,question_description,post_id FROM registration INNER JOIN question ON registration.user_id=question.user_id ORDER BY question_id DESC `;
//  //    let select2 = "SELECT * FROM Products"; //to select all from table products
//          pool.query(select1, (err, results, fields) => {
//              if (err) {console.log(err)}else console.log("yes");
//              res.send(results) ;
//          });
    
//      console.log("recieved..")
//  })



app.listen(port, () => console.log(`Listening at http://localhost:${port}`));