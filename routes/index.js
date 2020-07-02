var express = require("express");
var studenModule = require("../modules/student");
var router = express.Router();
var student = studenModule.find({});
var multer = require("multer");

var path = require("path");

router.use(express.static(__dirname + "./public/"));
var Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

var upload = multer({ storage: Storage }).single("profile");

/* GET home page. */
router.get("/", function (req, res, next) {
  student.exec(function (err, data) {
    if (err) throw err;
    res.render("index", {
      title: "Student  Registration form",
      record: data,
      alert: "data inserted successfully",
    });
  });
});
router.get("/view/:id", function (req, res, next) {
  var selectedStu = studenModule.find({ _id: req.params.id });
  console.log(selectedStu + req.params.id + "ddddddddddddddddddddd");
  selectedStu.exec(function (err, data) {
    if (err) throw err;
    res.render("view", {
      title: "Student  Registration form",
      record: data,
      alert: "data inserted successfully",
    });
  });
});

router.get("/view/", function (req, res, next) {
  res.render("view", {
    title: "Student  Registration form",
  });
});

router.post("/", upload, function (req, res) {
  var StudentD = new studenModule({
    fname: req.body.fname,
    lname: req.body.lname,
    address: req.body.address,
    class: req.body.class,
    marks: req.body.marks,
    profile: req.file.filename,
  });
  StudentD.save(function (err, res1) {
    if (err) throw err;
    student.exec(function (err, data) {
      if (err) throw err;
      res.render("index", {
        title: "Student  Registration form",
        record: data,
        alert: "data inserted successfully",
      });
    });
  });
});
router.get("/edit/:id", function (req, res, next) {
  var toedit = studenModule.findById(req.params.id);
  toedit.exec(function (err, data) {
    if (err) throw err;
    res.render("update", {
      title: "Update student details",
      record: data,
    });
  });
  router.post("/edit/:id", upload, function (req, res) {
    console.log(req.params.id + "dddddddddddddddddddddddddddddd");
    var update = studenModule.findByIdAndUpdate(req.params.id, {
      fname: req.body.fname,
      lname: req.body.lname,
      address: req.body.address,
      class: req.body.class,
      marks: req.body.marks,
      profile: req.file.filename,
    });

    update.exec(function (err, res1) {
      if (err) throw err;
      student.exec(function (err, data) {
        if (err) throw err;
        res.render("index", {
          title: "Student  Registration form",
          record: data,
          alert: "data inserted successfully",
        });
      });
    });
  });
});
router.get("/delete/:id", function (req, res) {
  var deleteRecord = studenModule.findByIdAndDelete(req.params.id);
  deleteRecord.exec(function (err, data) {
    if (err) throw err;
    student.exec(function (err, data) {
      if (err) throw err;
      res.render("index", {
        title: "Student  Registration form",
        record: data,
        alert: "data inserted successfully",
      });
    });
  });
});
module.exports = router;
