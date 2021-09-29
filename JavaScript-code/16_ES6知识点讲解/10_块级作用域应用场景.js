let btns = document.getElementsByTagName('button')

for(let i = 0;i < btns.length ; i++) {
  btns[i].onclick = function() {
    console.log(`第${i}个按钮被点击`)
  }
}