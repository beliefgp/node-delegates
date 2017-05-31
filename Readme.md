
# delegates2

  Node method and accessor delegation utilty.

## Installation

```
$ npm install delegates2
```

## Example

```js
var delegator = require('delegates2');

...
delegator
  .delegate(proto, 'request')
  .method('acceptsLanguages', 'languages')
  .method('is')
  .access('url')
  .access('querystring', 'qs')
  .getter('ip')
```

# API

## new Delegate(proto, prop)

Creates a delegator instance used to configure using the `prop` on the given
`proto` object. (which is usually a prototype).

`prop` support multi level string and object.

```js
const obj = {
  request: {
    url: {
      query: function(){
        return this === obj.request.url;
      }
    }
  }
};
const source = {
  response: {
    header: {
      type: function(){
        return this === source.response.header;
      }
    }
  }
};

delegator
  .delegate(obj, 'request.url')

delegator
  .delegate(obj, source.response)

```

## Delegate.delegate(proto, target)

Delegates getters, setters, values, and methods from target to proto.

## Delegate.auto(proto, target)

Delegates all getters, setters, values, and methods from target to proto.

## Delegate#method(name[, targetName])

Allows the given method `name` to be accessed on the host.    
You can set the `targetName`, specitying then method name, default `name`. 

```js
delegator
  .delegate(obj, 'request.url')
  .method('query', 'qs');

obj.qs() // true
```

## Delegate#getter(name[, targetName])

Creates a "getter" for the property with the given `name` on the delegated
object.

## Delegate#setter(name[, targetName])

Creates a "setter" for the property with the given `name` on the delegated
object.

## Delegate#access(name[, targetName])

Creates an "accessor" (ie: both getter *and* setter) for the property with the
given `name` on the delegated object.

## Delegate#fluent(name[, targetName])

A unique type of "accessor" that works for a "fluent" API. When called as a
getter, the method returns the expected value. However, if the method is called
with a value, it will return itself so it can be chained. For example:

```js
delegate(proto, 'request.url')
  .fluent('query')

// getter
var q = request.query();

// setter (chainable)
request
  .query({ a: 1 })
  .query({ b: 2 });
```

# License

  MIT
