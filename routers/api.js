const router = require("express").Router();
// const login=require("../models/login")
const signup = require("../Models/signup");
const adminpanel = require("../models/adminpanel");
const nodemailer = require("nodemailer");

function handlelogin(req, res, next) {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/");
  }
}
router.get("/", (req, res) => {
  res.render("loginform");
});

router.get("/username", (req, res) => {
  res.render("username");
});
router.post("/loginforminsert",  async(req, res) => {
   const { us, pass } = req.body;

 //console.log(req.body)
// })
  const record = await signup.findOne({ username: us });
   console.log(record)
  if (record !== null && record.status == "active") {
    if (record.password == pass) {
     
      req.session.isAuth= true;
    
    
console.log(req.session,'s')
      res.redirect("/project");
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
 });
router.get("/signup", (req, res) => {
  // const record= await login.find()

  res.render("signup.ejs");
});
router.post("/signup", (req, res) => {
  const { us, pass, fname, lname, e, mn, gender } = req.body;
  const record = new signup({
    username: us,
    password: pass,
    Firstname: fname,
    Lastname: lname,
    Email: e,
    Mobilenumber: mn,
    Gender: gender,
  });

  record.save();
  res.redirect("/");
});
router.get("/project", handlelogin, async (req, res) => {
  const record = await signup.find();

  res.render("project.ejs", { record });
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
router.get("/adminrecord", (req, res) => {
  res.render("admin/adminpanel.ejs");
});
router.get("/forgotpassword", (req, res) => {
  res.render("forgotform.ejs");
});
router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "rockstaramit675@gmail.com ", // generated ethereal user
      pass: "nfdomfaklrwyqovp", // generated ethereal password
    },
  });
  console.log("connect to smtp server");

  let info = await transporter.sendMail({
    from: "rockstaramit675@gmail.com", // sender address
    to: email, // list of receivers
    subject: "password Change Link", // Subject line
    html: `<a href=http://localhost:5000/changepassword/${email}>click to verify,</a>`, //html body
  });
  res.status(200).send('ok')
});

router.get("/changepassword/:email", (req, res) => {
  const email = req.params.email;
  console.log(email)
  res.render("forgotlink.ejs", { email });
});
router.post("/forgotpasswordnew/:email", async (req, res) => {
  const email = req.params.email;
  console.log(email,'email')
  const record = await signup.findOne({Email: email})
  const id = record.id;
  console.log(id)
  const { npass } = req.body;
  await signup.findByIdAndUpdate(record.id, { password: npass });
  res.status(200).send('your password has been changes')
  // res.redirect('/',{mess:'your password has been changed plz do refresh'})
});

module.exports = router;
