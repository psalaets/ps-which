# ps-which

Find out what's in an Angular 1 app

## Installing

`bower install ps-which -D`

or

`npm install ps-which -D`

## Usage

### 1. Include ps-which

#### bower users

Load ps-which immediately after loading Angular.

```html
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/ps-which/build/ps-which.js"></script>

<!-- Load other Angular libs and your app code here -->
```

#### CommonJS users

Require ps-which immediately after requiring Angular.

```js
var angular = require('angular');
require('ps-which');

// code that uses angular here
```

### 2. Load Angular app in browser and open dev console

ps-which is always accessed through the `psWhich` global variable.

In dev console:

#### psWhich.ask(name)

Find out what `name` is and where it comes from.

`name` (string) should be the name of a

- value
- constant
- factory
- service
- directive (camelCasedName and dashed-name formats accepted)
- provider
- controller

#### psWhich.report([filter])

Print everything ps-which knows to console.

`filter` is an optional RegExp to filter modules by name. Only matching modules will be printed. Defaults to printing all modules.

#### psWhich.info

ps-which's raw data object.

## Limitations

### Angular built-ins

ps-which does not know about Angular built-ins (ngShow, $http, etc).

### Custom attributes that aren't directives

Given this directive

```js
angular.module('app').directive('foo', function() {
  return {
    restrict: 'A',
    scope: {
      fieldName: '@'
    }
  };
});
```

ps-which knows about `foo` but knows nothing about `field-name`.

## License

MIT