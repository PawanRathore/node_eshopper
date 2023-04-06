const express = require('express');  
const app = express();
const mysql = require('mysql') 

const {connection} = require('./db/db_connetion');
const router = express.router;
const PORT = 3001;
//app.use(router);
//app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

// Set EJS as templating engine 
app.set('view engine', 'ejs');   


app.get('/',(req, res)=>{
    console.log(`root router`); 

    connection.query('SELECT * from products', (err, result) => {
        if (err) throw err      
        console.log('Products Id is : ', result[0].id)

        let products = [];
        result.forEach(element => {
            console.log(element.id);
            let {id='',name='',price='',discount_price='',description='',color='',size='',category=''} = element;
            let obj = {'id':id,'name':name,'price':price,'discount_price':discount_price,'description':description,'color':color,'size':size,'category':category}
            products.push(obj);
        });
        console.log(JSON.stringify(products));
        res.render('index',{'products':products});
      })

    
})

app.get('/',(req, res)=>{
    console.log(`root router`);  
    res.render('index');
})

app.get('/shop',(req, res)=>{
    console.log(`shop router`); 
    res.render('shop');
})

app.get('/detail',(req, res)=>{
    console.log(`detail router`); 
    res.render('detail');
})

app.get('/cart',(req, res)=>{
    console.log(`cart router`); 
    res.render('cart');
})

app.get('/checkout',(req, res)=>{
    console.log(`checkout router`); 
    res.render('checkout');
})

app.get('/contact',(req, res)=>{
    console.log(`contact router`); 
    res.render('contact');
})

app.get('/login',(req, res)=>{
    console.log(`login router`); 
    res.render('login');
})

app.get('/Register',(req, res)=>{
    console.log(`Register router`); 
    res.render('Register');
})


  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
); 
