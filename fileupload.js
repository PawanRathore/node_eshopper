const express = require('express');
const { connection } = require('./db/db_connetion');
const multer = require('multer');
//const fileUpload = express.Router();

const DIR = './uploads/';
//var maxSize = 1 * 1000 * 1000;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
}); 

var fileUpload = multer({
    storage: storage,
    //limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {

        // const fileSize = parseInt(req.headers['content-length']);
        //   if (fileSize > maxSize) {
        //     return cb(new Error('file Should be 1 MB'));
        //   }

         let filetype = file.mimetype;
        console.log(`file mimtype in file upload ${filetype}`);

        if (filetype == "image/png" || filetype == "image/jpg" || filetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).single('myFile'); 

// fileUpload.post('/add_product_post', function (req, res) {
//     upload(req, res, function (err) {
//         //console.log(' req : '+  JSON.stringify(req) );
//         console.log(' req.file : ' + req.file);
//         if (err) {
//             console.log(err.message);
//             //return res.end(err.message);
//         }
//         if (req.file) {
//             console.log('file upload');
//             console.log(req.isfileUploadError);
//             //console.log(isfileUploadError);                 
//             if (err) {
//                 console.log(err.message);
//                 //return res.end(err.message);
//             } else {
//                 console.log("File uploaded successfully!");
//                 console.log("File response", req.file);

//             }
//         } else {
//             console.log('file not upload');
//         }

//         console.log("Product Name - : ", req.body.name);

//         //  // FILE SIZE ERROR
//         //  if (err instanceof multer.MulterError) {
//         //     console.log("Max file size 2MB allowed!");
//         //     //return res.end("Max file size 2MB allowed!");
//         // }
//         //  // INVALID FILE TYPE, message will return from fileFilter callback
//         //  else if (err) {
//         //     console.log(err.message);
//         //     //return res.end(err.message);
//         // }

//         // // FILE NOT SELECTED
//         // else if (!req.file) {
//         //     return res.end("File is required!");
//         // } 
//         // // SUCCESS
//         // else {
//         //     console.log("File uploaded successfully!");
//         //     console.log("File response", req.file);
//         // }
//     })
// })

// file upload code refrence sites
// https://www.positronx.io/multer-file-type-validation-tutorial-with-example/
// https://stackoverflow.com/questions/35050071/cant-get-multer-filefilter-error-handling-to-work


module.exports = {fileUpload};


