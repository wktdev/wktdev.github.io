
// Google Places:  AIzaSyD6fnA65NMlol_YA5IiWH5k7Hh4eTwsZNM
/*

https://stackoverflow.com/questions/39329874/googlemaps-api-key-for-localhost


*/




function initMap(){

  const userLocation = {lat:51.5074,lng:-0.1278}                   // UserLocation....get with Geolocation


      // Map options
      var options = {
        zoom:12,
        center:userLocation                                       // Set as "center"
      }

      // New map
      var map = new google.maps.Map(document.getElementById('map'), options);




      for(var i = 0;i < restaurants.length;i++){

        addMarker(restaurants[i]);
      }


     //_________________________________________________________________________BEGIN main code to get restaurants

      var service = new google.maps.places.PlacesService(map);    // create new Google Places instance

      service.nearbySearch( 
        {
          location: userLocation,                                // userLocation is set above
          radius: 500, type: ['store']}, 
          function(results, status, pagination) {
             if (status !== 'OK') return;

            console.log(results)
      });
 
      //_________________________________________________________________________END main code to get restaurants



      function addMarker(props){
        var marker = new google.maps.Marker({
          position:props.coords,
          map:map,

        });


        if(props.content){
          var infoWindow = new google.maps.InfoWindow({
            content:props.content
          });

          marker.addListener('click', function(){
            infoWindow.open(map, marker);
          });
        }
      }
    }



