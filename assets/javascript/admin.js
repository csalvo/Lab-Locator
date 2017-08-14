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

loadLabs();

$("#addLabButton").on("click", function() {
    $('#addLabModal').modal('show');
    //clear double click prevention
    $("#saveLab").removeProp('disabled', false);
});

$("#saveLab").on("click", function() {
    addNewLab();
    $('#addLabModal').modal('hide')
    clearModalInfo();
});

$("#searchButton").on("click", function() {
    var searchFor = $("#searchBox").val();
    if (searchFor != "") {
        searchLabs(searchFor);
        $(".alert").alert('close');
    } else {
        $("#search").prepend('<div class="alert alert-danger" role="alert"><strong>Please enter a search term.</div>');
        setTimeout(function() {
            $(".alert").alert('close');
        }, 2000);
    }

});

$("#clearButton").on("click", function() {
    clearSearch();
});

$("#lab-table tbody").on("click", "#deleteLab", function() {
    $('#confirmDelete').modal('show');
    labIdToDelete = this.value;
    labRowToDelete = this;
    console.log(labIdToDelete, labRowToDelete);
});

$("#delete").on("click", function() {
    ref.child(labIdToDelete).remove(function(error) {
        if (error)
            console.log('Error has occured during saving process')
        else {
            $("#search").prepend('<div class="alert alert-success" role="alert"><strong>Selected lab has been deleted.</div>');

            setTimeout(function() {
                $(".alert").alert('close');
            }, 3000);
        }
    });
    deleteRow(labRowToDelete);
});


function searchLabs(searchTerm) {

    $('#lab-table tbody').empty();
    searchArray = [];
    ref.on("child_added", function(snapshot) {
        searchArray.push(snapshot.val())
    });
    currentSearch = JSON.search(searchArray, "//*[contains(text(),'" + searchTerm + "')]/..");

    $(".panel-title").text("Labs containing '" + searchTerm + "'");

    if (currentSearch.length > 0) {
        for (var i = 0; i < currentSearch.length; i++) {
            row = '<tr><td>' + currentSearch[i].labName + '</td><td>' + currentSearch[i].address + ", " +
                currentSearch[i].city + ", " + currentSearch[i].state + ", " + currentSearch[i].zip + '</td><td>' +
                currentSearch[i].partnersAffiliate + '</td><td>' + currentSearch[i].labOrders + '</td><td>' +
                currentSearch[i].phone + '</td><td>' + currentSearch[i].fax + '</td><td><i class="fa fa-pencil" aria-hidden="true"></i></td><td class="deleteLab"><i class="fa fa-times" aria-hidden="true"></i></td></tr><hr>';
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
    $(".panel-title").text("Labs");
    $(".alert").alert('close');
    loadLabs();
}

function loadLabs() {
    ref.orderByChild("/labName").on("child_added", function(snapshot) {
        var row = '<tr><td>' + snapshot.val().labName + '</td><td>' + snapshot.val().address + ", " + snapshot.val().city +
            ", " + snapshot.val().state + ", " + snapshot.val().zip +
            '</td><td>' + snapshot.val().partnersAffiliate + '</td><td>' + snapshot.val().labOrders + '</td><td>' + snapshot.val().phone + '</td><td>' + snapshot.val().fax +
            '</td><td><button id="editLab"><i class="fa fa-pencil" aria-hidden="true"></i></button></td><td><button id="deleteLab"  value="' + snapshot.key + '"><i class="fa fa-times" aria-hidden="true"></i></button></td></tr><hr>';

        $("#lab-table tbody").append(row);
    });
}

function addNewLab() {
    //grab values from text fields
    var labName = $("#lab-name-input").val();
    var labAddress1 = $("#address-input").val();
    var labCity = $("#city-input").val();
    var labState = $("#state").val();
    var labZip = $("#zip-input").val();
    var labPhone = $("#phone-input").val();
    var labFax = $("#fax-input").val();
    var labPartnersAffiliate = $("#partnersAffiliate-input").val();
    var labOrders = $("#labOrders-input").val();
    var labAppointment = $("#appointment-input").val();
    var labPractice = $("#practice-input").val();

    //set up object to be pushed to the DB
    var newLab = {
        labName: labName,
        address: labAddress1,
        city: labCity,
        state: labState,
        zip: labZip,
        partnersAffiliate: labPartnersAffiliate,
        labOrders: labOrders,
        labAppointment: labAppointment,
        practiceOnly: labPractice,
        phone: labPhone,
        fax: labFax
    }
    ref.push(newLab, function(error) {
        if (error)
            console.log('Error has occured during saving process')
        else {
            $("#search").prepend('<div class="alert alert-success" role="alert"><strong>Your lab has been saved!</div>');

            setTimeout(function() {
                $(".alert").alert('close');
            }, 3000);
        }
    });

    //double click prevention in case the db is slow 
    $("#saveLab").prop('disabled', true);
}

function clearModalInfo() {
    $("#lab-name-input").val("");
    $("#address-input").val("");
    $("#city-input").val("");
    $("#state").val("");
    $("#zip-input").val("");
    $("#phone-input").val("");
    $("#fax-input").val("");
    $("#partnersAffiliate-input").val("");
    $("#labOrders-input").val("");
    $("#appointment-input").val("");
    $("#practice-input").val("");
}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("lab-table").deleteRow(i);
}