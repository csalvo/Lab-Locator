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
})