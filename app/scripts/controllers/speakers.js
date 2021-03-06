'use strict';

/**
 * @ngdoc function
 * @name gmicnycApp.controller:SpeakersCtrl
 * @description
 * # SpeakersCtrl
 * Controller of the gmicnycApp
 */
angular.module('gmicnycApp')
  .controller('SpeakersCtrl', ['$scope','$rootScope','$timeout','DreamFactory', function ($scope,$rootScope,$timeout,DreamFactory) {
    var req = {
      table_name: 'NycSessions',
      related: 'Speakers_by_NycSessionSpeakers,Speakers_by_NycSessionModerators'
    };

    $scope.loaded = false;
    $scope.speakers = [];
    var tempData = [];
    var uniqueSpeakers = [];
    $scope.$on('api:ready', function() {
      $rootScope.apiReady = true;
      $scope.$broadcast('getSpeakers');
    });
    var getSpeakers = function() {
      DreamFactory.api.db.getRecords(req,
        function(data) {
          $scope.loaded = true;
          tempData = data.record;
          tempData.forEach(function(element,index,array) {
            $scope.speakers = $scope.speakers.concat(element.Speakers_by_NycSessionSpeakers);
            $scope.speakers = $scope.speakers.concat(element.Speakers_by_NycSessionModerators);
          });
          $scope.speakers.forEach(function(element,index,array) {
            if (uniqueSpeakers.indexOf(element.SpeakerId) >= 0) {
              $scope.speakers.splice(index,1);
            }
            else {
              uniqueSpeakers.push(element.SpeakerId);
            }
          });
        },
        function(error) {
          console.log(error);
          $timeout(getSpeakers, 2000);
        }
      );
    };

    $scope.$on('getSpeakers', function() {
      getSpeakers();
    });

    if (!$scope.loaded && $rootScope.apiReady) {
      getSpeakers();
    }

    $scope.currentSpeaker = -1;
    $scope.setDialog = function() {
      $scope.currentSpeaker = this.speaker.SpeakerId;
    };
    $scope.convertName = function(name) {
      if (name) {
        return name.replace(/\s+/g, '-').toLowerCase();
      }
    };
  }]);
