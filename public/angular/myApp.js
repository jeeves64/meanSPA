var myController = function($scope, $http) {
  $scope.myInput = "world!";
  $http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=54.1456123,10.413456&sensor=false")
    .success(function(response) {
      var formattedaddress = response.results[0].formatted_address;
      $scope.useraddress = formattedaddress;
    });
};

// var getAddress = function($scope, $http) {
//   $http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=54.1456123,10.413456&sensor=false")
//     .success(function(response) {
//       var formattedaddress = response.results[0].formatted_address;
//       $scope.useraddress = formattedaddress;
//     });
// };

angular
  .module('myApp', [])
  .controller('myController', myController);