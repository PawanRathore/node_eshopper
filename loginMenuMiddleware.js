const loginMenu = ((req, res,next)=>{
    console.log(req.session.islogin);
if(req.session.islogin) {
    console.log(`loginMenuMiddlware`);   
    res.locals.clientName =  req.session.clientName;
    res.locals.clientId = req.session.id;            
} 
next();
});

module.exports = {loginMenu};