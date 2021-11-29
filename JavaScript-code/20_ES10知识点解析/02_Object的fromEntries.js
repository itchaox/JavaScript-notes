const obj = {
  name: 'itchao',
  age: 22,
  height: 1.85
};

const objEntries = Object.entries(obj);
console.log(objEntries);

// 1. ES10, 新增Object.fromEntries, 将entries格式还原成对象格式
const replaceObj = Object.fromEntries(objEntries)
console.log(replaceObj);

// 2. Object.fromEntries 使用场景（url中传递参数的解析成对象格式）
const queryString = 'name=itchao&age=22&height=1.85'
const queryParams = new URLSearchParams(queryString)
console.log(queryParams);
for (const item of queryParams) {
  console.log(item);
}

const paramObj = Object.fromEntries(queryParams)
console.log(paramObj);