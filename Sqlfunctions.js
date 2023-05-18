const { promises } = require('nodemailer/lib/xoauth2');
const { connection } = require('./db/db_connetion');

const find_data = async(query)=>{
    const response = await new Promise((resolve, reject) => {    
        //console.log(query);
        connection.query(query, (err, results) => {
            if (err) reject(new Error(`${err.code} , Err No : ${err.errno}`));
            resolve(results);
        });
    });
    return response;
};

module.exports = {find_data};

