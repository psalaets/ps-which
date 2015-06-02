# Change Log

All notable changes to this project will be documented in this file.

## [1.3.0] - 2015-06-01
### Added

- `psWhich.ask()` will also match provider names with the "Provider" suffix

Given this provider definition

```js
angular.module('app').provider('foo', provider);
```

Both `psWhich.ask('foo')` and `psWhich.ask('fooProvider')` will result in

```js
'provider in app'
```

## [1.2.2] - 2015-05-25
### Fixed

- Wasn't recording any info about controllers
- Wasn't exposing `psWhich` global variable in CommonJS environments

## [1.2.1] - 2015-05-20
### Changed

- Docs fix

## [1.2.0] - 2015-05-20
### Added

- `psWhich.report()` accepts optional RegExp to filter modules reported

### Changed

- `psWhich.report()` no longer prints a heading for types that are empty
- `psWhich.report()` prints `(empty)` if module has nothing

## [1.1.0] - 2015-05-15
### Added

- `psWhich.ask()` will also match directive names in dashed format (e.g. my-directive will match myDirective).

## [1.0.0] - 2015-05-15
### Added

- Prints Angular modules and their types to console
- Look up Angular type by name
- Initial impl
