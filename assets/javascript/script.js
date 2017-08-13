function adminChanges(){

var config = {
    apiKey: "AIzaSyBp0NeXcn_s0KN5Fk5GzKFrVUROXVPfwFY",
    authDomain: "lab-locator.firebaseapp.com",
    databaseURL: "https://lab-locator.firebaseio.com",
    projectId: "lab-locator",
    storageBucket: "lab-locator.appspot.com",
    messagingSenderId: "609841097386"
  };

firebase.initializeApp(config);

var adminEmail = $("#adminEmail");
var password = $("#enterPw");
var btnLogin = $("#btnLogin");
var btnSignUp = $("#btnSignup");
var btnLogout = $("#btnLogout");

$("#btnLogin").click(function authAdmin(){
 
  var email = adminEmail.val();
  var pass = password.val();
  var auth = firebase.auth();
  firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
  
  if (firebase.auth()) {
      console.log("yep");
      window.open("admin.html");
  } else {
      console.log("nope");
  }
  
});

$("#btnSignUp").click(function(){
  var email = adminEmail.val();
  var pass = password.val();
  var auth = firebase.auth();
  var promise = auth.createUserWithEmailAndPassword(email, pass);
});

$("#btnLogout").click( function(){
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
  }).catch(function(error) {
  // An error happened.
  });
});

};

adminChanges();

