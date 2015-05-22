# ps-which

Find out what's in an Angular 1 app

## Installing

`bower install ps-which -D`

or

`npm install ps-which -D`

## Usage

### 1. Initialize ps-which right after Angular

#### bower users

Include ps-which before loading any other code that uses Angular.

```html
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/ps-which/build/ps-which.js"></script>
<!-- Load other Angular libs and your app code here -->
```

#### CommonJS users

Before requiring any other Angular-related libs do:

```js
var angular = require('angular');
require('ps-which');
```

### 2. Load Angular app in browser and open dev console

In dev console:

#### psWhich.ask(name)

Find out what `name` is and where it comes from.

`name` (string) should be the name of a

- value
- constant
- factory
- service
- directive (camelCasedName or dashed-name formats accepted)
- provider

#### psWhich.report([filter])

Print everything psWhich knows to console.

filter is an optional RegExp to filter modules by name. Only matching modules will be printed. Defaults to printing all modules.

#### psWhich.info

psWhich's raw data object.

## License

MIT