const isadminlogin = ((req, res,next)=>{
console.log(req.session.islogin);

if(req.session.isadminlogin) {
    console.log(`isadminloingMiddlewarelogin`);   
    res.locals.adminName =  req.session.adminName;
    res.locals.adminId = req.session.adminId;            
} else {
    console.log(`isadminloingMiddlewarelogout`);
    return  res.redirect('/admin');     
}
next();
});

module.exports = {isadminlogin};    