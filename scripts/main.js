$(document).ready(function() {

    $('select').material_select();

});
// //$(".moreinfo").on('click',".slider", function() {
//     $(this).slider()
// })

var currentRecArea = ""
var selectedRecArea = ""



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
    $.get(recUrl)
        .then(function(data) {
            $('.removecards').remove()
            makeCards(data)
        }).then(function(cards) {

            $("html,body").animate({
                scrollTop: $(".cards").offset().top
            }, 2000);
            $("form")[0].reset()
            $(".more-info").on('click', (function() {

                var directions = $(this).prev()
                directions.toggle()
                selectedRecArea = $(this).attr("id")
                selectedRecAreaUrl = "&tags=" + selectedRecArea.split(" ").join("+")


                photoURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3ffd3415340ed60a1dcd3548c3790329&format=json&nojsoncallback=1" + selectedRecAreaUrl
                $.get(photoURL)
                    .then(function photoCarousel(data) {

                        var photos = []
                        for (var i = 0; i < 10; i++) {
                            photos.push({
                                farmid: data["photos"]["photo"][i]["farm"],
                                serverid: data["photos"]["photo"][i]["server"],
                                photoid: data["photos"]["photo"][i]["id"],
                                secret: data["photos"]["photo"][i]["secret"]
                            })
                        }
                        var img1 = 'https://farm' + photos[0].farmid + '.staticflickr.com/' + photos[0].serverid + '/' + photos[0].photoid + '_' + photos[0].secret + '.jpg'
                        var img2 = 'https://farm' + photos[1].farmid + '.staticflickr.com/' + photos[1].serverid + '/' + photos[1].photoid + '_' + photos[1].secret + '.jpg'
                        var img3 = 'https://farm' + photos[2].farmid + '.staticflickr.com/' + photos[2].serverid + '/' + photos[2].photoid + '_' + photos[2].secret + '.jpg'
                        var img4 = 'https://farm' + photos[3].farmid + '.staticflickr.com/' + photos[3].serverid + '/' + photos[3].photoid + '_' + photos[3].secret + '.jpg'
                        var img5 = 'https://farm' + photos[4].farmid + '.staticflickr.com/' + photos[4].serverid + '/' + photos[4].photoid + '_' + photos[4].secret + '.jpg'
                        var img6 = 'https://farm' + photos[5].farmid + '.staticflickr.com/' + photos[5].serverid + '/' + photos[5].photoid + '_' + photos[5].secret + '.jpg'
                        var img7 = 'https://farm' + photos[6].farmid + '.staticflickr.com/' + photos[6].serverid + '/' + photos[6].photoid + '_' + photos[6].secret + '.jpg'
                        var img8 = 'https://farm' + photos[7].farmid + '.staticflickr.com/' + photos[7].serverid + '/' + photos[7].photoid + '_' + photos[7].secret + '.jpg'
                        var img9 = 'https://farm' + photos[8].farmid + '.staticflickr.com/' + photos[8].serverid + '/' + photos[8].photoid + '_' + photos[8].secret + '.jpg'
                        var img10 = 'https://farm' + photos[9].farmid + '.staticflickr.com/' + photos[9].serverid + '/' + photos[9].photoid + '_' + photos[9].secret + '.jpg'
                        $(".photo").append($("<div/>", {
                            "class": "slider"
                        }).append(
                            $("<ul/>", {
                                "class": "slides"
                            }).append(
                                $("<li/>").append(
                                    $("<img/>", {
                                        "src": "" + img1 + ""
                                    })
                                )

                            ).append(
                                $("<li/>").append(
                                    $("<img/>", {
                                        "src": "" + img2 + ""
                                    })
                                )
                            ).append(
                                $("<li/>").append(
                                    $("<img/>", {
                                        "src": "" + img3 + ""
                                    })
                                )
                            ).append(
                                $("<li/>").append(
                                    $("<img/>", {
                                        "src": "" + img4 + ""
                                    })
                                )
                            )))

                      $('.slider').slider();
                    })

            }))
        })

    .catch(function(err) {
        console.log(error)
    })


})


function makeCards(data) {

    for (var i = 0; i < data.RECDATA.length; i++) {

        if (i != 0 && data.RECDATA[i].RecAreaName === data.RECDATA[i - 1].RecAreaName) {
            continue
        }
        $(".cards").append(
            $("<div/>", {
                'class': 'row removecards',
            }).append(
                $("<div/>", {
                    'class': 'col s8 offset-s2'
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
                            }),
                            $("<span/>", {
                                "class": "card-title amber-text",
                                "text": 'Photos'
                            }),
                            $("<div/>", {
                                "class": "photo"
                            })

                        ).hide()
                    ).append(
                        $("<div/>", {
                            'class': 'card-action more-info'
                        }).append(
                            $("<button/>", {
                                'class': 'more-info btn waves-effect waves-light',
                                'text': 'More Info',
                                "id": "" + data.RECDATA[i].RecAreaName + ""

                            })
                        )
                    )
                )
            )
        )
    }
}
