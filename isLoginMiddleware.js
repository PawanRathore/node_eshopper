const islogin = ((req, res,next)=>{
    console.log(req.session.islogin);
if(req.session.islogin) {
    console.log(`isloingMiddlewarelogin`);   
    res.locals.clientName =  req.session.clientName;
    res.locals.clientId = req.session.id;            
} else {
    console.log(`isloingMiddlewarelogout`);
}
next();
});

module.exports = {islogin};