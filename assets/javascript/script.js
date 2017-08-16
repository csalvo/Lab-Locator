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

//address from input field
var userAddress = "11 mark vincent dr westford ma";
var startAddress = encodeURIComponent(userAddress);
//radius from radius button dropdown
var radius = 30;
var dest = [];
var sorted;


  
function initMap() {

    
    var service = new google.maps.DistanceMatrixService();
    labAddress = firebase.database().ref("labList");
    labAddress.once("value", function(snapshot) {
        snapshot.forEach(function(data) {
        var destination = ["\""+ data.val().address + ", " + data.val().city + ", " + data.val().state + ", " + data.val().zip + "\""];
        var name = data.val().labName;
        var address = data.val().address + ", " + data.val().city + ", " + data.val().state + " " + data.val().zip;
        var partnersAffiliate = data.val().partnersAffiliate;
        var labOrders = data.val().labOrders;
        var labAppointment = data.val().labAppointment;
        var practiceOnly = data.val().practiceOnly;
        var phone = data.val().phone;
        var fax = data.val().fax;      
        service.getDistanceMatrix({
                origins: [userAddress],
                destinations: destination,
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.IMPERIAL
            }, function(response, status) {
          console.log("1.response: " + response)
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            console.log(status);
            var labDistance = response.rows[0].elements[0].distance.text;
            console.log("2. lab distance: " + labDistance)
            var intLabDistance = labDistance.substr(0, labDistance.length-3);
            if (intLabDistance <= radius) {
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
  makeMaps();
    });
  }

function makeMaps() {
    $("#lab-title").html("Labs found within " + radius + " miles of " + userAddress);
    $("#mapTable").append("<img id='loading' class='center-block' src='assets/images/loading.gif'>");  

    // setTimeout(function() {
   
    sorted = dest.sort(function(obj1, obj2){
        return obj1.rad - obj2.rad;
      });
     console.log("3.sorted: " + sorted);
      for (var i = 0; i < sorted.length; i++) {
        var endAddress = encodeURIComponent(sorted[i].sortAddy);
        $("#loading").hide();
        console.log(sorted[i].rad);
        $("#mapTable").append('<tr><td><div class="miles">' + sorted[i].rad + ' miles away</div><div class="nameDiv"><strong>' + sorted[i].sortName + '</strong></div><div>' + sorted[i].sortAddy + '</div><div>Hospital Affiliation: ' + sorted[i].sortPartners + '</div><div>Lab Orders: ' + sorted[i].sortLabO + '</div><div>Need Appointment: ' + sorted[i].sortlabA + '</div><div>Practice Only: ' + sorted[i].sortPractice + '</div><div>Phone: ' + sorted[i].sortPhone + '</div><div>Fax: ' + sorted[i].sortFax + '</div></td><td><img class="img-responsive" src="https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyA5BItXvjAHI3qHoMYig0iUMQoNcbeHGTU&size=500x400&markers=' + endAddress + '"><br><a target="_blank" href="https://www.google.com/maps/dir/' + startAddress + '/' + endAddress + '/">Get Directions to ' + sorted[i].sortName + '</a></td></tr>');
        }
    // }, 2000);
  // setTimeout(function() {
   if (sorted.length === 0) {
     console.log("4. no maps");
      $("#loading").hide();
      $("#mapTable").append("<div id='noLabs'>There are no labs within the radius you selected.  Please click here to try again:</div><button id='newSearch' type='button' class='btn btn-default'>New Search</button>");
    }
    // }, 5000); 
}