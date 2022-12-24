import mongoose from "mongoose";

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://rajeevc:rajeev321@cluster0.w68gpom.mongodb.net/Webscraper" )
.then(()=>{
    console.log("Database is connected");
}).catch(()=>{
    console.log("Database is not connected");
})


const Schema = mongoose.Schema;
const WebscraperDataSchema = new Schema({
  url: String,
  wordCount: String,
//   favourite: String,
  weblinks: [],
  medialinks: String,
//   actions: String,
});

export default mongoose.model("webscrapedData",  WebscraperDataSchema);

