const { query, json } = require('express');
const express = require('express');
const app = express();
const mysql = require('mysql')
var session = require('express-session');
const nodemailer = require('nodemailer');

var { islogin } = require('./isLoginMiddleware');
var { isadminlogin } = require('./isadminLoginMiddleware');

const { connection } = require('./db/db_connetion');
const { checkemailExits } = require('./commonfunction');
const { transporterMail } = require('./mailConfig');
const bodyParser = require("body-parser");


const router = express.Router() 
const {adminRouter,adminRouterwithLogin} = require('./adminRouter');

const PORT = 3001;

//app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

// Set EJS as templating engine 
app.set('view engine', 'ejs');

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: 'AXDC@159',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay }
}))

// Configurations for "body-parser"
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  ); 


router.use(islogin);   

app.get('/', (req, res) => {
    console.log(`root router`);

    connection.query('SELECT * from products where staus=1', (err, result) => {
        if (err) throw err
        console.log('Products Id is : ', result[0].id)

        let products = [];
        result.forEach(element => {
            console.log(element.id);
            let { id = '', name = '', price = '', discount_price = '', description = '', color = '', size = '', category = '',product_image='' } = element;
            let obj = { 'id': id, 'name': name, 'price': price, 'discount_price': discount_price, 'description': description, 'color': color, 'size': size, 'category': category,'productImage':product_image}
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

router.get('/detail', (req, res) => {
    console.log(`detail router`);
    res.render('detail');
})

router.get('/cart', (req, res) => {
    console.log(`cart router`);
    res.render('cart');
}) 

router.get('/checkout', (req, res) => {
    console.log(`checkout router`);
    res.render('checkout');
})

router.get('/contact', (req, res) => {
    console.log(`contact router`);
    res.render('contact');
})

router.post('/contactPost', async (req, res) => {
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
            await connection.query(query, (err, result) => {
                if (err) { throw err }
                else {
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
            })



        }
    } else {
        let resultArray = { 'status': 0, 'message': 'Please Enter all the details' };
        res.json(resultArray);
    }

})

app.get('/login', (req, res) => {
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
            resdata = { 'status': 1, 'msg': 'login successful' };
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

router.get('/dashboard', (req, res) => {
    console.log(`dashboard`);
    res.render('dashboard');
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    console.log(`logout`);
    res.redirect('/');
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
