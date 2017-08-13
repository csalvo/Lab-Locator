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

//HERE IS WHERE I GET SERIOUSLY LOST...HOW DO YOU VERIFY NAME/PASSWORD AGAINST FIREBASE'S USER?
  //var promise = firebase.auth.onAuthStateChanged(User);
  
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

// var auth = firebase.auth();
// var email = $("#adminEmail");
// var pass = $("#enterPw");

// auth.signInWithEmailAndPassword(email, pass);
// auth.createUserWithEmailAndPassword(email, pass);

// var labList = [];
// var indivLab = [];

// $("#btnLogin").click(signInAdmin(){
// }); 


// function () {
//   $('#adminPage"').html(
//   )
// }

// function listLabs() {
//   $('#adminPage').html(
//   )
// };

// function gotoLab () {

// };

// function signInAdmin() {
  
//   //the call to sign in  
//   auth.signInWithEmailAndPassword(email, password).catch(function(error) {
  
//           // Handle Errors here.
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           // [START_EXCLUDE]
//             if (errorCode === 'auth/wrong-password') {
//               alert('Wrong password.');
//             } else {
//               alert(errorMessage);
//             }
//               console.log(error);
//               document.getElementById('quickstart-sign-in').disabled = false;
//             // [END_EXCLUDE]
//         });
// };

//       var uiConfig = {
//         signInSuccessUrl: 'admin.html',
//         signInOptions: firebase.auth.EmailAuthProvider.PROVIDER_ID,
       
//         // Terms of service url.
//         tosUrl: '<your-tos-url>'
//       };

//       // Initialize the FirebaseUI Widget using Firebase.
//       var ui = new firebaseui.auth.AuthUI(firebase.auth());
//       // The start method will wait until the DOM is loaded.
//       ui.start('#firebaseui-auth-container', uiConfig);
    
