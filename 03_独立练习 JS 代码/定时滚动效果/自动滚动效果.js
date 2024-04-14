const p = document.querySelector('.parent')
const s = document.querySelector('.son')
console.dir( s.scrollWidth,);
console.log(  s.clientWidth)
// console.dir(s);
setInterval(() => {
  p.scrollLeft++
}, 0)
if(s.scrollWidth >= p.scrollLeft + s.clientWidth) {
  p.scrollLeft = -100
  console.log(22)
}