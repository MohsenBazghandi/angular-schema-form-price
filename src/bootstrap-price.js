angular.module('schemaForm').config(
  ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
    function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

      var price = function (name, schema, options) {
        if (schema.type === 'string' && (schema.format === 'price')) {
          var f = schemaFormProvider.stdFormObj(name, schema, options);
          f.key = options.path;
          f.type = 'price';
          options.lookup[sfPathProvider.stringify(options.path)] = f;
          return f;
        }
      };

      schemaFormProvider.defaults.string.unshift(price);

      //Add to the bootstrap directive
      schemaFormDecoratorsProvider.addMapping(
        'bootstrapDecorator',
        'price',
        'directives/decorators/bootstrap/price/price.html'
      );
      schemaFormDecoratorsProvider.createDirective(
        'price',
        'directives/decorators/bootstrap/price/price.html'
      );
    }
  ]);
