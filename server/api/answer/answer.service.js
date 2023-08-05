const pool = require("../../config/database");
module.exports = {
   
  AddAnswer: (data, callback) => {
    // sql query to insert answer
    pool.query(
      `INSERT INTO answer(answer,user_id,question_id)VALUES(?,?,?)`,
      [data.answer, data.id, data.questionId],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  
  answerByQuestionId: (data, callback) => {
    //getting data from registration and profile tables by joining them
    pool.query(
      `SELECT user_name,answer FROM registration INNER JOIN answer ON registration.user_id=answer.user_id WHERE answer.question_id= ? `,
      [data.question_id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        console.log(result)
        return callback(null, result);
      }
    );
  },
};