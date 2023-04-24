const { promises } = require('nodemailer/lib/xoauth2');
const { connection } = require('./db/db_connetion');

const checkemailExits = async (email, table = 'users') => {
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
        console.log('checkEmailQuery : ' + checkEamilQuery);
        connection.query(checkEamilQuery, (err, results) => {
            if (err) reject(new Error(`${err.toString()} , Err No : ${err.errno}`));
            resolve(results);
        });
    });
    return response;
}

const getProducts = async (type = 'all') => {
    let productsData = await new Promise((resolve, reject) => {
        let sqlQuery = 'SELECT * from products';
        if (type == 'active') {
            sqlQuery = 'SELECT * from products where staus=1';
        }
        console.log(sqlQuery);
        connection.query(sqlQuery, (err, result) => {
            if (err) reject(new Error(`${err.toString()} , Err No : ${err.errno}`));            
            let products = [];            
            if (result.length > 0) {
                result.forEach(element => {
                    //console.log(element.id);
                    let { id = '', name = '', price = '', discount_price = '', description = '', color = '', size = '', category = '',product_image='' } = element;
                    let obj = { 'id': id, 'name': name, 'price': price, 'discount_price': discount_price, 'description': description, 'color': color, 'size': size, 'category': category ,'productImage':product_image}
                    products.push(obj);
                    resolve(products);
                });
            }
        })
    });
    return productsData;
}

const categories = async(type='')=>{
    let categoriesList= await new Promise((resolve, reject)=>{
        let sqlQuery = `select * from category`;
        if(type){
        let sqlQuery = `select * from category where status= '${type}'`;
        }
        console.log(sqlQuery);
        connection.query(sqlQuery,(err,result)=>{
            if(err){ reject(err.toString); }
            let categoriesData = [];
            if(result.length>0){
                result.forEach(element=>{
                    let { id = '', name = '', status = '' } = element;
                    let obj = { 'id': id, 'name': name, 'status': status}
                    categoriesData.push(obj);
                    resolve(categoriesData);
                });
            }
        });
    });
    return categoriesList;    
}

const categoriesMapping = async(type='')=>{
    let getcategories=  await categories();
    let categoriesMapping = await new Promise((resolve, reject)=>{
    console.log('categoriesMapping');
    console.log(JSON.stringify(getcategories));
    let categoriesData = {};
    if(getcategories.length>0){
        getcategories.forEach(element=>{
                        let { id = '', name = '', status = '' } = element;
                        let obj = { 'id': id, 'name': name, 'status': status}
                        //categoriesData.push(obj);
                        categoriesData[id] = obj;
                        resolve(categoriesData);
                    });
                }
            });
    
    
    // let categoriesMapping = await new Promise((resolve, reject)=>{
    //     let sqlQuery = `select * from category`;        
    //     console.log(sqlQuery);
    //     let categoriesData = {};
    //     connection.query(sqlQuery,(err,result)=>{
    //         if(err){ 
    //             console.log(err.toString); 
    //             reject(categoriesData);
    //         }            
    //         if(result.length>0){
    //             result.forEach(element=>{
    //                 let { id = '', name = '', status = '' } = element;
    //                 let obj = { 'id': id, 'name': name, 'status': status}
    //                 //categoriesData.push(obj);
    //                 categoriesData[id] = obj;
    //                 resolve(categoriesData);
    //             });
    //         }
    //     });
    // });
    console.log(JSON.stringify(categoriesMapping)); 

    return categoriesMapping;    
} 

const productDetails = async (productId)=>{   
    let productsDetailArray = {}; 
    if(productId) { 
        let sqlQuery = `select * from products where id='${productId}'`;
        console.log(sqlQuery);
        productsDetailArray = await new Promise((resolve, reject)=>{
            let productsDetailData = {};
            connection.query(sqlQuery,(err,result)=>{
                if(err){
                    console.log(err.message.toString); 
                    reject(productsDetailData);            
                }
                console.log(result.length);
                if(result.length>0){
                    productsDetailData = JSON.parse(JSON.stringify(result[0]));   
                    resolve(productsDetailData);         
                }
            })
       })
    }      
  return productsDetailArray;
}

module.exports = { checkemailExits, getProducts , categories , categoriesMapping , productDetails};

