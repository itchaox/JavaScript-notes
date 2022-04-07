// var声明变量，变量提升
var a = 1
if (true) {
  console.log(a);
  console.log(b);
}
// 变量提升
var b = 2


// let-const声明变量，暂时性死区
let q = 3
const w = 4
if (true) {
  console.log(q);
  console.log(w);
  console.log(e);
  console.log(r);
}
// 暂时性死区
let e = 5
const r = 6
