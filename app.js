const { query, json } = require('express');
const express = require('express');
const app = express();
const mysql = require('mysql')
var session = require('express-session');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
const crypto = require('crypto');


require('dotenv').config();
var cookies = require("cookie-parser");
app.use(cookies());

var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var { islogin } = require('./isLoginMiddleware');
var { loginMenu } = require('./loginMenuMiddleware');
//var { isadminlogin } = require('./isadminLoginMiddleware');

const { connection } = require('./db/db_connetion');
const { checkemailExits, productDetails, checkProductIsAvaliableInCard, clientDetails, States, getClientCardDetails } = require('./commonfunction');
const { find_data,insert_data } = require('./Sqlfunctions');
const { transporterMail } = require('./mailConfig');
const { adminRouter, adminRouterwithLogin } = require('./adminRouter');
const router = express.Router();
router.use(loginMenu);
const LoginMiddleware = [islogin];

const PORT = 3001;


app.use(express.static(__dirname + '/public'));
//app.use(express.static('/uploads')); 
app.use('/uploads', express.static('uploads'));

// Set EJS as templating engine 
app.set('view engine', 'ejs');

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: 'AXDC@159',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay }
}))

router.get('/', (req, res) => {
    console.log(`root router`);

    connection.query('SELECT * from products where staus=1', (err, result) => {
        if (err) throw err
        console.log('Products Id is : ', result[0].id)

        let products = [];
        result.forEach(element => {
            console.log(element.id);
            let { id = '', name = '', price = '', discount_price = '', description = '', color = '', size = '', category = '', product_image = '' } = element;
            let obj = { 'id': id, 'name': name, 'price': price, 'discount_price': discount_price, 'description': description, 'color': color, 'size': size, 'category': category, 'productImage': product_image }
            products.push(obj);
        });
        console.log(JSON.stringify(products));
        res.render('index', { 'products': products });
    })

})

// router.get('/',(req, res)=>{
//     console.log(`root router`);  
//     res.render('index');
// })

router.get('/shop', (req, res) => {
    console.log(`shop router`);
    res.render('shop');
})

router.get('/detail', async (req, res) => {
    console.log(`detail router`);
    //let productsDetails = {};
    if (req.query.id) {
        let productsDetail = await productDetails(req.query.id);
        console.log(JSON.stringify(productsDetail));
        res.render('detail', productsDetail);
    } else {
        res.redirect('/');
    }
})



// router.get('/cart', async(req, res) => {
//     console.log(`cart router`);
//     let clientId = req.session.clientId;
//     console.log(`clientId : ${clientId}`);
//     let sqlConnection = `select * from cart where user_id=${clientId}`;
//     console.log(sqlConnection);
//     let cardItem ={}; 
//     let cardItemArray =[];
//     //let cardItemData = [];
//     connection.query(sqlConnection, (err,result)=>{
//         if(err){
//                   console.log(err.message.toString);
//         }else {
//             if(result.length) {
//                let cardItemData = new Promise((resolve,reject)=>{       
//                 if(result.length) {
//                     reject(0);
//                 }      
//                 result.forEach(element=>{
//                     console.log(element.product_id);
//                         let {product_id	=''} = element;
//                         console.log(`product_id ${product_id}`);
//                         let productsDetail = productDetails(product_id);  
//                         console.log('productsDetail : '+productsDetail); 

//                         productsDetail.then(function(productsResult){
//                             //console.log(`result ${result}`);
//                             //console.log( JSON.stringify(productsResult));
//                             let producId = productsResult.id;
//                             let productName = productsResult.name;
//                             let productPrice = productsResult.discount_price;
//                             let productImage =  productsResult.product_image;   
//                             cardItem =  {'productName':productName,'productPrice':productPrice,'productImage':productImage,'producId':producId};
//                             console.log((cardItem));
//                             cardItemArray.push(cardItem);
//                         }); 
//                 });
//                             resolve(cardItemArray);
//             });
//                     console.log( JSON.stringify(cardItemArray));   
//                     //res.render('cart',{'cardItems':cardItemArray});  

