angular.module('schemaForm').directive('price', ['$filter', price]);

/** @ngInject */
function price ($filter) {
  return {
    restrict: 'A',
    require: 'ngModel',
    replace: true,
    link: function (scope, element, attrs, ngModel) {
      ngModel.$options = ngModel.$options.createChild({
        updateOn: 'default',
        updateOnDefault: true,
        debounce: {
          'default': 0
        }
      });
      var onlyDigits = function (value) {
        var digits = angular.isUndefined(value) ? '' : value.replace(/[^0-9]/g, '');
        ngModel.$setViewValue(digits.length ? $filter('number')(digits) : undefined);
        ngModel.$render();
        return digits;
      };
      ngModel.$parsers.push(onlyDigits);

      var separateDigits = function (value) {
        return angular.isUndefined(value) ? undefined : $filter('number')(value);
      };
      ngModel.$formatters.push(separateDigits);
    }
  };
}

