let obj = {
  name:'kobe',
  age:18
}

let info = Object.create(obj, {
  address: {
    value:'成都市',
    enumerable:true
  }
})

console.log(info);
console.log(info.__proto__);
console.log(info.address);

// hasOwnProperty方法判断
console.log(info.hasOwnProperty('address'));
console.log(info.hasOwnProperty('name'));

// in 操作符:不管在当前对象还是原型对象返回的都是true
console.log('address' in info);
console.log('name' in info);

for(let key in info){
  console.log(key);
}
