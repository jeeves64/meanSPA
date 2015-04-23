(function () {
  
  angular
    .module('loc8rApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'loc8rData', 'geolocation'];
  function homeCtrl ($scope, loc8rData, geolocation) {
    var vm = this;
    vm.pageHeader = {
      title: 'meanSPA',
      strapline: 'Start building some apps!'
    };
    vm.sidebar = {
      content: "meanSPA is a basis for Single Page Applications built upon the MEAN stack"
    };
    vm.message = "Checking your location";

    vm.getData = function(position) {
      var lat = position.coords.latitude,
          lng = position.coords.longitude;
      vm.message = "Searching for nearby places";
      loc8rData.locationByCoords(lat, lng)
        .success(function(data) {
          vm.message = data.length > 0 ? "" : "No locations found nearby";
          vm.data = { locations: data };
        })
        .error(function(e) {
          vm.message = "Sorry, something's gone wrong";
        });
    };

    vm.showError = function(error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

    vm.noGeo = function() {
      $scope.$apply(function() {
        vm.message = "Geolocation not supported by this browser.";
      });
    };

    geolocation.getPosition(vm.getData,vm.showError,vm.noGeo);
  }

})();