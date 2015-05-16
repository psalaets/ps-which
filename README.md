# ps-which

Find out what's in an Angular 1 app

## Installing

`bower install ps-which -D`

## Usage

### 1. Initialize psWhich right after Angular

#### bower users

Include ps-which before loading any other code that uses Angular.

```html
<script src="angular.js"></script>
<script src="ps-which.js"></script>

<script src="third-party-module.js"></script>
<script src="app.js"></script>
```

#### CommonJS users

Before requiring any other Angular-related libs do:

```js
var angular = require('angular');
require('ps-which');
```

### 2. Load Angular app in browser and open dev console

In dev console:

#### psWhich.ask('name')

Find out what name is and where it comes from.

#### psWhich.report()

Print everything psWhich knows to console.

#### psWhich.info

psWhich's raw data object.

## License

MIT