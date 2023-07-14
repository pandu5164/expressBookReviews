const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const getBookListByProp = (searchBy, prop) => {
    const bookList = [];
    for (const [key, value] of Object.entries(books)) {
        if (value[searchBy] == prop) {
            bookList.push(value);
        }
    }
    return bookList;
}

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

// Task 7
//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: username
    }, 'access', { expiresIn: 60 * 60});

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Task 8
// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    const reqReview = req.query.review;
    const user = req.user.data;
    const reqIsbn = req.params.isbn;
    if (reqReview && user) {
        for (const [key, value] of Object.entries(books)) {
            if (value['isbn'] == reqIsbn) {
                value.reviews[user] = reqReview;
                console.log('book list value after update', {value, books});
            }
        }
        return res.status(200).send("Review updated successfully!");
    }
    return res.status(404).json({message: `Error updating review for ${user} to requested isbn ${reqIsbn}`});
});

// Task 9
// delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    // const getBookByIsbn = getBookListByProp('isbn', req.body.isbn);
    const reqIsbn = req.params.isbn;
    const user = req.user.data;
    if (reqIsbn) {
        for (const [key, value] of Object.entries(books)) {
            const userReview = value.reviews[user];
            if (value['isbn'] == reqIsbn && userReview) {
                delete value.reviews[user];
                console.log('deleted value book', {value, books});
                return res.status(200).send(`Review deleted successfully for user - ${user} to isbn ${reqIsbn}`);
            }
        }
    }
    return res.status(404).json({message: `Error deleting review for ${user} to isbn ${reqIsbn}`});
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.getBookListByProp = getBookListByProp;
