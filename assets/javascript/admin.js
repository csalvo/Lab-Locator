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


database.ref("/labList/").on("child_added", function(snapshot) {
    var row = '<tr><td>' + snapshot.val().labName + '</td><td>' + snapshot.val().address + ", " + snapshot.val().city +
        ", " + snapshot.val().state + ", " + snapshot.val().zip +
        '</td><td>' + snapshot.val().partnersAffiliate + '</td><td>' + snapshot.val().labOrders + '</td><td>' + snapshot.val().phone + '</td><td>' + snapshot.val().fax +
        '</td><td><i class="fa fa-pencil" aria-hidden="true"></i></td><td><i class="fa fa-times-circle-o" aria-hidden="true"></i></td></tr><hr>';

    $("#lab-table tbody").append(row);

});


$("#searchButton").on("click", function() {
    var searchFor = $("#searchBox").val();
    searchLabs(searchFor);
});

$("#clearButton").on("click", function() {
    clearSearch();
});

function searchLabs(searchTerm){
    $('#lab-table tbody').empty();
    searchArray = [];
    var ref = database.ref("labList");
    ref.on("child_added", function(snapshot) {
    	searchArray.push(snapshot.val())
    });
    res2 = JSON.search( searchArray, "//*[contains(text(),'" + searchTerm + "')]/.." );

	for (var i = 0; i < res2.length; i++) {
		row = '<tr><td>' + res2[i].labName + '</td><td>' + res2[i].address + ", " + 
		res2[i].city + ", " + res2[i].state + ", " + res2[i].zip + '</td><td>' + 
		res2[i].partnersAffiliate + '</td><td>' + res2[i].labOrders + '</td><td>' + 
        res2[i].phone + '</td><td>' + res2[i].fax + '</td><td><i class="fa fa-pencil" aria-hidden="true"></i></td><td><i class="fa fa-times-circle-o" aria-hidden="true"></i></td></tr><hr>';
		$("#lab-table tbody").append(row);
	}
}

function clearSearch(){
	$('#lab-table tbody').empty();

    database.ref("/labList/").on("child_added", function(snapshot) {
        var row = '<tr><td>' + snapshot.val().labName + '</td><td>' + snapshot.val().address + ", " + snapshot.val().city +
            ", " + snapshot.val().state + ", " + snapshot.val().zip +
            '</td><td>' + snapshot.val().partnersAffiliate + '</td><td>' + snapshot.val().labOrders + '</td><td>' + snapshot.val().phone + '</td><td>' + snapshot.val().fax +
            '</td><td><i class="fa fa-pencil" aria-hidden="true"></i></td><td><i class="fa fa-times-circle-o" aria-hidden="true"></i></td></tr><hr>';

        $("#lab-table tbody").append(row);
    })
};