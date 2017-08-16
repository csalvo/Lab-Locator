var config = {
    apiKey: "AIzaSyBp0NeXcn_s0KN5Fk5GzKFrVUROXVPfwFY",
    authDomain: "lab-locator.firebaseapp.com",
    databaseURL: "https://lab-locator.firebaseio.com",
    projectId: "lab-locator",
    storageBucket: "lab-locator.appspot.com",
    messagingSenderId: "609841097386"
};

firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref("labList");

// Dropdown button cntrl 
$('.dropdown-toggle').dropdown()

//Close the modal// Get the modal
$("#submit").click(function() {
    $("#myModal").hide();
})

$('#searchBox').keyup(function() {
    if (event.keyCode === 13) {
        $("#myModal").hide();
    }
});


//cant get this to work 
// $(".adminLogin").click(function() {
//     $('#adminModal').modal('show');
// });



// $("#btnLogin").click(function() {
//     adminAuth();
// })


// function adminAuth() {

//     var adminEmail = $("#adminEmail").val();
//     var password = $("#enterPw").val();
//     var btnLogin = $("#btnLogin");
//     var btnSignUp = $("#btnSignup");
//     var btnLogout = $("#btnLogout");


//     firebase.auth().signInWithEmailAndPassword(adminEmail, password)
//         .catch(function(error) {
//             // Handle Errors here.
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             if (errorCode === 'auth/wrong-password') {
//                 alert('Wrong password.');
//             }
//             else {
//                 alert(errorMessage);
//             }
//             console.log(error);
//         });


// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//   } else {
//     // No user is signed in.
//   }
// });
//     if (firebase.auth()) {
//         console.log("yep");
//     } else {
//         console.log("nope");
//     }

// }

// $("#btnSignUp").click(function() {
//     var email = adminEmail.val();
//     var pass = password.val();
//     var auth = firebase.auth();
//     var promise = auth.createUserWithEmailAndPassword(email, pass);
// });

// $("#btnLogout").click(function() {
//     firebase.auth().signOut().then(function() {
//         // Sign-out successful.
//     }).catch(function(error) {
//         // An error happened.
//     });
// });