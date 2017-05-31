require('should');
const assert = require('assert');
const delegate = require('..');

describe('.method(name)', function(){
  it('one level, use self property', function(){
    const obj = {};

    obj.request = {
      foo: function(bar){
        assert(this == obj.request);
        return bar;
      }
    };

    delegate
      .delegate(obj, 'request')
      .method('foo');

    obj.foo('something').should.equal('something');
  });

  it('multi level, use self property', function(){
    const obj = {};

    obj.request = {
      url:{
        foo: function(bar){
          assert(this == obj.request.url);
          return bar;
        }
      }
    };

    delegate
      .delegate(obj, 'request.url')
      .method('foo');

    obj.foo('something').should.equal('something');
  });

  it('one level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        foo: function(bar){
          assert(this == source.request);
          return bar;
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .method('foo');

    obj.foo('something').should.equal('something');
  });

  it('multi level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        url: {
          foo: function(bar){
            assert(this == source.request.url);
            return bar;
          }
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .method('url.foo');

    obj.url.foo('something').should.equal('something');
  });
});

describe('.method(name, targetName)', function(){
  it('one level, use self property', function(){
    const obj = {};

    obj.request = {
      foo: function(bar){
        assert(this == obj.request);
        return bar;
      }
    };

    delegate
      .delegate(obj, 'request')
      .method('foo', 'oof');

    obj.oof('something').should.equal('something');
  });

  it('multi level, use self property', function(){
    const obj = {};

    obj.request = {
      url:{
        foo: function(bar){
          assert(this == obj.request.url);
          return bar;
        }
      }
    };

    delegate
      .delegate(obj, 'request.url')
      .method('foo', 'oof');

    obj.oof('something').should.equal('something');
  });

  it('one level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        foo: function(bar){
          assert(this == source.request);
          return bar;
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .method('foo', 'oof');

    obj.oof('something').should.equal('something');
  });

  it('multi level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        url: {
          foo: function(bar){
            assert(this == source.request.url);
            return bar;
          }
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .method('url.foo', 'oof');

    obj.oof('something').should.equal('something');
  });
});

describe('.getter(name)', function(){
  it('one level, use self property', function(){
    const obj = {};
    obj.request = {
      get foo(){
        return 'something';
      }
    };

    delegate
      .delegate(obj, 'request')
      .getter('foo');

    obj.foo.should.equal('something');
  });

  it('multi level, use self property', function(){
    const obj = {};

    obj.request = {
      url:{
        get foo(){
          return 'something';
        }
      }
    };

    delegate
      .delegate(obj, 'request.url')
      .getter('foo');

    obj.foo.should.equal('something');
  });

  it('one level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        get foo(){
          return 'something';
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .getter('foo');

    obj.foo.should.equal('something');
  });

  it('multi level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        url: {
          get foo(){
            return 'something';
          }
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .getter('url.foo');

    obj.url.foo.should.equal('something');
  });
});

describe('.getter(name, targetName)', function(){
  it('one level, use self property', function(){
    const obj = {};
    obj.request = {
      get foo(){
        return 'something';
      }
    };

    delegate
      .delegate(obj, 'request')
      .getter('foo', 'oof');

    obj.oof.should.equal('something');
  });

  it('multi level, use self property', function(){
    const obj = {};

    obj.request = {
      url:{
        get foo(){
          return 'something';
        }
      }
    };

    delegate
      .delegate(obj, 'request.url')
      .getter('foo', 'oof');

    obj.oof.should.equal('something');
  });

  it('one level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        get foo(){
          return 'something';
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .getter('foo', 'oof');

    obj.oof.should.equal('something');
  });

  it('multi level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        url: {
          get foo(){
            return 'something';
          }
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .getter('url.foo', 'oof');

    obj.oof.should.equal('something');
  });
});

describe('.setter(name)', function(){
  it('one level, use self property', function(){
    const obj = {};
    obj.request = {
      get foo() {
        return this._foo.toUpperCase();
      },

      set foo(val) {
        this._foo = val;
      }
    };

    delegate
      .delegate(obj, 'request')
      .setter('foo');

    obj.foo = 'something';
    obj.request.foo.should.equal('SOMETHING');
  });

  it('multi level, use self property', function(){
    const obj = {};

    obj.request = {
      url:{
        get foo() {
          return this._foo.toUpperCase();
        },

        set foo(val) {
          this._foo = val;
        }
      }
    };

    delegate
      .delegate(obj, 'request.url')
      .setter('foo');

    obj.foo = 'something';
    obj.request.url.foo.should.equal('SOMETHING');
  });

  it('one level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        get foo() {
          return this._foo.toUpperCase();
        },

        set foo(val) {
          this._foo = val;
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .setter('foo');

    obj.foo = 'something';
    source.request.foo.should.equal('SOMETHING');
  });

  it('multi level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        url: {
          get foo() {
            return this._foo.toUpperCase();
          },

          set foo(val) {
            this._foo = val;
          }
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .setter('url.foo');

    obj.url.foo = 'something';
    source.request.url.foo.should.equal('SOMETHING');
  });
});

