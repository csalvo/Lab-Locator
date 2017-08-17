var calls = 0;
//address from input field
var userAddress;
//make userAddress url compatible
var startAddress = encodeURIComponent(userAddress);
//radius from radius button dropdown
var radius;
var dest = [];
var sorted;

//makes first modal screen initially visible
var modal = $("#myModal");
modal.css("display", "block");

//address input box grows as you type
$('#enterAddy').autoGrowInput({ minWidth: 250, maxWidth: 400, comfortZone: 20 });

//choose a radius
$(".dropdown-menu a").click(function() {
  radius = this.dataset.value;
  $("#dropdownMenu1").html(radius + " mi");
})

//click submit to set address and run google maps function
$("#findLab").click(function() {
  userAddress = $("#enterAddy").val().trim();
  modal.hide();
  initMap();
})

//or press enter to set address and run google maps function
$("#enterAddy").keyup(function(){  
   if (event.keyCode == 13) {
   	 modal.hide();
     userAddress = $("#enterAddy").val().trim();
     initMap();
   }
});

//firebase set up
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

//code that was used to enter the lab object into the database
//database.ref().remove();
//for (var i = 0; i < labList.length; i++) {
//	database.ref("labList").push({
//		labName: labList[i].labName,
//		address: labList[i].address,
//		city: labList[i].city,
//		state: labList[i].state,
//        zip: labList[i].zip,
//        partnersAffiliate: labList[i].partnersAffiliate,
//        labOrders: labList[i].labOrders,
//        labAppointment: labList[i].labAppointment,
//        practiceOnly: labList[i].practiceOnly,
//        phone: labList[i].phone,
//        fax: labList[i].fax
//	});
//}

//google maps and firebase calls
function initMap() {
  if (radius === undefined){
    radius = 20;
  }
  console.log(radius);
  //creating distance matrix service
  var service = new google.maps.DistanceMatrixService();
  //making a reference to the firebase node called labList
  labAddress = firebase.database().ref("labList");
  //taking a snapshot of that data
  labAddress.once("value", function (snapshot) {
    //taking a count of the number of children of labList
    var labs = snapshot.numChildren();
    //looping through each child
    snapshot.forEach(function (data) {
      //putting the elements of an address together in required format for gmaps js api
      var destination = ["\"" + data.val().address + ", " + data.val().city + ", " + data.val().state + ", " + data.val().zip + "\""];
      //creating variables that reference values from the data snapshot that will be used to create an array of objects below
      var name = data.val().labName;
      var address = data.val().address + ", " + data.val().city + ", " + data.val().state + " " + data.val().zip;
      var partnersAffiliate = data.val().partnersAffiliate;
      var labOrders = data.val().labOrders;
      var labAppointment = data.val().labAppointment;
      var practiceOnly = data.val().practiceOnly;
      var phone = data.val().phone;
      var fax = data.val().fax;
      //calling the gmaps js distance matrix api
      service.getDistanceMatrix({
        //userAddress from input text box on search page
        origins: [userAddress],
        destinations: destination,
        travelMode: 'DRIVING',
        //get miles, not km
        unitSystem: google.maps.UnitSystem.IMPERIAL
      }, function (response, status) {
        //call makeMaps function below and pass in variable labs, the function will get called on every loop through firebase data
        makeMaps(labs);
        if (status !== 'OK') {
          alert('Error was: ' + status);
          //if the call was successful, take each distance and see if it is less than the radius specified by the user
        } else if (status === 'OK') {
          var labDistance = response.rows[0].elements[0].distance.text;
          var intLabDistance = labDistance.substr(0, labDistance.length - 3);
          console.log(labDistance);
          var parsed = parseInt(intLabDistance);
          //if it is less, take the firebase data from that lab and make an array of objects
          if (parsed <= radius) {
            dest.push({
              rad: intLabDistance,
              sortName: name,
              sortAddy: address,
              sortPartners: partnersAffiliate,
              sortLabO: labOrders,
              sortlabA: labAppointment,
              sortPractice: practiceOnly,
              sortPhone: phone,
              sortFax: fax
            });
          }
        }
      });
    });
  });
  loading();
}

//run the loading gif while waiting for the results
function loading() {
  $("#lab-title").html("Labs found within " + radius + " miles of " + userAddress);
  $("#mapTable").append("<img id='loading' class='center-block' src='assets/images/loading.gif'>");
}

function makeMaps(labs) {
  //increment calls
  calls++;
  //if the number of times the function has been called doesn't equal the number of labs in the database, stop the function.  if they are equal, that means that all the apis are finished and the function can proceed
  if (calls !== labs) {
    return
  };
  //sort the array of labs in order from nearest to furthest
  sorted = dest.sort(function (obj1, obj2) {
    return obj1.rad - obj2.rad;
  });
  //hide the loading gif
  $("#loading").hide();
  //loop through the now sorted array and for each object, use the google maps static api to get a static map and append that map along with the lab information to the table on the main page
  for (var i = 0; i < sorted.length; i++) {
    var endAddress = encodeURIComponent(sorted[i].sortAddy);
var startAddress = encodeURIComponent(userAddress);
    $("#mapTable").append('<tr><td><div class="miles">' + sorted[i].rad + ' miles away</div><div class="nameDiv"><strong>' + sorted[i].sortName + '</strong></div><div>' + sorted[i].sortAddy + '</div><div>Hospital Affiliation: ' + sorted[i].sortPartners + '</div><div>Lab Orders: ' + sorted[i].sortLabO + '</div><div>Need Appointment: ' + sorted[i].sortlabA + '</div><div>Practice Only: ' + sorted[i].sortPractice + '</div><div>Phone: ' + sorted[i].sortPhone + '</div><div>Fax: ' + sorted[i].sortFax + '</div></td><td><img class="img-responsive" src="https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyA5BItXvjAHI3qHoMYig0iUMQoNcbeHGTU&size=500x400&markers=' + endAddress + '"><br><a target="_blank" href="https://www.google.com/maps/dir/' + startAddress + '/' + endAddress + '/">Get Directions to ' + sorted[i].sortName + '</a></td></tr>');
  }
  //if there are no entries in the sorted array, it means there are no labs in the specified radius
  if (sorted.length === 0) {
    $("#mapTable").append("<div id='noLabs'>There are no labs within the radius you selected.  Please click here to try again:</div><button id='newSearch' type='button' class='btn btn-default'>New Search</button>");
  }
}

//if your search returned no maps, click this button to reload the page and search again
$("#mapTable").on("click", "#newSearch", function () {
  location.reload();
  //or modal.show();?
})

//flowtype resizes the text at different screen sizes
$('body').flowtype({
  minimum: 200,
  maximum: 500,
  minFont: 12,
  maxFont: 40,
  fontRatio: 30
});

//google maps directions api key: AIzaSyCu4jYgdD50LGmt0i8ZJ09EW89Cck-NVtc

//google maps javascript api key: AIzaSyCZ29LFbmjkpo67GRatcSUgAp5kCO4Ncso
//  "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"

//google maps geocoding api key: AIzaSyDKT8TTq-HUOcagvAUPHbhIMUNfGvW-3XI
//  "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY"
//  AIzaSyBjn7kdkVnqf_K6MfQgOJmkmdYjVXelCR4

//  google static maps api key: AIzaSyA5BItXvjAHI3qHoMYig0iUMQoNcbeHGTU
