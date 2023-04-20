const express = require('express');
var { isadminlogin } = require('./isadminLoginMiddleware');
var { adminBreadcum } = require('./admin_breacumMiddleware');

const { connection } = require('./db/db_connetion');
const { checkemailExits,getProducts } = require('./commonfunction');
const { transporterMail } = require('./mailConfig');
const multer = require('multer');
const { fileUpload, fileUploadfuction } = require('./fileUpload');
const { uploadMulter } = require("./fileuploadMulter");
const { query } = require('express');
const { json } = require('body-parser');

const adminRouter = express.Router()
const adminRouterwithLogin = express.Router() 
const adminMiddlware = [isadminlogin,adminBreadcum]



adminRouterwithLogin.get('/admin', (req, res) => {
    console.log('admin');
    res.render('adminLogin');
})

adminRouterwithLogin.post('/adminloginpost', (req, res) => {
    console.log(`adminloginpost`);
    let email = req.query.email;
    let password = req.query.password;
    console.log(email);
    console.log(password);

    let query = `select * from admin where email= '${email}' and password= '${password}'`;
    console.log(query);
    connection.query(query, (err, result) => {
        if (err) throw err
        let lengthResult = result.length;
        console.log(`lengthResult ${lengthResult}`);

        if (lengthResult > 0) {
            console.log(`ok`);
            let name = result[0].name;
            let id = result[0].id;
            console.log('admin name : ' + name);
            req.session.isadminlogin = 1;
            req.session.adminName = name;
            req.session.adminId = id;
            console.log(JSON.stringify(result));
            //res.redirect('/loginTest');   
            resdata = { 'status': 1, 'msg': 'login successful' };
            res.json(resdata);
        } else {
            //res.redirect('/loginTest');   
            resdata = { 'status': 0, 'msg': 'invalid Credential' };
            res.json(resdata);
        }
    })
})

adminRouter.get('/admin_dashboard', adminMiddlware , async(req, res) => {
    let products = await getProducts();    
    console.log(JSON.stringify(products));    
    res.render('admin_dashboard',{ 'products': products });
})

adminRouter.get('/add_product',adminMiddlware, (req, res) => {
    console.log('add_product');
    res.render('add_product');
})

// const DIR = './uploads/';
// //var maxSize = 1 * 1000 * 1000;

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, fileName)
//     }
// }); 

// var upload = multer({
//     storage: storage,
//     //limits: { fileSize: maxSize },
//     fileFilter: (req, file, cb) => {

//         // const fileSize = parseInt(req.headers['content-length']);
//         //   if (fileSize > maxSize) {
//         //     return cb(new Error('file Should be 1 MB'));
//         //   }



//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// }).single('myFile');

adminRouter.post('/add_product_post',adminMiddlware, function (req, res) {

    // fileUpload(req, res, function (err) {
    //     if (err) {
    //         console.log(err.message);
    //         //return res.end(err.message);
    //     }
    //     if (req.file) {
    //         console.log('file upload');
    //         console.log(req.isfileUploadError);
    //         //console.log(isfileUploadError);                 
    //         if (err) {
    //             console.log(err.message);
    //             //return res.end(err.message);
    //         } else {
    //             console.log("File uploaded successfully!");
    //             console.log("File response", req.file);

    //         }
    //     } else {
    //         console.log('file not upload');
    //     }

    //     console.log("Product Name - : ", req.body.name);

    //     //  // FILE SIZE ERROR
    //     //  if (err instanceof multer.MulterError) {
    //     //     console.log("Max file size 2MB allowed!");
    //     //     //return res.end("Max file size 2MB allowed!");
    //     // }
    //     //  // INVALID FILE TYPE, message will return from fileFilter callback
    //     //  else if (err) {
    //     //     console.log(err.message);
    //     //     //return res.end(err.message);
    //     // }

    //     // // FILE NOT SELECTED
    //     // else if (!req.file) {
    //     //     return res.end("File is required!");
    //     // } 
    //     // // SUCCESS
    //     // else {
    //     //     console.log("File uploaded successfully!");
    //     //     console.log("File response", req.file);
    //     // }
    // });

    fileUpload(req, res, function (err) {
        if (err) {
            console.log(err.message);
            //return res.end(err.message);
        }
        if (req.file) {
            console.log('file upload');
            console.log(req.isfileUploadError);
            //console.log(isfileUploadError);                 
            if (err) {
                console.log(err.message);
                //return res.end(err.message);
            } else {
                console.log("File uploaded successfully!");
                //console.log("File response", req.file);
            }
        } else {
            console.log('file not upload');
        }

        let uploadFileName = "";
        if(req.file){
            uploadFileName = req.file.filename;
            console.log("File Name - : ", uploadFileName);        
        }

        console.log("Product Name - : ", req.body.name); 
        let {name='',price='',discount_price='',description='',color='',size='',category=''} = req.body;
        let query = `insert into products (name,price,discount_price,description,color,size,category,product_image) values ('${name}','${price}','${discount_price}','${description}','${color}','${size}','${category}','${uploadFileName}')`;
        connection.query(query,  (err, result) =>{

            if (err) { 
               // throw err 
                let resultArray = { 'status': 0, 'message': err.message };
                res.json(resultArray);
            }
            else {
                console.log(JSON.stringify(result));
                let insertId = result.insertId;
                let resultArray = { 'status': 1, 'message': 'Prodcut Save Successfully' };
                res.json(resultArray);
            }
            
        });
    });
})

adminRouter.get('productList', adminMiddlware, async(req,res)=>{
    let products = await getProducts();    
    console.log(JSON.stringify(products));    
    res.render('admin_dashboard',{ 'products': products }); 
});

//adminRouter.use(isadminlogin);

// file upload code refrence sites
// https://www.positronx.io/multer-file-type-validation-tutorial-with-example/
// https://stackoverflow.com/questions/35050071/cant-get-multer-filefilter-error-handling-to-work


module.exports = { adminRouter, adminRouterwithLogin };


