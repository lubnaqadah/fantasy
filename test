//In this test file we are testing login functionality

var Nightmare = require("nightmare");
var nightmare = Nightmare({ show: true })

nightmare
    //going to heroku app address
    .goto("https://fantasyteam.herokuapp.com/")
    //waiting to load since heroku service is pretty slow
    .wait(3000)
    //clicking login button
    .click("a#.login")
    //filling the name and password fields
    .type("input#defaultForm-email.form-control validate name", "alex")
    .type("input#defaultForm-pass.defaultform-control validate password", "1111")
    //clicking login button
    .click("button.btn btn-default btnLogin")
    .end()
    //displaying login failed error if test fails
    .catch(function(error) {
        console.error("Login failed", error);
    });
