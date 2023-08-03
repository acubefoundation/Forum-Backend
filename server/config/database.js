//database.js
        const mysql = require('mysql2');
require('dotenv').config()

    // const pool = mysql.createPool({
    //   connectionLimit: 10,
    //   host: 'aws.connect.psdb.cloud',
    //   user: '2hc9eqsqrm3n65k79l2b',
    //   password: 'pscale_pw_4PktMuQwfBdzTC07eq3Tq8lIBohdqA4qhVeeDf6yPXO',
    //   database: 'evangadi-forum',
    //   debug: true,
    //   acquireTimeout: 30000

    // //   ssl: {
    // //     rejectUnauthorized: true
    // //   }
    // });

// const pool = mysql.createConnection(process.env.DATABASE_URL)

    // const retryConnection = () => {
    //     console.log('Retrying database connection...');
    //     pool.getConnection((err, connection) => {
    //       if (err) {
    //         console.error('Error connecting to MySQL:', err);
    //         setTimeout(retryConnection, 5000); // Retry after 5 seconds
    //       } else {
    //         console.log('Connected to MySQL successfully');
    //         connection.release();
    //       }
    //     });
    //   };
      
    //   retryConnection();
      
    

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB,
    password: process.env.PASS,
    connectionLimit: 10,

  });


  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL successfully');
      connection.release(); // Release the connection back to the pool
    }
  });

let registration = `CREATE TABLE if not exists registration (
    user_id int auto_increment,
    user_name varchar(255) not null,
    user_email varchar(255) not null,
    user_password varchar(255) not null,
    PRIMARY KEY (user_id)
)`;

let profile = `CREATE TABLE if not exists profile (
    user_profile_id int auto_increment,
    user_id int not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    PRIMARY KEY (user_profile_id)
)`;

let question = `CREATE TABLE if not exists question (
    question_id int auto_increment,
    question varchar(255) not null,
    question_description varchar(255),
    question_code_block varchar(255),
    tags varchar(255),
    post_id varchar(255) not null,
    user_id int not null,
    PRIMARY KEY (question_id),
    UNIQUE KEY (post_id)
)`;

let answer = `CREATE TABLE if not exists answer (
    answer_id int auto_increment,
    answer varchar(255) not null,
    answer_code_block varchar(255),
    user_id int not null,
    question_id int not null,
    PRIMARY KEY (answer_id)
)`;

pool.query(registration, (err, results, fields) => {
    if (err) {
        console.log(err);
    } else {
        console.log("table registration created");
    }
});

pool.query(profile, (err, results, fields) => {
    if (err) {
        console.log(err);
    } else {
        console.log("table profile created");
    }
});


pool.query(question, (err, results, fields) => {
    if (err) {console.log(err)}else {
        console.log("table question created")
    }
});


pool.query(answer, (err, results, fields) => {
    if (err) {console.log(err)}else {
        console.log("table answer created")
    }
});



module.exports = pool;