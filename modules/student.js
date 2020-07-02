const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Kridzzy:Kridzzy8061@cluster0.ho8gy.mongodb.net/studentDataBase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;
var studentSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  class: String,
  marks: Number,
  address: String,
  profile: String,
});
var studentModel = mongoose.model("studentDetails", studentSchema);
module.exports = studentModel;
