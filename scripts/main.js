//function recAreas =
//on click
//choose seclect region
//choose selected types
$(document).ready(function() {
    $('select').material_select();
});

var currentRecArea = ""



var activityId = {
        hiking: 14,
        biking: 5,
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

    var selectedActivities = []
    for (var i = 0; i < activities.length; i++) {
        selectedActivities[i] = activityId["" + activities[i] + ""]
    }
    activitiesURL = "&activity=" + selectedActivities.join()


    var location = $("#location").val()
    var lat = ""
    var long = ""
    for (var i = 0; i < latAndLong.length; i++) {
        if (latAndLong[i].region === location) {
            lat = latAndLong[i].latitude
            long = latAndLong[i].longitude
        }
    }
    var locationURL = "&latitude=" + lat + "&longitude=" + long


    var recUrl = "https://ridb.recreation.gov/api/v1/recareas.json/?apikey=B368A0DCB12648F49E468F0E0391665D&state=co" + locationURL + activitiesURL
    console.log(recUrl)
    $.get(recUrl)
        .then(function(data) {
            makeCards(data)
        }).then(function(cards) {

            $("html,body").animate({
                scrollTop: $(".cards").offset().top
            }, 2000);

            $(".more-info").click(function() {
                var directions = $(this).prev()
                directions.toggle()
                return $(this).

            })
            .then (function(data) {
                $.get("")
            }
        })
        .catch(function(err) {
            console.error(err)
        })


})

function makeCards(data) {

    for (var i = 0; i < data.RECDATA.length; i++) {

        if (i != 0 && data.RECDATA[i].RecAreaName === data.RECDATA[i - 1].RecAreaName) {
            continue
        }
        $(".cards").append(
            $("<div/>", {
                'class': 'row'
            }).append(
                $("<div/>", {
                    'class': 'col s6 offset-s3'
                }).append(
                    $("<div/>", {
                        'class': 'card blue-grey darken-1'
                    }).append(
                        $("<div/>", {
                            'class': 'card-content white-text'
                        }).append(
                            $("<span/>", {
                                "class": "card-title amber-text",
                                "text": "" + data.RECDATA[i].RecAreaName + ""
                            }),
                            $("<p/>", {
                                'text': "" + data.RECDATA[i].RecAreaDescription.replace(/<\/?A[^>]*>/g, "").replace(/<\/?a[^>]*>/g, "") + ""
                            })
                        )
                    ).append(
                        $("<div/>", {
                            "class": 'card-content white-text directions'
                        }).append(
                            $("<span/>", {
                                "class": "card-title amber-text",
                                "text": 'Directions'
                            }),
                            $("<p/>", {
                                'text': "" + data.RECDATA[i].RecAreaDirections
                            })
                        ).hide()
                    ).append(
                        $("<div/>", {
                            'class': 'card-action more-info'
                        }).append(
                            $("<button/>", {
                                'class': 'more-info btn waves-effect waves-light',
                                'text': 'More Info'
                            })
                        )
                    )
                )
            )
        )
    }
}

function flikrUrl () {

}

//  $("#card").on('click', function(event) {
//    $(this).toggleClass("active")
//
//  }).then function (data)
//
// console.log(data.RECDATA[1].RecAreaName)