//                     //console.log( JSON.stringify(cardItemData));   
//                     //res.render('cart',{'cardItems':cardItemData});

//                      //console.log('123');  
//                     // console.log( JSON.stringify(cardItemData));   
//                     // res.render('cart',{'cardItems':cardItemData});  

//             } 

//         }
//     })

// }) 

router.get('/cart', LoginMiddleware, async (req, res) => {
    console.log(`cart router`);
    let clientId = req.session.clientId;
    //let clientId = 38;
    console.log(`clientId : ${clientId}`);
    let sqlQuery = `select * from cart where user_id=${clientId}`;
    let cartData = await find_data(sqlQuery);
    console.log(sqlQuery);
    let cardItem = {};
    let cardItemArray = [];
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

    for (let element in cartData) {
        console.log(cartData[element].product_id);
        let product_id = cartData[element].product_id;
        let quantity = cartData[element].quantity;
        let cardItemId = cartData[element].id;

        if (product_id) {

            //let productsSqlQuery = `select * from products where id='${product_id}'`;
            //const productsResult = await find_data(productsSqlQuery);                
            //let {id='',name='',price='',product_image='',discount_price=''} = productsResult[0];
            //console.log(productsResult[0].discount_price);

            let productsResult = await productDetails(product_id);
            console.log(productsResult);
            let { id = '', name = '', price = '', product_image = '', discount_price = '' } = productsResult;
            cardItem = { 'productName': name, 'productPrice': price, 'productImage': product_image, 'producId': id, 'discountPrice': discount_price, 'quantity': quantity, 'cardItemId': cardItemId };
            console.log((cardItem));
            cardItemArray.push(cardItem);
        }
    }
    res.render('cart', { 'cardItems': cardItemArray });

})

router.get('/checkout', LoginMiddleware, async (req, res) => {
    console.log(`checkout router`);
    let clientDetailsData = {};
    if (req.session.clientId) {
        let clientId = req.session.clientId;
        clientDetailsData = await clientDetails(clientId);

        //console.log( JSON.stringify(clientDetailsData));
        //let States = [];
        let stateObj = await States();
        let ClientCardDetails = await getClientCardDetails(clientId);

        // console.log(ClientCardDetails.cardTotal);
        // console.log(ClientCardDetails.grandTotal);
        // console.log(ClientCardDetails.shipping);
        // console.log(ClientCardDetails.cardItemArray);        

        res.render('checkout', { 'cardItems': ClientCardDetails.cardItemArray, 'clientData': clientDetailsData, 'States': stateObj, 'cardTotal': ClientCardDetails.cardTotal, 'grandTotal': ClientCardDetails.grandTotal, 'shipping': ClientCardDetails.shipping });
    }



})

router.post('/checkPayemtDetails', LoginMiddleware, async (req, res) => {    
    let status = 0;
    let msg = '';  
    let { name = '', email = '', mobile = '', address = '', city = '', state = '', pincode = '', grandTotal = '', payment = '' } = req.body;
    if (name != '' || email != '' || mobile != '' || address != '' || city != '' || state != '' || pincode != '' || grandTotal != '' || payment != '') {
        status = 1;
        msg = 'Valid details';
        resobj = { 'status': status, 'msg': msg };
        res.json(resobj);
    }
    else {
        status = 0;
        msg = 'Invalid details';
        resobj = { 'status': status, 'msg': msg };
        res.json(resobj);
    }
});


