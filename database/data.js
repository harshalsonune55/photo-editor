const mongoose=require("mongoose");
const Schema= mongoose.Schema;


main()
.then((res)=>{
    console.log("successfully connected to database");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/picture_saturation');
}

const PathSchema= new mongoose.Schema({
  adr:String,
  name:String,
  show:String,
  owner:{
    type: Schema.Types.ObjectId,
    ref:"User"
  }
});


const Path=mongoose.model("Path", PathSchema);

module.exports=Path;

