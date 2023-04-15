const multer = require("multer");
const DIR = './uploads/';

// configure multer for your server folder
var storage = multer.diskStorage({
    destination: (req, file, cb) =>{

        //ensure that this folder already exists in your project directory
        cb(null, DIR);
    },
    filename: (req, file, cb)=>{
        //const fileName = file.originalname;
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, file.originalname)
    }
});

//Filter the image type
const imageFileFilter = (req, file, cb) =>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)＄/)) { //If the file uploaded is not any of this file type

    // If error in file type, then attacch this error to the request header
        req.fileValidationError = "You can upload only image files";
        return cb(null,false, req.fileValidationError);
    }
    cb(null, true)
};

//Here we configure what our storage and filefilter will be, which is the storage and imageFileFilter we created above
exports.uploadMulter = multer({storage: storage, fileFilter: imageFileFilter}) 