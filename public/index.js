'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];




var testReduction = function(diffDays)
{
  if(diffDays>10)
    {
      return 0.5;
    }
    else
    {
      if(diffDays>4)
      {
        return 0.7;
      }
      else
      {
        if(diffDays>1)
          {
            return 0.9;
          }
      }
    }
  return 1;
}

var getDays = function(rentals)
{
  var debut;
  var fin;
  var diffTime;
  var diffDays;
  debut= new Date(rentals.pickupDate);
  fin = new Date(rentals.returnDate);
  diffTime=Math.abs(fin-debut);
  diffDays=Math.ceil(diffTime/(1000*60*60*24));
  return diffDays;

}



function fillPrices() {


  var pricePerDayVar;
  var pricePerKmVar;
  var duree;
  var deductible;

  for(var i=0;i<rentals.length;i++)
  {
    for(var j=0;j<cars.length;j++)
    {
      if(rentals[i].carId==cars[j].id)
      {
        pricePerKmVar=cars[j].pricePerKm;
        pricePerDayVar=cars[j].pricePerDay;

      }
    }
    duree=getDays(rentals[i]);
    deductible=duree*4*rentals[i].options.deductibleReduction;

    rentals[i].price=(rentals[i].distance*pricePerKmVar+duree*pricePerDayVar)*testReduction(duree)+deductible;

  }
}

function fillCommissions() {

  var commission;
  var duree;
  var deductible;


  for(var i=0;i<rentals.length;i++){
    duree = getDays(rentals[i]);
    deductible=duree*4*rentals[i].options.deductibleReduction;
    commission=(rentals[i].price-deductible)*0.3;
    rentals[i].commission.insurance=commission/2;
    rentals[i].commission.treasury=1*duree;
    rentals[i].commission.virtuo=commission-(rentals[i].commission.insurance)-(rentals[i].commission.treasury)+deductible;
  }

}
function fillActors(){
  var rentalPrice;
  var commission;
  var insurance;
  var treasury;
  var virtuo;
  var deductible;


  for(var i = 0;i<actors.length;i++){
    for(var j=0;j<rentals.length;j++){
      if(actors[i].rentalId==rentals[j].id){
        deductible=getDays(rentals[j])*4*rentals[j].options.deductibleReduction;
        rentalPrice=rentals[j].price;
        insurance=rentals[j].commission.insurance;
        treasury=rentals[j].commission.treasury;
        virtuo=rentals[j].commission.virtuo;
        commission=virtuo+treasury+insurance-deductible;
      }
    }
    for(j=0;j<actors[i].payment.length;j++){
      switch(actors[i].payment[j].who){
      case 'driver':
        actors[i].payment[j].amount=rentalPrice;
        break;
      case 'partner':
        actors[i].payment[j].amount=rentalPrice-commission;
        break;
      case 'insurance':
        actors[i].payment[j].amount=insurance;
        break;
      case 'treasury' :
        actors[i].payment[j].amount=treasury;
        break;
      case 'virtuo' :
        actors[i].payment[j].amount=virtuo;
        break;
      default :
        break;
    }
    }
    

  }
}



fillPrices();
fillCommissions();
fillActors();

console.log(cars);
console.log(rentals);
console.log(actors);
