const pool = require("../../config/database");

module.exports = {
  //data comes form the user controller
  AddQuestion: (data,post_id, callback) => {
    //inserting data to registration table
    pool.query(
      `INSERT INTO question(question,question_description,user_id,post_id)VALUES(?,?,?,?)`,
      [data.question, data.description,data.user_id, post_id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  getall: (callback) => {
    //getting data from registration and profile tables by joining them
    pool.query(
      `SELECT user_name,question,question_description,post_id FROM registration INNER JOIN question ON registration.user_id=question.user_id ORDER BY question_id DESC `,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },


  questionBypostId: (data, callback) => {
    //getting data from registration and profile tables by joining them
    pool.query(
      `SELECT user_name,question,question_description,question_id FROM registration INNER JOIN question ON registration.user_id = question.user_id WHERE question.post_id = ? `,
      [data.post_id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result[0]);
      }
    );
  },
};