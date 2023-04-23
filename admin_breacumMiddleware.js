const adminBreadcum = ((req, res,next)=>{
console.log(`originalUrl : ${req.originalUrl}`);
let admin_breadcum = ''; 

switch(req.originalUrl) {
    case '/admin_dashboard':
    admin_breadcum =   'Admin Dashboard';
    //res.locals.admin_breadcum = 'Admin Dashboard';      
    console.log('Admin Dashboard');
    break;    
    case '/add_product':
    admin_breadcum =   'Add Product';    
    //res.locals.admin_breadcum = 'Add Product';     
    console.log('Add Product');
    break; 
    case '/add_product':
    admin_breadcum =   'Add Product';  
    //res.locals.admin_breadcum = 'Add Product';     
    console.log('Add Product');
    break; 
    case '/Product List':
    admin_breadcum =   'Product List';  
    //res.locals.admin_breadcum = 'Product List';        
    break; 
    case '/add_category':
    admin_breadcum =   'Add Category';  
    //res.locals.admin_breadcum = 'Product List';        
    break; 
    default:
        //res.locals.admin_breadcum = '';
        admin_breadcum =   '';  
}
res.locals.admin_breadcum = admin_breadcum;

next();
}); 

module.exports = {adminBreadcum};    