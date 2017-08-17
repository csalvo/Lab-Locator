

var config = {
    apiKey: "AIzaSyBp0NeXcn_s0KN5Fk5GzKFrVUROXVPfwFY",
    authDomain: "lab-locator.firebaseapp.com",
    databaseURL: "https://lab-locator.firebaseio.com",
    projectId: "lab-locator",
    storageBucket: "lab-locator.appspot.com",
    messagingSenderId: "609841097386"
  };

firebase.initializeApp(config);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

var user = firebase.auth().currentUser;
  
  $("#btnLogin").click(function authAdmin(){
    var email = $("#adminEmail").val();
    var pass = $("#enterPw").val();
    $("#adminEmail").val("");
    $("#enterPw").val("");
    var auth = firebase.auth();
    var user = firebase.auth().currentUser;
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
      // ... 
    firebase.auth().onAuthStateChanged(function(user) {
      if (user != null) {
        console.log("yep");
        window.open("admin.html");
        location.reload();
      } else {
        console.log("nope");
      }
    });
});
  

});

//  $("#btnSignUp").click(function(){
//    var email = $("#adminEmail").val();
//    var pass = $("#enterPw").val();
//    $("#adminEmail").val("");
//    $("#enterPw").val("");
//    var currentUser = firebase.auth().currentUser;
//    firebase.auth().createUserWithEmailAndPassword(email, pass);
//    if (firebase.auth(currentUser) == true){
//        console.log('created');
//      } else {
//        console.log('try again');
//      }
//  });

  $("#btnLogout").click(function(){
    console.log("ok");  
    var user = firebase.auth().currentUser;
    firebase.auth().signOut().then(function() {
    }).catch(function(error) {
    // An error happened.
    });
    window.close();
  });




