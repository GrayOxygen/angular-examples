(function() {

    'use strict';

    angular.module('common.fullscreen', [])

    .factory('Fullscreen', ['$document', function ($document) {
        var document = $document[0];

        return {
            all: function() {
                this.enable(document.documentElement);
            },

            enable: function(element) {
                if(element.requestFullScreen) {
                    element.requestFullScreen();
                } else if(element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if(element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                }
            },

            cancel: function() {
                if(document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if(document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if(document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            },

            isEnabled: function(){
                var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
                return fullscreenElement;
            }
        };
    }])

    .directive('fullscreen', ['Fullscreen', function(Fullscreen) {
        return {
            link: function ($scope, $element, $attrs) {
                if ($attrs.fullscreen) {
                    $scope.$watch($attrs.fullscreen, function(value) {
                        var isEnabled = Fullscreen.isEnabled();
                        if (value && ! isEnabled) {
                            Fullscreen.enable($element[0]);
                        } else if ( ! value && isEnabled) {
                            Fullscreen.cancel();
                        }
                    });
                }

                $element.on('click', function (ev) {
                    Fullscreen.enable($element[0]);
                });
            }
        };
    }]);

})();
