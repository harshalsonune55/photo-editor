

const express=require("express");
let app=express();
const port=8080;
const mongoose=require("mongoose");
const path=require("path");
const List=require("./database/data.js");
const { urlencoded } = require("body-parser");
const multer  = require('multer');
const flash=require("connect-flash");
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/users.js");
const session=require("express-session");
const {isloggedin}=require("./middlewere/login_auth.js");
const {storage}=require("./middlewere/cloud.js");
const upload = multer({ storage });




app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(urlencoded({extended:true}));
app.use(flash());





const sessionOption={
  secret:"My super Sceret code",
  resave:false,
  saveUninitialized:true,
  cookie:{
      expires:Date.now() + 7*24*60*60*1000,
      maxAge:7*24*60*60*1000,
      httpOnly:true

  }

}

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});



app.post("/profile", upload.single("picture"),  async(req, res) => {
let Li= new List({name:req.file.originalname,adr:req.file.path,show:"yes"});
Li.owner=req.user._id;
await Li.save()
.then((result)=>{
  console.log(result);
})
.catch((err)=>{
  console.log(err);
})
let ido=await List.findOne({name:req.file.originalname});
console.log(ido._id);
res.redirect(`/editing/${ido._id}`);
});




app.get("/editing/:id",async(req,res)=>{
let {id}=req.params;
let lis= await List.findById(id).populate("owner");
res.render("editing.ejs",{lis});
});

app.get("/home",isloggedin,async(req,res)=>{
let idp=req.user._id;
let list=await List.find({owner:idp});
console.log(list);
res.render("home.ejs",{list});
});

app.get("/signup",(req,res)=>{
res.render("signup.ejs");
});

app.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash("success","LogOut successfully!");
    res.redirect('/login');
  });
});



app.post("/signup",async(req,res)=>{
let{username,email,password,re_enter_pass}=req.body;
try{
  if(password==re_enter_pass){
    let newUser=new User({
      email:email,
      username:username,
  })
  req.session.name=username;
  let regestiredUser= await User.register(newUser,password);
  
  req.flash("success","sign-up successfully");
  return res.redirect("/home");
  
  }else{
    req.flash("error", "Re-entered password did not match!");
    return res.redirect("/signup");
  }
}catch(e){
  console.log(e)
  req.flash("error","user already exist!");
  return res.redirect("/signup")
}


});



app.get("/login",(req,res)=>{
res.render("login.ejs");
});
app.post("/login",passport.authenticate('local', { failureRedirect: '/login' ,failureFlash:true}),async(req,res)=>{
req.flash("success","Welcome to editor!");
res.redirect("/home");
});


app.listen(port,()=>{
    console.log(`listening on ${port} port successully`);
    });