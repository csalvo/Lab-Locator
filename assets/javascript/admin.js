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

loadLabs();

$("#searchButton").on("click", function() {
    var searchFor = $("#searchBox").val();
    if (searchFor != ""){
    	searchLabs(searchFor);
    } else{
    	$("#search").append("<div id='searchValidation'>Please enter a search term</div>");
    }
    
});

$("#clearButton").on("click", function() {
    clearSearch();
});

function searchLabs(searchTerm) {

    $('#lab-table tbody').empty();
    searchArray = [];
    var ref = database.ref("labList");
    ref.on("child_added", function(snapshot) {
        searchArray.push(snapshot.val())
    });
    currentSearch = JSON.search(searchArray, "//*[contains(text(),'" + searchTerm + "')]/..");

    if (currentSearch.length > 0) {
        for (var i = 0; i < currentSearch.length; i++) {
            row = '<tr><td>' + currentSearch[i].labName + '</td><td>' + currentSearch[i].address + ", " +
                currentSearch[i].city + ", " + currentSearch[i].state + ", " + currentSearch[i].zip + '</td><td>' +
                currentSearch[i].partnersAffiliate + '</td><td>' + currentSearch[i].labOrders + '</td><td>' +
                currentSearch[i].phone + '</td><td>' + currentSearch[i].fax + '</td><td><i class="fa fa-pencil" aria-hidden="true"></i></td><td><i class="fa fa-times-circle-o" aria-hidden="true"></i></td></tr><hr>';
            $("#lab-table tbody").append(row);
        }

    } else if (currentSearch <= 0) {
        row = '<tr><td>No labs found. Try a new search.</td><td>'
        $("#lab-table tbody").append(row);
    } 
}

function clearSearch() {
    $('#lab-table tbody').empty();
    $("#searchBox").val("");
    loadLabs();
}

function loadLabs() {
    database.ref("/labList/").orderByChild("/labName").on("child_added", function(snapshot) {
        var row = '<tr><td>' + snapshot.val().labName + '</td><td>' + snapshot.val().address + ", " + snapshot.val().city +
            ", " + snapshot.val().state + ", " + snapshot.val().zip +
            '</td><td>' + snapshot.val().partnersAffiliate + '</td><td>' + snapshot.val().labOrders + '</td><td>' + snapshot.val().phone + '</td><td>' + snapshot.val().fax +
            '</td><td><i class="fa fa-pencil" aria-hidden="true"></i></td><td><i class="fa fa-times-circle-o" aria-hidden="true"></i></td></tr><hr>';

        $("#lab-table tbody").append(row);
    });
}