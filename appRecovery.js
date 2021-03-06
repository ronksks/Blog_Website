//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
//heroku login
mongoose.connect("mongodb+srv://admin-ronksks:Test123@cluster0.80wja.mongodb.net/blog_websiteDB");
// mongoose.connect("mongodb+srv://admin-ronksks:Test123@cluster0.80wja.mongodb.net/?retryWrites=true&w=majority");
//local login
// mongoose.connect("mongodb://localhost:27017/blog_websiteDB");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, " post title can not be empty"],
  },
  content: {
    type: String,
    required: [true, " post must have contant"],
  },
  //
  versionKey: false
});

const Post = mongoose.model("Post", postSchema);

const firstPost = new Post({
  title: "First post",
  content: "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat o"
});





app.get("/", function(req, res){
  Post.find({}, function(err,posts){

      res.render(__dirname + "/views/home.ejs", {
          firstParagraph: homeStartingContent,
//        newPosts foreatch loop inside home.ejs
          posts:posts
      });// end render



  });// end find
});//end app.get

app.get("/about", function(req, res) {
  res.render(__dirname + "/views/about.ejs", {
    secondParagraph: contactContent
  });
});

app.get("/contact", function(req, res) {
  res.render(__dirname + "/views/contact.ejs", {
    thirdParagraph: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render(__dirname + "/views/compose.ejs");
  // console.log(res.send());

});

// in compose page- set new var title and contact
// create new Post with thes vars
//saves post to DB
app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res) {
  const requestedId = req.params.postId;
  Post.findOne({_id: requestedId}, function(err, post){
      res.render("post",{
        title: post.title,
        content: post.content
      });
    }); // post
  });//app.get








  app.listen(process.env.PORT, function() {
    console.log("Server has started on port 3000");
  });
  // let port = process.env.PORT;
  // if (port == null || port == "") {
  //   port = 3000;
  // }
  // app.listen(port);





  home.ejs ********************************************


  <%- include("partials/header"); -%>

      <h1>Home</h1>
      <p> <%= firstParagraph %> </p>


    <%  posts.forEach(function(post){ %>

      <h1><%= post.title%></h1><p><%= post.content.substring(0, 100) + " ..."%>
      <a href="/posts/<%=post._id%>">Read More</a></p>


      <% }) %>


  <%- include("partials/footer"); -%>
