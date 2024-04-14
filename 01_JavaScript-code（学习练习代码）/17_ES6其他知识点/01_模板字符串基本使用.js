// 模板字符串基本使用
const a = `1
2
3`
const b = '123'

console.log(a);
console.log(b);

 
const nameA = 'itchao'
const age = 22
const height = 1.85

function Age() {
  return age * 1.6
}

console.log(`名字 ${nameA},年龄 ${age},身高 ${height}`);
console.log(`名字 ${nameA},年龄 ${age*1.5},身高 ${height*2}`);
console.log(`名字 ${nameA},年龄 ${Age()},身高 ${height}`);