router.post('/updateDetailsAfterPayment', LoginMiddleware, async (req, res) => {
    let status = 0;
    let msg = '';  
    let { name = '', email = '', mobile = '', address = '', city = '', state = '', pincode = '', grandTotal = '', payment = '',paymentId='' } = req.body;
    if (name != '' || email != '' || mobile != '' || address != '' || city != '' || state != '' || pincode != '' || grandTotal != '' || payment != '') {
        
            let clientId = req.session.clientId;
            let updateClientData = `update users set name='${name}',address='${address}',state='${state}',city='${city}',pincode='${pincode}' where id=${clientId}`;
            connection.query(updateClientData, (err, result) => { 
            })

            let ClientCardDetails = await getClientCardDetails(clientId);
            console.log('length : ' + ClientCardDetails.cardItemArray.length);
            if (ClientCardDetails.cardItemArray.length > 0) {
                let sqlQuery = `insert into orders(name,user_id,email,mobile,address,state,city,pincode,total,payment_type,paymentId) values ('${name}','${clientId}','${email}','${mobile}','${address}','${state}','${city}','${pincode}','${grandTotal}','${payment}','${paymentId}')`;
                await connection.query(sqlQuery, (err, result) => {
                    if (err) { throw err }
                    else {
                        console.log(JSON.stringify(result));
                        let orderId = result.insertId;

                        const cardItems = ClientCardDetails.cardItemArray;
                        for (item in cardItems) {
                            let { productName = '', productPrice = '', producId = '', cardItemId = '', quantity = '' } = cardItems[item];
                            let sqlQuery = `insert into order_items(product_name,product_price,produc_id,card_item_id,quantity,order_id,user_id,paymentId) values ('${productName}','${productPrice}','${producId}','${cardItemId}','${quantity}','${orderId}','${clientId}','${paymentId}')`;
                            connection.query(sqlQuery, (err, result) => {
                                if (err) { throw err } else {
                                    //console.log(JSON.stringify(result));
                                    let order_items_insertId = result.insertId;
                                    console.log(` order_items_insertId ${order_items_insertId}`);
                                }
                            });
                        }
                        let sqlQuery = `delete from cart where user_id=${clientId}`;
                        connection.query(sqlQuery, (err, result) => {
                        })
                    }
                })
                status = 1;
                msg = 'Order place Successfully';
                resobj = { 'status': status, 'msg': msg };
                res.json(resobj);
            } else {
                status = 1;
                msg = 'Card Empty';
                resobj = { 'status': status, 'msg': msg };
                res.json(resobj);
            }
        
    }
    else {
        status = 0;
        msg = 'Invalid details';
        resobj = { 'status': status, 'msg': msg };
        res.json(resobj);
    }
});


router.get('/contact', (req, res) => {
    console.log(`contact router`);
    res.render('contact');
})

app.post('/contactPost', async (req, res) => {
    let { name = '', email = '', subject = '', message = '' } = req.query;

    email = email.trim();
    console.log(`name ${name}`);

    if (name != '' || email != '' || subject != '' || message != '') {
        let rdata = await checkemailExits(email, 'contact_us');
        let rdataLeng = rdata.length;
        console.log(`rdataLeng ${rdataLeng}`);
        if (rdataLeng > 0) {
            console.log(' testing : ' + JSON.stringify(rdata));
            console.log(' id : ' + (rdata[0].id));
            console.log(' name : ' + (rdata[0].name));
            let resultArray = { 'status': 0, 'message': 'Email Already Exists' };
            res.send(resultArray);
        } else {
            let query = `INSERT INTO contact_us (name,email,subject,message) values ( '${name}','${email}','${subject}','${message}')`;
            result = insert_data(query);
            if(result) {
            console.log(JSON.stringify(result));
                    let insertId = result.insertId;

                    const response = new Promise((resolve, reject) => {
                        let html = `<table><tr><td>Name : </td><td>${name}</td></tr> <tr><td>Email : </td><td>${email}</td></tr> <tr><td>Subject : </td><td>${subject}</td></tr> <tr><td>Message : </td><td>${message}</td></tr></table>`;
                        let mailOptions = {
                            from: 'rathorepawan13@gmail.com',
                            to: 'rathorepawan13@gmail.com',
                            subject: 'Sending Email using Node.js',
                            text: 'Contact Us Request From E-shooper!',
                            html: html,
                            // An array of attachments
                            // attachments: [
                            // {
                            // filename: 'text notes.txt',
                            // path: 'notes.txt'
                            // },
                            // ]
                        };

                        transporterMail.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log('sendMail' + error);
                                reject(error);
                            } else {
                                let mailSendId = info.response;
                                console.log('Email sent: ' + mailSendId);
                                resolve(mailSendId);
                            }
                        });
                    })
                    let resultArray = { 'status': 1, 'message': 'Thank you for reaching us we wil contact you soon' };
                    res.json(resultArray);
            } 
        }
    } else {
        let resultArray = { 'status': 0, 'message': 'Please Enter all the details' };
        res.json(resultArray);
    }

})

