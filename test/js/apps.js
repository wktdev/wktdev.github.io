var map;

function handleSearchResults(results, status) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {

        for (var i = 0; i < results.length; i++) {
            var marker = new google.maps.Marker({
                //typo: it must be location not Location
                position: results[i].geometry.location,
                map: map,
                icon: results[i].icon
            });
        }
    }

}

function performSearch() {

    var request = {
        bounds: map.getBounds(),
        name: "McDonald's"
    };

    var service = new google.maps.places.PlacesService(map);
    //use only the name of the function as callback-argument
    service.nearbySearch(request, handleSearchResults);

}

function initialize(location) {
    var myLatlng = new google.maps.LatLng(location.coords.latitude, 
                                          location.coords.longitude);

    var mapOptions = {
        center: myLatlng,
        zoom: 9
    };
    //removed the var-keyword(otherwise map is not global accessible)
    map = new google.maps.Map(document.getElementById("map"), 
                              mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: "My place"
    });
    //again: use only the name of the function as callback-argument
    service = new google.maps.event.addListenerOnce(map, 
                                                    'bounds_changed', 
                                                     performSearch);
}



$(document).ready(function () {
    navigator.geolocation.getCurrentPosition(initialize);
});
//google.maps.event.addDomListener(window, 'load', initialize);
/*





      	        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {

              var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude     
              };

              infoWindow.setPosition(pos);
              infoWindow.setContent('Location found.');
              map.setCenter(pos);


    })
  }

  infoWindow = new google.maps.InfoWindow({ map: map });



      	  let service = new google.maps.places.PlacesService(map);

      	  







            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
            });
        }


        */