describe('.setter(name, targetName)', function(){
  it('one level, use self property', function(){
    const obj = {};
    obj.request = {
      get foo() {
        return this._foo.toUpperCase();
      },

      set foo(val) {
        this._foo = val;
      }
    };

    delegate
      .delegate(obj, 'request')
      .setter('foo', 'oof');

    obj.oof = 'something';
    obj.request.foo.should.equal('SOMETHING');
  });

  it('multi level, use self property', function(){
    const obj = {};

    obj.request = {
      url:{
        get foo() {
          return this._foo.toUpperCase();
        },

        set foo(val) {
          this._foo = val;
        }
      }
    };

    delegate
      .delegate(obj, 'request.url')
      .setter('foo', 'oof');

    obj.oof = 'something';
    obj.request.url.foo.should.equal('SOMETHING');
  });

  it('one level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        get foo() {
          return this._foo.toUpperCase();
        },

        set foo(val) {
          this._foo = val;
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .setter('foo', 'oof');

    obj.oof = 'something';
    source.request.foo.should.equal('SOMETHING');
  });

  it('multi level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        url: {
          get foo() {
            return this._foo.toUpperCase();
          },

          set foo(val) {
            this._foo = val;
          }
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .setter('url.foo', 'oof');

    obj.oof = 'something';
    source.request.url.foo.should.equal('SOMETHING');
  });
});

describe('.access(name)', function(){
  it('one level, use self property', function(){
    const obj = {};
    obj.request = {
      get foo() {
        return this._foo.toUpperCase();
      },

      set foo(val) {
        this._foo = val;
      }
    };

    delegate
      .delegate(obj, 'request')
      .access('foo');

    obj.foo = 'something';
    obj.foo.should.equal('SOMETHING');
  });

  it('multi level, use self property', function(){
    const obj = {};

    obj.request = {
      url:{
        get foo() {
          return this._foo.toUpperCase();
        },

        set foo(val) {
          this._foo = val;
        }
      }
    };

    delegate
      .delegate(obj, 'request.url')
      .access('foo');

    obj.foo = 'something';
    obj.foo.should.equal('SOMETHING');
  });

  it('one level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        get foo() {
          return this._foo.toUpperCase();
        },

        set foo(val) {
          this._foo = val;
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .access('foo');

    obj.foo = 'something';
    obj.foo.should.equal('SOMETHING');
  });

  it('multi level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        url: {
          get foo() {
            return this._foo.toUpperCase();
          },

          set foo(val) {
            this._foo = val;
          }
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .access('url.foo');

    obj.url.foo = 'something';
    obj.url.foo.should.equal('SOMETHING');
  });
});

describe('.access(name, targetName)', function(){
  it('one level, use self property', function(){
    const obj = {};
    obj.request = {
      get foo() {
        return this._foo.toUpperCase();
      },

      set foo(val) {
        this._foo = val;
      }
    };

    delegate
      .delegate(obj, 'request')
      .access('foo', 'oof');

    obj.oof = 'something';
    obj.oof.should.equal('SOMETHING');
  });

  it('multi level, use self property', function(){
    const obj = {};

    obj.request = {
      url:{
        get foo() {
          return this._foo.toUpperCase();
        },

        set foo(val) {
          this._foo = val;
        }
      }
    };

    delegate
      .delegate(obj, 'request.url')
      .access('foo', 'oof');

    obj.oof = 'something';
    obj.oof.should.equal('SOMETHING');
  });

  it('one level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        get foo() {
          return this._foo.toUpperCase();
        },

        set foo(val) {
          this._foo = val;
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .access('foo', 'oof');

    obj.oof = 'something';
    obj.oof.should.equal('SOMETHING');
  });

  it('multi level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        url: {
          get foo() {
            return this._foo.toUpperCase();
          },

          set foo(val) {
            this._foo = val;
          }
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .access('url.foo', 'oof');

    obj.oof = 'something';
    obj.oof.should.equal('SOMETHING');
  });
});

