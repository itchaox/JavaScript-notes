const obj = {
  _name: 'itchao',
  get name() {
    return this._name
  },
  set name(newValue) {
    this._name = newValue
  }
}

const pObj = new Proxy(obj, {
  get(target, key, receiver) {
    console.log('-get-', key);
    return Reflect.get(target, key, receiver)
  },
  set(target, key, newValue, receiver) {
    console.log('-set-', key);
    Reflect.set(target, key, newValue, receiver)
  }
})

pObj.name = 'coderwhy'
console.log(pObj.name);
