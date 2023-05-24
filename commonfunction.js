const { promises } = require('nodemailer/lib/xoauth2');
const { connection } = require('./db/db_connetion');
const {find_data} = require('./Sqlfunctions');
require('dotenv').config();

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
                //console.log(result.length);
                if(result.length>0){
                    productsDetailData = JSON.parse(JSON.stringify(result[0]));   
                    resolve(productsDetailData);         
                }
            })
       })
    }      
  return productsDetailArray;
} 

const clientDetails = async(clientId,removePassword='1')=>{
    if(clientId) {
        let sql = `select *  from users where id = '${clientId}'`;        
        let clientDetails = await find_data(sql);
        if(clientDetails.length>0){
            clientDetailsData = clientDetails[0];
            //clientDetailsData.push(obj);
            if(removePassword){
            delete clientDetailsData['password'];
            }
        }else{
            let clientDetailsData = {};
        }
    }
    return clientDetailsData;
}

const States = async()=>{
let stateObj = {"AP":"Andhra Pradesh","AR":"Arunachal Pradesh","AS":"Assam","BR":"Bihar","CT":"Chhattisgarh","GA":"Goa","GJ":"Gujarat","HR":"Haryana","HP":"Himachal Pradesh","JK":"Jammu and Kashmir","JH":"Jharkhand","KA":"Karnataka","KL":"Kerala","MP":"Madhya Pradesh","MH":"Maharashtra","MN":"Manipur","ML":"Meghalaya","MZ":"Mizoram","NL":"Nagaland","OR":"Odisha","PB":"Punjab","RJ":"Rajasthan","SK":"Sikkim","TN":"Tamil Nadu","TG":"Telangana","TR":"Tripura","UP":"Uttar Pradesh","UT":"Uttarakhand","WB":"West Bengal","AN":"Andaman and Nicobar Islands","CH":"Chandigarh","DN":"Dadra and Nagar Haveli","DD":"Daman and Diu","LD":"Lakshadweep","DL":"National Capital Territory of Delhi","PY":"Puducherry"}
return stateObj; 
}

const getClientCardDetails = async(clientId)=>{
    console.log(`clientId : ${clientId}`);
    let sqlQuery = `select * from cart where user_id=${clientId}`;
    let cartData = await find_data(sqlQuery);
    console.log(sqlQuery);
    let cardItem ={}; 
    let cardItemArray =[];
    let cardTotal = 0;
    let shippingCharge = process.env.SHIPPING_CHARGE;
    let grandTotal = 0; 
    //let cardItemData = [];

            // if(cartData.length) {                     
            //     cartData.forEach((element)=>{
            //         console.log(element.product_id);
            //             let {product_id	=''} = element;
            //             console.log(`product_id ${product_id}`);  
                        
            //             let sqlQuery = `select * from products where id='${product_id}'`   
            //             const productsResult = await find_data(sqlQuery);
            //             console.log(`product Data ${productsResult[0].id}`); 
                        
            //     });
            // }

            let itemCounter = 0;
            for(let element in cartData) {
                console.log(cartData[element].product_id);
                let product_id = cartData[element].product_id;
                let quantity = cartData[element].quantity;
                let cardItemId = cartData[element].id;
                
                if(product_id){

                //let productsSqlQuery = `select * from products where id='${product_id}'`;
                //const productsResult = await find_data(productsSqlQuery);                
                //let {id='',name='',price='',product_image='',discount_price=''} = productsResult[0];
                //console.log(productsResult[0].discount_price);
                
                let productsResult =  await productDetails(product_id);
                //console.log(productsResult);                
                let {id='',name='',price='',product_image='',discount_price=''} = productsResult;
                cardItem =  {'productName':name,'productPrice':price,'productImage':product_image,'producId':id,'discountPrice':discount_price,'quantity':quantity,'cardItemId':cardItemId};
                //console.log((cardItem));
                cardItemArray.push(cardItem);
                cardTotal += quantity*price;
                itemCounter++;
                }
            }

            shippingCharge = (cardTotal>1000) ?  shippingCharge : 0;

            grandTotal = parseInt(cardTotal)+parseInt(shippingCharge);

            let cardData = {'cardTotal':cardTotal,'grandTotal':grandTotal,'shipping':shippingCharge,'cardItemArray':cardItemArray,'itemCount':itemCounter};
            return cardData;
}


const checkProductIsAvaliableInCard = async(productId,userId)=>{
        let isProductIsAvaliableInCard = await new Promise((resolve, reject)=>{
        let checkProduct = `SELECT * FROM cart where product_id='${productId}' and user_id='${userId}'`;
            console.log(checkProduct);
            connection.query(checkProduct, (err,result)=>{
                if(err){
                    reject(0);
                }
                console.log(result.length);  
                if(result.length > 0){                                     
                    resolve(1); 
                }else{                                      
                    resolve(0); 
                }
            });
        }) 
    console.log(JSON.stringify(isProductIsAvaliableInCard)); 
    return isProductIsAvaliableInCard;
}

module.exports = { checkemailExits, getProducts , categories , categoriesMapping , productDetails, checkProductIsAvaliableInCard , clientDetails,States,getClientCardDetails};

