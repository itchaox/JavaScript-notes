const obj = {
  name: 'itchao',
  age: 18,
  height: 1.88,
  friends:[
    'a', 'b', 'c', 'd', 'e', 'f'
  ]
};

// 将对象类型转换成 字符串string类型,方便存储在JSON数据中
const jsonObj = JSON.stringify(obj);
console.log('JSON数据:', jsonObj);
// 存储数据
sessionStorage.setItem('obj', jsonObj);


// 获取数据
const oneObj = sessionStorage.getItem('obj')
// 将JSON数据对象,还原成原始对象
const infos = JSON.parse(oneObj)
console.log('原始数据:', infos);

