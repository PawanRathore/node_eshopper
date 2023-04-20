const adminBreadcum = ((req, res,next)=>{
console.log(`originalUrl : ${req.originalUrl}`);
let admin_breadcum = ''; 

switch(req.originalUrl) {
    case '/admin_dashboard':
    res.locals.admin_breadcum = 'Admin Dashboard';      
    console.log('Admin Dashboard');
    break;    
    case '/add_product':
    res.locals.admin_breadcum = 'Add Product';     
    console.log('Add Product');
    break; 
    case '/add_product':
    res.locals.admin_breadcum = 'Add Product';     
    console.log('Add Product');
    break; 
    case '/Product List':
    res.locals.admin_breadcum = 'Product List';        
    break; 
}

next();
}); 

module.exports = {adminBreadcum};    