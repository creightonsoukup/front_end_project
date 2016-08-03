



//function recAreas =
//on click
//choose seclect region
//choose selected types
$(document).ready(function() {
   $('select').material_select();
 });

 var latAndLong = [{
   region: "fort collins",
   latitude : 40.5853,
   longitude : -105.0844
 },{
   region: "boulder",
   latitude : 40.0150,
   longitude : -105.2705
 },{
   region: "denver metro",
   latitude : 39.7392,
   longitude : -104.9903
 },{
   region: "colorado springs",
   latitude : 38.8339,
   longitude : -104.8214
 },{
   region: "pueblo",
   latitude : 38.2544,
   longitude : -104.6091
 },{
   region: "south central",
   latitude : 37.5551,
   longitude : -105.2664
 },{
   region: "central mountains",
   latitude : 39.3530,
   longitude : -106.3870
 },{
   region: "north west",
   latitude :40.4737,
   longitude : -107.4307
 },{
   region: "west central",
   latitude : 39.1744,
   longitude : -108.2217
 },{
   region: "south west",
   latitude : 37.5638,
   longitude : -107.4087
 },{
   region: "north east",
   latitude : 40.5573,
   longitude : -103.1680
 },{
   region: "south east",
   latitude : 37.8238,
   longitude : -103.2634
 },]

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
            console.log(data.RECDATA[i].RecAreaName)
          }
         //create card
         for (var i = 0; i < data.RECDATA.length; i++) {

           if (i != 0 && data.RECDATA[i].RecAreaName === data.RECDATA[i-1].RecAreaName) {
             continue
           }
         $(".cards").append(
           $("<div/>", {'class':'row'}).append(
             $("<div/>", {'class':'col s6 offset-s3'}).append(
               $("<div/>", {'class':'card blue-grey darken-1'}).append(
                 $("<div/>", {'class':'card-content white-text'}).append(
                   $("<span/>", {"class":"card-title","text":""+data.RECDATA[i].RecAreaName+""}),
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
