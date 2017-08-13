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


database.ref("/labList/").on("child_added", function(snapshot){ 
 var row = '<tr><td>' + snapshot.val().labName + '</td><td>' + snapshot.val().address + ", " + snapshot.val().city +
 			", " + snapshot.val().state + ", " + snapshot.val().zip + 
              '</td><td>'+ snapshot.val().partnersAffiliate + '</td><td>' + snapshot.val().labOrders + '</td><td>' + snapshot.val().phone + '</td><td>' + snapshot.val().fax + 
              '</td><td><i class="fa fa-pencil" aria-hidden="true"></i></td><td><i class="fa fa-times-circle-o" aria-hidden="true"></i></td></tr><hr>';

 $("#lab-table tbody").append(row);

});


$("#searchButton").on("click", function() {

var orderBy = $("#keyFilter").val();
var search = $("#searchBox").val();
console.log(search);
$('#lab-table tbody').empty();

var ref = database.ref("labList");
ref.orderByChild(orderBy).equalTo(search).on("child_added", function(snapshot) {
  console.log(snapshot.val());

    row = '<tr><td>' + snapshot.val().labName + '</td><td>' + snapshot.val().address + ", " + snapshot.val().city +
 			", " + snapshot.val().state + ", " + snapshot.val().zip + 
              '</td><td>'+ snapshot.val().partnersAffiliate + '</td><td>' + snapshot.val().labOrders + '</td><td>' + snapshot.val().phone + '</td><td>' + snapshot.val().fax + 
              '</td><td><i class="fa fa-pencil" aria-hidden="true"></i></td><td><i class="fa fa-times-circle-o" aria-hidden="true"></i></td></tr><hr>';

 $("#lab-table tbody").append(row);
});
});


$("#clearButton").on("click",function(){
	$('#lab-table tbody').empty();

	database.ref("/labList/").on("child_added", function(snapshot){ 
 var row = '<tr><td>' + snapshot.val().labName + '</td><td>' + snapshot.val().address + ", " + snapshot.val().city +
 			", " + snapshot.val().state + ", " + snapshot.val().zip + 
              '</td><td>'+ snapshot.val().partnersAffiliate + '</td><td>' + snapshot.val().labOrders + '</td><td>' + snapshot.val().phone + '</td><td>' + snapshot.val().fax + 
              '</td><td><i class="fa fa-pencil" aria-hidden="true"></i></td><td><i class="fa fa-times-circle-o" aria-hidden="true"></i></td></tr><hr>';

 $("#lab-table tbody").append(row);
});
});



