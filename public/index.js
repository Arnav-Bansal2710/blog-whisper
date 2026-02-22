import express from "express";
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.get("/writers",(req,res)=>{
    res.render("writers.ejs");
})

let posts = [];

app.post("/submit", (req, res) => {
  posts.push({
    title: req.body.title,
    cat: req.body.category,
    con: req.body.content,
    date: new Date(),
  });

  res.redirect("/feed");
});

app.get("/feed", (req, res) => {
    res.render("feed", { posts });
});

app.get("/about",(req,res)=>{
    res.render("about.ejs");
})

app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
})

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  console.log("Contact form received:");
  console.log(name, email, message);

  res.send("Thank you for contacting us!");
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})