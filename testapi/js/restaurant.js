


/*
      var restaurants = [
        {
          coords:{lat:51.5085088,lng:-0.1016101},
          content:'<h1>Young Founder Arms</h1>'
        },
        {
          coords:{lat:51.504387,lng:-0.1001269},
          content:'<h1>Wagamama Bankside</h1>'
        },
      ];
*/




let restaurants = [{
    "name": "Young Founder Arms",
    "address": "52 Hopton St, London SE1 9JH, UK",
          coords:{lat:51.5085088,lng:-0.1016101},
          content:'<h1>Young Founder Arms</h1>',
    "ratings": [{
        "stars": 4,
        "comment": "Great! But not many veggie options."
      },
      {
        "stars": 5,
        "comment": "My favorite restaurant!"
      }
    ]
  },
  {
    "name": "Wagamama Bankside",
    "address": "20 Sumner St, London SE1 9JZ, UK",
          coords:{lat:51.504387,lng:-0.1001269},
          content:'<h1>Wagamama Bankside</h1>',
    "ratings": [{
        "stars": 5,
        "comment": "Tiny pizzeria next to Sacre Coeur!"
      },
      {
        "stars": 3,
        "comment": "Meh, it was fine."
      }
    ]
  }
]

function averageRestaurantReview(arrRatingsData) {

  let total = 0;
  for (var i = 0; i < arrRatingsData.length; i++) {
    total += arrRatingsData[i].stars;


  }
  return total / arrRatingsData.length

}


for (let i = 0; i < restaurants.length; i++) {
  
  //alert(restaurants[i].name)
  //alert(restaurant[i])
  //alert(averageRestaurantReview(restaurant[i].ratings))
  //alert(restaurants.ratings)


}

//alert(restaurants.name)
$('.restaurant_1').html(restaurants[0].name+' - '+'Rating: '+averageRestaurantReview(restaurants[0].ratings));
$('.restaurant_2').html(restaurants[1].name+' - '+'Rating: '+averageRestaurantReview(restaurants[1].ratings));










/*

let restaurant = [{
    "name": "Young Founder Arms",
    "address": "52 Hopton St, London SE1 9JH, UK",
    "lat": 51.5085088,
    "long": -0.1016101,
    "ratings": [{
        "stars": 4,
        "comment": "Great! But not many veggie options."
      },
      {
        "stars": 5,
        "comment": "My favorite restaurant!"
      }
    ]
  },
  {
    "name": "Wagamama Bankside",
    "address": "20 Sumner St, London SE1 9JZ, UK",
    "lat": 51.504387,
    "long": -1.32988,
    "ratings": [{
        "stars": 5,
        "comment": "Tiny pizzeria next to Sacre Coeur!"
      },
      {
        "stars": 3,
        "comment": "Meh, it was fine."
      }
    ]
  }
]

function averageRestaurantReview(arrRatingsData) {

  let total = 0;
  for (var i = 0; i < arrRatingsData.length; i++) {
    total += arrRatingsData[i].stars;
     
   
  }
 return total/arrRatingsData.length
}

for (let i = 0; i<restaurant.length; i++){
  //alert(restaurant[i])
  alert(averageRestaurantReview(restaurant[i].ratings))
  
}
//alert(averageRestaurantReview(restaurant[0].ratings))


*/