describe('.fluent(name)', function(){
  it('one level, use self property', function(){
    const obj = {};
    obj.request = {
      foo: 'something'
    };

    delegate
      .delegate(obj, 'request')
      .fluent('foo');

    obj.foo().should.equal('something');
    obj.foo('nothing').should.equal(obj);
    obj.request.foo.should.equal('nothing');
  });

  it('multi level, use self property', function(){
    const obj = {};

    obj.request = {
      url:{
        foo: 'something'
      }
    };

    delegate
      .delegate(obj, 'request.url')
      .fluent('foo');

    
    obj.foo().should.equal('something');
    obj.foo('nothing').should.equal(obj);
    obj.request.url.foo.should.equal('nothing');
  });

  it('one level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        foo: 'something'
      }
    };

    delegate
      .delegate(obj, source.request)
      .fluent('foo');

    obj.foo().should.equal('something');
    obj.foo('nothing').should.equal(obj);
    source.request.foo.should.equal('nothing');
  });

  it('multi level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        url: {
          foo: 'something'
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .fluent('url.foo');

    obj.url.foo().should.equal('something');
    obj.url.foo('nothing').should.equal(obj.url);
    source.request.url.foo.should.equal('nothing');
  });
});

describe('.fluent(name, targetName)', function(){
  it('one level, use self property', function(){
    const obj = {};
    obj.request = {
      foo: 'something'
    };

    delegate
      .delegate(obj, 'request')
      .fluent('foo', 'oof');

    obj.oof().should.equal('something');
    obj.oof('nothing').should.equal(obj);
    obj.request.foo.should.equal('nothing');
  });

  it('multi level, use self property', function(){
    const obj = {};

    obj.request = {
      url:{
        foo: 'something'
      }
    };

    delegate
      .delegate(obj, 'request.url')
      .fluent('foo', 'oof');

    
    obj.oof().should.equal('something');
    obj.oof('nothing').should.equal(obj);
    obj.request.url.foo.should.equal('nothing');
  });

  it('one level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        foo: 'something'
      }
    };

    delegate
      .delegate(obj, source.request)
      .fluent('foo', 'oof');

    obj.oof().should.equal('something');
    obj.oof('nothing').should.equal(obj);
    source.request.foo.should.equal('nothing');
  });

  it('multi level, use no self property', function(){
    const obj = {};
    const source = {
      request: {
        url: {
          foo: 'something'
        }
      }
    };

    delegate
      .delegate(obj, source.request)
      .fluent('url.foo', 'oof');

    obj.oof().should.equal('something');
    obj.oof('nothing').should.equal(obj);
    source.request.url.foo.should.equal('nothing');
  });
});

describe('.auto(proto, target)', function(){
  it('use self property', function(){
    const obj = {
      request: {
        foo: 'something'
      }
    };

    let setAs = 0;

    Object.defineProperty(obj.request, 'getter', {
      get: function() { return this.foo; }
    });
    Object.defineProperty(obj.request, 'setter', {
      set: val => setAs = val
    });
    Object.defineProperty(obj.request, 'constant', { 
      value: 2
    });
    Object.defineProperty(obj.request, 'write', { 
      value: 2,
      writable: true
    });

    delegate.auto(obj, 'request');

    obj.foo.should.equal('something');
    obj.getter.should.equal('something');
    obj.setter = 10;
    setAs.should.equal(10);
    obj.constant = 5;
    obj.constant.should.equal(2);
    obj.write = 5;
    obj.write.should.equal(5);
  });

  it('use no self property', function(){
    const obj = {};
    const source = {
      request: {
        foo: 'something'
      }
    };

    let setAs = 0;

    Object.defineProperty(source.request, 'getter', {
      get: function() { return this.foo; }
    });
    Object.defineProperty(source.request, 'setter', {
      set: val => setAs = val
    });
    Object.defineProperty(source.request, 'constant', { 
      value: 2
    });
    Object.defineProperty(source.request, 'write', { 
      value: 2,
      writable: true
    });

    delegate.auto(obj, source.request);

    obj.foo.should.equal('something');
    obj.getter.should.equal('something');
    obj.setter = 10;
    setAs.should.equal(10);
    obj.constant = 5;
    obj.constant.should.equal(2);
    obj.write = 5;
    obj.write.should.equal(5);
  });
});

describe('target not have some property', function(){
  it('should be error', function(){
    const obj = {
      request: {
        foo: 'something'
      }
    };

    (() => {
      delegate.delegate(obj, 'response');
    }).should.throw('target is not an object');

    delegate
      .delegate(obj, 'request')
      .method('url.oof', 'foo');
    obj.foo.should.throw('property [url] is not an object');
  });

});