router.get('/login', (req, res) => {
    console.log(`login router`);
    res.render('login');
})

app.post('/loginpost', (req, res) => {
    console.log(`loginpost`);
    let email = req.query.email;
    let password = req.query.password;
    console.log(email);
    console.log(password);

    let query = `select * from users where email= '${email}' and password= '${password}'`;
    console.log(query);
    connection.query(query, (err, result) => {
        if (err) throw err
        let lengthResult = result.length;
        console.log(`lengthResult ${lengthResult}`);

        if (lengthResult > 0) {
            console.log(`ok`);
            let name = result[0].name;
            let id = result[0].id;
            console.log(name);
            req.session.islogin = 1;
            req.session.clientName = name;
            req.session.clientId = id;
            console.log(JSON.stringify(result));
            //res.redirect('/loginTest');  
            let baseUrl = process.env.BASE_URL;
            let pageUrl = "/login";
            //let cookie = req.cookies; 
            // let cookie= req.cookies.pageRedirect; 
            // console.log('Cookies: ', cookie);             
            // if (cookie !== undefined) {                        
            //     pageUrl = req.cookies.pageRedirect;               
            // } 
            //     console.log('pageUrl: ', pageUrl); 
            //    let redirectUrl = `${baseUrl}${pageUrl}`;
            //     console.log(`redirectUrl ${redirectUrl}`);
            let redirectUrl = '/dashboard';
            resdata = { 'status': 1, 'msg': 'login successful', 'redirectUrl': redirectUrl };
            res.json(resdata);
            res.end();
        } else {
            //res.redirect('/loginTest');   
            resdata = { 'status': 0, 'msg': 'invalid Credential' };
            res.json(resdata);
            res.end();
        }
    })
})

router.get('/Register', (req, res) => {
    console.log(`Register router`);
    res.render('Register');
})

app.post('/registerpost', (req, res) => {
    console.log(`registerpost`);
    let name = req.query.name;
    let mobile = req.query.mobile;
    let email = req.query.email;
    let password = req.query.password;
    let reg_from = 'eshopper';
    console.log(email);
    console.log(password);

    let checkEamilQuery = `select * from users where email='${email}'`;
    console.log(checkEamilQuery);
    connection.query(checkEamilQuery, (err, result) => {
        if (err) throw err
        console.log(JSON.stringify(result));
        let isEmailAlreadyExits = result.length;
        console.log(`isEmailAlreadyExits ${isEmailAlreadyExits}`);

        if (isEmailAlreadyExits) {
            console.log(`ok`);
            resdata = { 'status': 0, 'msg': 'Email Already Exits' };
            res.json(resdata);
        }
        else {
            let query = `INSERT INTO users (name, mobile,email,password,reg_from) values ('${name}', '${mobile}','${email}', '${password}' ,'${reg_from}')`;
            console.log(query);
            connection.query(query, (err, result) => {
                if (err) throw err
                console.log(JSON.stringify(result));
                let userId = result.insertId;
                console.log(`userId ${userId}`);

                if (userId) {
                    console.log(`ok`);
                    resdata = { 'status': 1, 'msg': 'registration successful' };
                    res.json(resdata);
                } else {
                    //res.redirect('/loginTest');    
                    resdata = { 'status': 0, 'msg': 'registration Fail' };
                    res.json(resdata);
                }
            })
        }
    })
})

