const { AddQuestion, getall, questionBypostId } = require("./question.service");
const pool = require("../../config/database");


module.exports = {

  AskQuestion: (req, res) => {
    const { question, description, user_id } = req.body;
    console.log(req.body);
    
    if (!question)
      return res.status(400).json({ msg: "quesion title should be provided!" });
    const ques = question.trim().split();
    if (ques.length > 200)

      return res
        .status(400)
        .json({ msg: "question title can not proceed 200 words !" });
    else {
      //function that generate unique post id
        function generateRandomInteger() {
        const maxDigits = 10;
        const randomNumber = Math.floor(
          Math.random() * Math.pow(10, maxDigits)
        );
        return randomNumber;
      }
      
      const post_id = generateRandomInteger();
      // console.log(randomInteger);
      AddQuestion(req.body,post_id ,(err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "database connection error" });
        }
        return res.status(200).json({
          msg: "New question added successfully",
          data: results,
        });
      });
    }
  },


  allquestion: (req, res) => {
    getall((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res.status(404).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: results });
    });
  },
  

  questionById: (req, res) => {
      const post_id = req.params;

    //getting req.id from auth middleware
    questionBypostId(post_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res.status(404).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: results });

    });
  },
};