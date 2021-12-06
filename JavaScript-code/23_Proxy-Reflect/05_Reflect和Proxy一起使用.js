const obj = {
  name: 'itchao',
  age: 22,
  height: 1.85
}

const pObj = new Proxy(obj, {
  get(target, key, receiver) {
    console.log('-get-');
    return Reflect.get(target, key)
  },
  set(target, key, newValue) {
    console.log('-set-');
    Reflect.set(target, key, newValue)
  }
})

console.log(pObj.name);
pObj.name = 'coderwhy'
console.log(pObj.name);