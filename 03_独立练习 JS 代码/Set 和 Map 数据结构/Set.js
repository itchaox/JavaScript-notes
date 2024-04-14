const s = new Set()
let arr = [1, 2, 3, 4, 5,4, 6,6, 6]

console.log('s.size',s.size)

arr.forEach( i => {
  s.add(i)
})

console.log('s.size',s.size)
console.log([...s])

console.log('s.add({})',s.add({}), 123123)
const a = {}
s.add(a)
console.log(s.size);
console.log(s);

s.delete(2)
console.log(s);

s.delete(a)
console.log(s);

console.log(s.has(6));
console.log(s.has(62));
console.log(s.has(9));

s.clear()
console.log(s);


let newArr = [{
  id: 1,
  name: '1'
},
{
  id: 2,
  name: '2'
}]

const s1 = new Set(newArr)
console.log(s1);

for (let i of s1) {
  console.log(s1.has(i.id === 2));
}

console.log('s1.keys()',s1.keys())

for(let i of s1.keys()) {
  console.log(i);
}

for(let i of s1.values()) {
  console.log(i);
}

for(let i of s1.entries()) {
  console.log(i);
}

console.log(s1.entries()); 

for(let i of s1) {
console.log(' i',i )
}