app.post('/addToCard', async (req, res) => {
    let cardMessage = '';
    let status = 0;
    let productId = req.query.productId;
    if (productId) {
        if (req.session.islogin) {
            let userId = req.session.clientId;
            let ProductIsAvaliableInCard = await checkProductIsAvaliableInCard(productId, userId);
            console.log(ProductIsAvaliableInCard)
            if (!ProductIsAvaliableInCard) {
                let sqlQuery = `insert into cart(product_id,user_id)values('${productId}','${userId}');`;
                connection.query(sqlQuery, (err, result) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        cardMessage = 'Add to card Successfully';
                        status = 1;
                        resdata = { 'status': status, 'msg': cardMessage };
                        res.json(resdata);
                    }
                })
            } else {
                cardMessage = 'Product already Avalliable in card';
                status = 0;
                resdata = { 'status': status, 'msg': cardMessage };
                res.json(resdata);
            }
        } else {
            let pageUrl = req.originalUrl;
            let baseUrl = process.env.BASE_URL;
            console.log(`baseUrl : ${baseUrl}`);
            console.log(`pageUrl : ${pageUrl}`);
            res.cookie('pageRedirect', pageUrl, { maxAge: oneDay, httpOnly: false, sameSite: true });
            cardMessage = 'Please Login To Your Account';
            status = 2;
            resdata = { 'status': status, 'msg': cardMessage };
            res.json(resdata);
        }
    } else {
        cardMessage = 'Invalid Request';
        resdata = { 'status': status, 'msg': cardMessage };
        res.json(resdata);
    }


})

app.post('/getCardTotal', LoginMiddleware, async (req, res) => {
    if (req.session.islogin) {
        console.log('in getCardTotal ');
        let userId = req.session.clientId;
        let sqlQuery = `select * from cart where user_id = '${userId}'`;
        console.log(sqlQuery);
        let cartData = await find_data(sqlQuery);
        let cardTotal = 0;
        let status = 1;
        let cardMessage = 'Suc';
        let shippingCharge = process.env.SHIPPING_CHARGE;
        let grandTotal = 0;

        let itemCounter = 0;
        for (let element in cartData) {
            console.log(element);
            //console.log(cartData[element].product_id);
            let product_id = cartData[element].product_id;
            let quantity = cartData[element].quantity;
            let cardItemId = cartData[element].id;

            if (product_id) {
                let productsResult = await productDetails(product_id);
                //console.log(productsResult);                
                let { id = '', name = '', price = '', product_image = '', discount_price = '' } = productsResult;
                console.log('quantity : ' + quantity);
                console.log('price : ' + price);
                console.log(quantity * price);
                cardTotal += quantity * price;
                console.log((cardTotal));
                itemCounter++;
                //cardItemArray.push(cardItem);
            }
        }

        shippingCharge = (cardTotal>1000) ?  shippingCharge : 0;

        grandTotal = parseInt(cardTotal) + parseInt(shippingCharge);

        console.log(`cardTotal: ${cardTotal}`);
        resdata = { 'status': status, 'msg': cardMessage, 'cardTotal': cardTotal, 'shippingCharge': shippingCharge, 'grandTotal': grandTotal,'itemCount':itemCounter };
        res.json(resdata);
    } else {
        let pageUrl = req.originalUrl;
        let baseUrl = process.env.BASE_URL;
        console.log(`baseUrl : ${baseUrl}`);
        console.log(`pageUrl : ${pageUrl}`);
        res.cookie('pageRedirect', pageUrl, { maxAge: oneDay, httpOnly: false, sameSite: true });
        cardMessage = 'Please Login To Your Account';
        let status = 2;
        //let cardMessage ='fail';
        resdata = { 'status': status, 'msg': cardMessage, 'shippingCharge': shippingCharge, 'grandTotal': grandTotal };
        res.json(resdata);
    }

})

