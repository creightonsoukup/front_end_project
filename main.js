



//function recAreas =
//on click
//choose seclect region
//choose selected types
$(document).ready(function() {
   $('select').material_select();
 });

 var latAndLong = [{
   region: "westernCO",
   latitude : 39.6403,
   longitude : -106.3742
 }]

 var activityId = {
   hiking : 14,
   biking : 5,
   camping: 9,
   fishing: 11,
   climbing: 7
 }
//Gets checked values
 $("button").on('click', function(event) {
   event.preventDefault();
   $.ajax({
       url: "https://api.instagram.com/oauth/authorize/?client_id=ccb70a484a5a46198e08d7f50d38ee5e&redirect_uri=REDIRECT-URI&response_type=token",
       error: function(err) {
             console.error(err)
         },
       method: 'GET',
       success: function(data) {

       })
   var activities = []
   var checkbox = $("input[type='checkbox']")
   for (var i = 0; i < checkbox.length; i++) {
     if ($(checkbox[i]).is(":checked")) {
       activities.push($(checkbox[i]).attr("id"))
     }
   }
   console.log(activities)
   var selectedActivities = []
   for (var i = 0; i < activities.length; i++) {
     selectedActivities[i] = activityId["" + activities[i] + ""]
   }
   activitiesURL = "&activity=" + selectedActivities.join()
   console.log(activitiesURL)

   var location= $("#location").val()
   var lat= ""
   var long= ""
   for (var i = 0; i < latAndLong.length; i++) {
     if (latAndLong[i].region === location) {
       lat = latAndLong[i].latitude
       long = latAndLong[i].longitude
     }
   }
   var locationURL= "&latitude="+lat+"&longitude="+long
   console.log(locationURL)

   var recUrl= "https://ridb.recreation.gov/api/v1/recareas.json/?apikey=B368A0DCB12648F49E468F0E0391665D&state=co" + locationURL + activitiesURL
   console.log(recUrl)
   $.ajax({
       url: recUrl,
       error: function(err) {
             console.error(err)
         },
       method: 'GET',
       success: function(data) {

           for (var i = 0; i < data.RECDATA.length; i++) {
         //create card
         $(".cards").append(
           $("<div/>", {'class':'row'}).append(
             $("<div/>", {'class':'col s12 m7'}).append(
               $("<div/>", {'class':'card'}).append(
                 $("<div/>", {'class':'card-image'}).append(
                   $("<img/>", {'src':'http://lorempixel.com/400/200/'}),
                   $("<span/>", {"class":"card-title","text":""+data.RECDATA[i].RecAreaName+""})
                 )
               ).append(
                 $("<div/>", {'class':'card-content'}).append(
                   $("<p/>", {'text':""+data.RECDATA[i].RecAreaDescription.replace(/<\/?A[^>]*>/g, "").replace(/<\/?a[^>]*>/g, "")+""})
                 )
               ).append(
                 $("<div/>", {'class':'card-action'}).append(
                   $("<a/>", {'href':'#','text':'This is a link'})
                 )
               )
             )
           )
         )
       }
       }
     })
 })



// var activities = []
// function getActivities () {
//   if ($("input[type='checkbox']").is(":checked")) {
//     activities.push($(this).val())
//   }
//   return activities
// }
//
// $("#submit").on('click', function () {
//   getActivities()
//   console.log(activities)
// })
//
//
// console.log(activities)
