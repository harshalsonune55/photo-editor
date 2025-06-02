const mongoose=require("mongoose");
const Schema= mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");


main()
.then((res)=>{
    console.log("successfully connected to database");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/picture_saturation');
}

const userSchema=new Schema({
 email:{
    type:String,
    required:true
 }
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);