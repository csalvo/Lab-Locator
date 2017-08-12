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

function initMap() {
    var radius = 10;
    var destinationsInRadius = [];
    var service = new google.maps.DistanceMatrixService();
    labAddress = firebase.database().ref("labList");
    labAddress.orderByValue().on("value", function(snapshot) {
        snapshot.forEach(function(data) {
        var destination = ["\""+ data.val().address + ", " + data.val().city + ", " + data.val().state + ", " + data.val().zip + "\""];
        service.getDistanceMatrix({
                origins: ['27 tamarock terrace stoneham, ma 02180'],
                destinations: destination,
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.IMPERIAL
            }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            var labDistance = response.rows[0].elements[0].distance.text;
            var intLabDistance = labDistance.substr(0, labDistance.length-3);
            if (intLabDistance <= radius) {
              destinationsInRadius.push(response.destinationAddresses[0]);
            }

          } 
        });

      });

    });

  }
  console.log(destinationsInRadius);
// 
//         var place = {lat: latitude, lng: longitude};
//         var map = new google.maps.Map(document.getElementById(id), {
//           zoom: 8,
//           center: place
//         });
//         var marker = new google.maps.Marker({
//           position: place,
//           map: map
//         });
//       }



// $(document).ready(function() {


// //database.ref().remove();
// //for (var i = 0; i < labList.length; i++) {
// // database.ref("labList").push({
// //   labName: labList[i].labName,
// //   address: labList[i].address,
// //   city: labList[i].city,
// //   state: labList[i].state,
// //        zip: labList[i].zip,
// //        partnersAffiliate: labList[i].partnersAffiliate,
// //        labOrders: labList[i].labOrders,
// //        labAppointment: labList[i].labAppointment,
// //        practiceOnly: labList[i].practiceOnly,
// //        phone: labList[i].phone,
// //        fax: labList[i].fax
// // });
// //}





// //var array = [];
// //
// //database.ref("apple").set("one");
// //  var query = firebase.database().ref("labList").orderByKey();
// //query.once("value")
// //  .then(function(snapshot) {
// //    snapshot.forEach(function(childSnapshot) {
// //      // key will be "ada" the first time and "alan" the second time
// //      var key = childSnapshot.key;
// //      // childData will be the actual contents of the child
// //      var childData = childSnapshot.val();
// //      array.push(childData.address);
// //  });
// //});
// //google maps directions api key: AIzaSyCu4jYgdD50LGmt0i8ZJ09EW89Cck-NVtc

// //google maps javascript api key: AIzaSyCZ29LFbmjkpo67GRatcSUgAp5kCO4Ncso
// //  "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"

// //google maps geocoding api key: AIzaSyDKT8TTq-HUOcagvAUPHbhIMUNfGvW-3XI
// //  "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY"
// //  AIzaSyBjn7kdkVnqf_K6MfQgOJmkmdYjVXelCR4

// });