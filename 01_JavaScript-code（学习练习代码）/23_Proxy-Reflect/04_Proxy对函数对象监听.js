function foo() {

}

const p = new Proxy(foo, {
  apply(target, thisArg, argArray) {
    console.log('函数进行apply调用');
    return target.apply(thisArg, argArray)
  },
  construct(target, argArray, newTarget) {
    console.log('函数进行new调用');
    return new target(...argArray);
  }
})

p.apply({}, ['a', 'b'])
new p('a', 'b')