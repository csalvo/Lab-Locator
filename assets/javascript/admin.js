var modal = $("#myModal");
modal.css("display", "block");

var username = "adam.g.wallis@gmail.com"
var password = "password"


$("#loginButtonAdminModal").click(function() {
    var usernameInput = $("#adminEmail").val();
    var passwordInput = $("#adminPw").val();
    console.log(usernameInput, username, password, passwordInput);
    if (usernameInput === username && passwordInput === password) {
        modal.hide();
    } else {
        $(".alert").alert('close');
        $(".alertAdmin").prepend('<div class="alert alert-data alert-danger" role="alert"><strong>Invalid username or password.</div>');
    }
});


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
var editing = false;

loadLabs();

$("#addLabButton").on("click", function() {
    $('#addLabModal').modal('show');
    //clear double click prevention
    $("#saveLab").removeProp('disabled', false);
});

$("#saveLab").on("click", function() {
    getLabDataFromTextInputs();
    if (labName === "" || labAddress1 === "" || labCity === "" || labState === "" || labZip === "") {
        formValidation();
    } else {
        if (editing) {
            saveEditedLabData(labIdToEdit);
            // displayEditedLabData(labIdToEdit);
        }
        if (!editing) {
            addNewLab();
        }

        $('#addLabModal').modal('hide');
        clearModalInfo();
        editing = false;
    }

});

$("#cancelAddLab").on("click", function() {
    clearModalInfo();
});

$("#searchButton").on("click", function() {
    var searchFor = $("#searchBoxAdmin").val();
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

//delete lab
$("#lab-table tbody").on("click", "#deleteLab", function() {
    $('#confirmDelete').modal('show');
    labIdToDelete = this.value;
    labRowToDelete = this;
});

//edit lab
$("#lab-table tbody").on("click", "#editLab", function() {
    $("#saveLab").removeProp('disabled', false);
    editing = true;
    $('#addLabModal').modal('show')
    $(".addEditTitle").text("Edit Lab");
    labIdToEdit = this.value;
    console.log(this.value);
    labRowToEdit = this;
    displayDataForEditLab();
});

$("#delete").on("click", function() {
    $('#confirmDelete').modal('hide');
    ref.child(labIdToDelete).remove(function(error) {
        if (error)
            $("#search").prepend('<div class="alert alert-danger" role="alert"><strong>Lab was not deleted.</div>');
        else {
            $("#search").prepend('<div class="alert alert-success" role="alert"><strong>Selected lab has been deleted.</div>');
        }
        setTimeout(function() {
            $(".alert").alert('close');
        }, 3000);

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
    $("#searchBoxAdmin").val("");
    $(".panel-title").text("Labs");
    $(".alert").alert('close');
    loadLabs();
}

function loadLabs() {
    ref.orderByChild("/labName").on("child_added", function(snapshot) {
        var row = '<tr><td>' + snapshot.val().labName + '</td><td>' + snapshot.val().address + ", " + snapshot.val().city +
            ", " + snapshot.val().state + ", " + snapshot.val().zip +
            '</td><td>' + snapshot.val().partnersAffiliate + '</td><td>' + snapshot.val().labOrders + '</td><td>' + snapshot.val().phone + '</td><td>' + snapshot.val().fax +
            '</td><td><button id="editLab" value="' + snapshot.key + '"><i class="fa fa-pencil" aria-hidden="true"></i></button></td><td><button id="deleteLab"  value="' + snapshot.key + '"><i class="fa fa-times" aria-hidden="true"></i></button></td></tr><hr>';

        $("#lab-table tbody").append(row);
    });
}

function addNewLab() {
    getLabDataFromTextInputs();

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
            $("#search").prepend('<div class="alert alert-danger" role="alert"><strong>Your lab was not saved.</div>');
        else {
            $("#search").prepend('<div class="alert alert-success" role="alert"><strong>Your lab has been saved!</div>');
        }
        setTimeout(function() {
            $(".alert").alert('close');
        }, 3000);

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
    $("#lab-name-label").css("color", "black");
    $("#lab-address-label").css("color", "black");
    $("#lab-city-label").css("color", "black");
    $("#lab-state-label").css("color", "black");
    $("#lab-zip-label").css("color", "black");
    $(".alert").alert('close');

}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("lab-table").deleteRow(i);
}

function getLabDataFromTextInputs() {
    labName = $("#lab-name-input").val();
    labAddress1 = $("#address-input").val();
    labCity = $("#city-input").val();
    labState = $("#state").val();
    labZip = $("#zip-input").val();
    labPhone = $("#phone-input").val();
    labFax = $("#fax-input").val();
    labPartnersAffiliate = $("#partnersAffiliate-input").val();
    labOrders = $("#labOrders-input").val();
    labAppointment = $("#appointment-input").val();
    labPractice = $("#practice-input").val();
}

function displayDataForEditLab() {
    ref.child(labIdToEdit).once("value", function(snapshot) {
        $("#lab-name-input").val(snapshot.val().labName);
        $("#address-input").val(snapshot.val().address);
        $("#city-input").val(snapshot.val().city);
        $("#state").val(snapshot.val().state);
        $("#zip-input").val(snapshot.val().zip);
        $("#phone-input").val(snapshot.val().phone);
        $("#fax-input").val(snapshot.val().fax);
        $("#partnersAffiliate-input").val(snapshot.val().partnersAffiliate);
        $("#labOrders-input").val(snapshot.val().labOrders);
        $("#appointment-input").val(snapshot.val().labAppointment);
        $("#practice-input").val(snapshot.val().practiceOnly);
    });
}

function saveEditedLabData(id) {
    getLabDataFromTextInputs();

    var editedLab = {
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

    database.ref("labList/" + id).update(editedLab, function(error) {
        if (error)
            $("#search").prepend('<div class="alert alert-danger" role="alert"><strong>Lab was not edited.</div>');
        else {
            $("#search").prepend('<div class="alert alert-success" role="alert"><strong>Edits have been saved.</div>');
            displayEditedLabData(id)
        }
        setTimeout(function() {
            $(".alert").alert('close');
        }, 3000);
    });


}

function displayEditedLabData(id) {
    $(labRowToEdit).parent().parent().replaceWith('<tr><td>' + labName + '</td><td>' + labAddress1 + ", " + labCity + ", " + labState + ", " +
        labZip + '</td><td>' + labPartnersAffiliate + '</td><td>' + labOrders + '</td><td>' + labPhone + '</td><td>' + labFax +
        '</td><td><button id="editLab" value="' + id + '"><i class="fa fa-pencil" aria-hidden="true"></i></button></td><td><button id="deleteLab"  value="' +
        id + '"><i class="fa fa-times" aria-hidden="true"></i></button></td></tr><hr>');
}

function formValidation() {
    $("#lab-name-label").css("color", "red");
    $("#lab-address-label").css("color", "red");
    $("#lab-city-label").css("color", "red");
    $("#lab-state-label").css("color", "red");
    $("#lab-zip-label").css("color", "red");
    $(".modal-body").prepend('<div class="alert alert-data alert-danger" role="alert"><strong>Please enter all required data.</div>');

}