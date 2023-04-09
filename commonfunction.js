const { connection } = require('./db/db_connetion');

const checkemailExits =  async(email,table='users')=>{
    //let email = req.email;
    console.log(`checkemailExits email :  ${email}`);
    
    // //let dbData = await connection.query(checkEamilQuery);
    //     await connection.query(checkEamilQuery, (err, result) => {
    //         console.log( 'err '+ JSON.stringify(err));      
    //         if(err) {
    //             console.log( 'err '+ JSON.stringify(err));  
    //         }  
    //         console.log( 'Result1 : '+ JSON.stringify(result));   
    //         return result;
    //     }
    // )
    //console.log( 'dbData '+ JSON.stringify(dbData));   
    //return dbData; 

    const response = await new Promise((resolve, reject) => {
        let checkEamilQuery = `select * from ${table} where email='${email}'`; 
        console.log('checkEmailQuery : '+checkEamilQuery);
        connection.query(checkEamilQuery, (err, results) => {
            if (err) reject(new Error(`${err.toString()} , Err No : ${err.errno}`));
            resolve(results); 
        });
    });
    return response;
}

module.exports = {checkemailExits}; 