app.post('/updateProductQuantityToCard', async (req, res) => {
    let cardMessage = '';
    let status = 0;
    let productId = req.query.productId;
    let id = req.query.id;
    let Quantity = req.query.Quantity;
    if (productId) {
        if (req.session.islogin) {
            let userId = req.session.clientId;
            let ProductIsAvaliableInCard = await checkProductIsAvaliableInCard(productId, userId);
            console.log(ProductIsAvaliableInCard)
            if (ProductIsAvaliableInCard) {
                let sqlQuery = `update cart set quantity= ${Quantity} where product_id = ${productId} and user_id='${userId}'`;
                connection.query(sqlQuery, (err, result) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        cardMessage = 'Quantity updated';
                        status = 1;
                        resdata = { 'status': status, 'msg': cardMessage };
                        res.json(resdata);
                    }
                })
            } else {
                cardMessage = 'Product not Avalliable in card';
                status = 0;
                resdata = { 'status': status, 'msg': cardMessage };
                res.json(resdata);
            }
        } else {
            let pageUrl = req.originalUrl;
            let baseUrl = process.env.BASE_URL;
            console.log(`baseUrl : ${baseUrl}`);
            console.log(`pageUrl : ${pageUrl}`);
            res.cookie('pageRedirect', pageUrl, { maxAge: oneDay, httpOnly: false, sameSite: true });
            cardMessage = 'Please Login To Your Account';
            status = 2;
            resdata = { 'status': status, 'msg': cardMessage };
            res.json(resdata);
        }
    } else {
        cardMessage = 'Invalid Request';
        resdata = { 'status': status, 'msg': cardMessage };
        res.json(resdata);
    }


})

app.post('/removeItemFromCard', async (req, res) => {
    let cardMessage = '';
    let status = 0;
    let productId = req.query.productId;
    if (productId) {
        if (req.session.islogin) {
            let userId = req.session.clientId;
            let ProductIsAvaliableInCard = await checkProductIsAvaliableInCard(productId, userId);
            console.log(ProductIsAvaliableInCard)
            if (ProductIsAvaliableInCard) {
                let sqlQuery = `delete from cart where product_id= ${productId} and user_id=${userId}`;
                connection.query(sqlQuery, (err, result) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        cardMessage = 'Remove item from card';
                        status = 1;
                        resdata = { 'status': status, 'msg': cardMessage };
                        res.json(resdata);
                    }
                })
            } else {
                cardMessage = 'Product Not Avalliable in card';
                status = 0;
                resdata = { 'status': status, 'msg': cardMessage };
                res.json(resdata);
            }
        } else {
            let pageUrl = req.originalUrl;
            let baseUrl = process.env.BASE_URL;
            console.log(`baseUrl : ${baseUrl}`);
            console.log(`pageUrl : ${pageUrl}`);
            res.cookie('pageRedirect', pageUrl, { maxAge: oneDay, httpOnly: false, sameSite: true });
            cardMessage = 'Please Login To Your Account';
            status = 2;
            resdata = { 'status': status, 'msg': cardMessage };
            res.json(resdata);
        }
    } else {
        cardMessage = 'Invalid Request';
        resdata = { 'status': status, 'msg': cardMessage };
        res.json(resdata);
    }


})

app.get('/dashboard', LoginMiddleware, async (req, res) => {
    console.log(`dashboard`);
    let cookie = req.cookies.pageRedirect;
    if (cookie !== undefined) {
        let userId = req.session.clientId;
        var cookieArray = cookie.split("/addToCard?productId=");
        let productId = cookieArray[1];
        let ProductIsAvaliableInCard = await checkProductIsAvaliableInCard(productId, userId);
        console.log(ProductIsAvaliableInCard)
        if (!ProductIsAvaliableInCard) {
            let sqlQuery = `insert into cart(product_id,user_id)values('${productId}','${userId}');`;
            console.log('sqlQuery : ' + sqlQuery);
            connection.query(sqlQuery, (err, result) => {
                if (err) {
                    console.log(err.message);
                }
            })
        }
        res.clearCookie("pageRedirect");
    }
    res.render('dashboard');
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    console.log(`logout`);
    res.redirect('/login#loginTab');
});

app.post('/searchProduct', async(req,res)=>{
    console.log(req.query.search);
    let { search='' } =  req.query;
    if(search){
        let query = `select * from products where name like '%${search}%'`; 
        let Data =  await find_data(query);
        console.log(  JSON.stringify(Data) );
        
        let searchProduct = [];
        for(let item in Data) {        
            let {id='',name=''} = Data[item];
            let obj = {'prodcutId':id,'prodcutName':name};
            searchProduct.push(obj);
        }
        res.json(searchProduct);
    }
})

