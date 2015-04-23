angular.module('loc8rApp', []);

var formatDistance = function() {
  return function(distance) {
    var numDistance, unit;
    if (distance > 1) {
      numDistance = parseFloat(distance).toFixed(1);
      unit = 'km';
    } else {
      numDistance = parseInt(distance * 1000,10);
      unit = 'm';
    }
    return numDistance + unit;
  };
};

var ratingStars = function() {
  return {
    scope: {
      thisRating : '=rating'
    },
    templateUrl : '/angular/rating-stars.html'
  };
};

var geolocation = function() {
  var getPosition = function(cbSuccess, cbError, cbNoGeo) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    } else {
      cbNoGeo();
    }
  };
  return {
    getPosition : getPosition
  };
};

var locationListCtrl = function($scope, $http, loc8rData, geolocation) {
  $scope.message = "Checking your location";
  $scope.message2 = "Checking your location";

  $scope.getData = function(position) {
    var lat = position.coords.latitude,
        lng = position.coords.longitude;
    $scope.message = "Searching for nearby places";
    // $scope.message2 = "Latitude: " + lat.toFixed(6) + ", Longitude: " + lng.toFixed(6);
    $scope.Glat = lat;
    $scope.Glng = lng;
    /* Need to bring this into controller properly, not async! */
    $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=false")
      .success(function(response) {
        var formattedaddress = response.results[0].formatted_address;
        $scope.useraddress = formattedaddress;
      });
    loc8rData.locationByCoords(lat, lng)
      .success(function(data) {
        $scope.message = data.length > 0 ? "" : "No locations found nearby";
        $scope.data = { locations: data };
      })
      .error(function(e) {
        $scope.message = "Sorry, something's gone wrong";
      });
  };

  $scope.showError = function(error) {
    $scope.$apply(function() {
      $scope.message = error.message;
    });
  };

  $scope.noGeo = function() {
    $scope.$apply(function() {
      $scope.message = "Geolocation not supported by this browser.";
    });
  };

  geolocation.getPosition($scope.getData,$scope.showError,$scope.noGeo);
};

var loc8rData = function($http) {
  var locationByCoords = function(lat, lng) {
    return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=200');
  };
  return {
    locationByCoords : locationByCoords
  };
};

angular
  .module('loc8rApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('loc8rData', loc8rData)
  .service('geolocation', geolocation);
