var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// src/foo.tsule.ts
var exports_fooModule = {};
__export(exports_fooModule, {
  foo: () => {
    {
      return foo;
    }
  }
});

// src/foo.ts
function foo() {
  return "foo";
}
export {
  exports_fooModule as fooModule
};
