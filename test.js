const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
const mysql = require('mysql')
const multer = require('multer')
const { insert_data } = require('./Sqlfunctions');
const reader = require('xlsx');

testRouter = express.Router();

testRouter.get('/read_excel', async (req, res) => {
    // https://www.tutsmake.com/node-js-import-upload-excel-to-mysql-database/

    //let filePath = (__basedir + '/uploads/' + req.file.filename);
    let filePath = 'uploads/test_excel.xlsx';
    console.log(filePath);
    readXlsxFile(filePath).then((rows) => {
        // `rows` is an array of rows 
        // each row being an array of cells.
        console.log(`length of row ${rows.length}`)

        //  console.log(rows);
        // for(let i in rows){
        //     console.log(`length of row ${rows[i].length}`) 
        //     console.log(rows[i]);
        //     for(let item of rows[i]){
        //         console.log(item);
        //     }
        // }

        // var rowObjs = rows.map(x => ({
        //     id: x[0],
        //     name: x[1],
        //     mobile: x[2], 
        //     email: x[3],
        //     address: x[4],
        //     pincode: x[5]
        // }));

        //    let fr =  rows[0];
        //     var labels = rows[0].map((key) => {
        //         return key
        //     });
        //     console.log(`labels : ${labels}`);

        rows.splice(0, 1); // 1nd parameter means remove one item only

        let values = (x) => {
            //let idFromHeaderKey  = rows[0][0];
            //console.log (`idFromHeaderKey ${idFromHeaderKey}`)
            return {
                id: x[0],
                name: x[1],
                mobile: x[2],
                email: x[3],
                address: x[4],
                pincode: x[5]
            }
        };

        var rowObjs = rows.map(values);

        for (let i in rowObjs) {
            let { name, id, mobile, email, address, pincode } = rowObjs[i];
            console.log(`${id},${name},${mobile},${email},${address},${pincode}`);
            // proecess data as you want
            let sqlQuery = `insert into test(name,mobile,email,address,pincode) values ('${name}','${email}','${mobile}','${address}','${pincode}')`;
            //let cartData = insert_data(sqlQuery);       
        }
    })
})


testRouter.get('/read_xls', async (req, res) => {
    // https://www.geeksforgeeks.org/how-to-read-and-write-excel-file-in-node-js/
    const file = reader.readFile('uploads/test_excel.xlsx')

    let data = []
    const sheets = file.SheetNames
    for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
        temp.forEach((res) => {
            data.push(res)
        })
    }

    // Printing data
    console.log(data)
})

testRouter.get('/downloadXls',async()=>{
    // Sample data set
let student_data = [{
    Student:'Nikhil',
    Age:22,
    Branch:'ISE',
    Marks: 70
},
{
    Student:'Amitha',
    Age:21,
    Branch:'EC',
    Marks:80
}]
  
let file = reader.utils.book_new();
const ws = reader.utils.json_to_sheet(student_data)
  
reader.utils.book_append_sheet(file,ws,"Sheet1")
  
// Writing to our file
reader.writeFile(file,'uploads/export_test_excel.xlsx')
})

module.exports = { testRouter };


