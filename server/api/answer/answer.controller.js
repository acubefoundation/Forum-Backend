const { AddAnswer, answerByQuestionId } = require("./answer.service");
const pool = require("../../config/database");

module.exports={
// function to insert answer to the answer table
    Answer:(req,res)=>{
        const {answer,questionId,id}=req.body;
        if(!answer)
      return res.status(400).json({ msg: "Answer should be provided!!" });
      
            else {
              AddAnswer(req.body, (err, results) => {
                if (err) {
                  console.log(err);
                  return res
                    .status(500)
                    .json({ msg: "database connection error" });
                }

                return res.status(200).json({
                  msg: "New answer added successfully",
                  data: results,
                });
              });
            }
    } ,

//function to fetch answer using question answer
    getAnswer:(req,res)=>{
      question_id=req.params
 //getting req.id from auth middleware
 answerByQuestionId(question_id, (err, results) => {
   if (err) {
     return res.status(500).json({ msg: "database connection err" });
   }
   if (!results) {
     return res.status(404).json({ msg: "Record not found" });
   }
   return res.status(200).json({ data: results });
 });
}
}








