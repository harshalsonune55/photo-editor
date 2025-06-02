module.exports.isloggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","signup/login to use the editor !");
        return res.redirect("/login");
      }
      next();
}