app.get('/razorpay',async(req, res)=>{
    var instance = new Razorpay({
        key_id: 'rzp_test_uR05WckzzLFDuY',
        key_secret: 'TPiI3JCVUnoc2jaiCEXMshpY',
      });

      var options = {
        amount: 200,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "test_1"
      };

      instance.orders.create(options, function(err, order) {
        console.log(order);

//         {
//   id: 'order_LufAaCO9TO7E85',
//   entity: 'order',
//   amount: 500,
//   amount_paid: 0,
//   amount_due: 500,
//   currency: 'INR',
//   receipt: 'test_1',
//   offer_id: null,
//   status: 'created',
//   attempts: 0,
//   notes: [],
//   created_at: 1685185250
// }
        if(err){
            console.log(err)
        }
      }); 
})

app.post('/razorpay/create/orderId',async(req, res)=>{
    var instance = new Razorpay({
        key_id: 'rzp_test_uR05WckzzLFDuY',
        key_secret: 'TPiI3JCVUnoc2jaiCEXMshpY',
      });

      
     console.log( "amount::"+ JSON.stringify(req.body) );
     let {amount=0} = req.body;
     console.log( "amount : "+ amount); 

     amount =  amount*100;

      var options = {
        amount: amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "test_1"
      };

      instance.orders.create(options, function(err, order) {
        console.log(order);
        res.send({'orderId':order.id,'amount':amount});
        if(err){
            console.log(err)
        }
      }); 
})

app.post('/paymentStatus',async(req,res)=>{
     res.render('paymentStatus');
     //res.render('dashboard');
})

app.get('/paymentStatus',async(req,res)=>{
    res.render('paymentStatus');
})


app.get('/webhook',async(req,res)=>{
        console.log('webhook');
        let RAZORPAY_WEBHOOK_SECRET = 123456;
        const requestedBody = JSON.stringify(req.body)        
        const receivedSignature = req.headers['x-razorpay-signature'];
        console.log('receivedSignature'+receivedSignature);
        const expectedSignature = crypto.createHmac('sha256', RAZORPAY_WEBHOOK_SECRET).update(requestedBody).digest('hex')
        if (receivedSignature === expectedSignature) { 
            console('success in webhook');
        // Store in your DB
        } else {
        res.status(501).send('received but unverified resp')
        }
    //res.send('webhook');
})



// app.get('/admin',(req,res)=>{
//     res.render('adminLogin');
// })

// app.post('/adminloginpost', (req, res) => {
//     console.log(`adminloginpost`);
//     let email = req.query.email;
//     let password = req.query.password;
//     console.log(email);
//     console.log(password);

//     let query = `select * from admin where email= '${email}' and password= '${password}'`;
//     console.log(query);
//     connection.query(query, (err, result) => {
//         if (err) throw err
//         let lengthResult = result.length;
//         console.log(`lengthResult ${lengthResult}`);

//         if (lengthResult > 0) {
//             console.log(`ok`);
//             let name = result[0].name;
//             let id = result[0].id;
//             console.log('admin name : '+name);
//             req.session.isadminlogin = 1;
//             req.session.adminName = name;
//             req.session.adminId = id;
//             console.log(JSON.stringify(result));
//             //res.redirect('/loginTest');   
//             resdata = { 'status': 1, 'msg': 'login successful' };
//             res.json(resdata);
//         } else {
//             //res.redirect('/loginTest');   
//             resdata = { 'status': 0, 'msg': 'invalid Credential' };
//             res.json(resdata);
//         }
//     })
// }) 

// adminRouter.get('/admin_dashboard',(req,res)=>{
//     res.render('admin_dashboard');
// })

// adminRouter.post('/admin_dashboard',(req,res)=>{
//     res.render('admin_dashboard'); 
// })

// adminRouter.get('/add_product',(req, res)=>{
//     res.render('add_product');
// })  

app.use(adminRouterwithLogin);
app.use(adminRouter);
app.use(router);

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
); 
