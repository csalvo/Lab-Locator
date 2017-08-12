var config = {
  apiKey: "AIzaSyBp0NeXcn_s0KN5Fk5GzKFrVUROXVPfwFY",
  authDomain: "lab-locator.firebaseapp.com",
  databaseURL: "https://lab-locator.firebaseio.com",
  projectId: "lab-locator",
  storageBucket: "lab-locator.appspot.com",
  messagingSenderId: "609841097386"
};

firebase.initializeApp(config);

var auth = firebase.auth();
var email = $("#adminEmail");
var pass = $("#enterPw");
var promise = auth.signInWithEmailAndPassword(email, pass);

var labList = [];
var indivLab = [];

$("#btnLogin").click(goToLab(){
}); 


function  {
  $('#adminPage"').html(
  )
}

function listLabs() {
  $('#adminPage').html(
  )
};

function signInAdmin() {
  
  //the call to sign in  
  auth.signInWithEmailAndPassword(email, password).catch(function(error) {
  
  //callback to monitor the authentication status        
        

          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
              console.log(error);
              document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
        });
    
};
