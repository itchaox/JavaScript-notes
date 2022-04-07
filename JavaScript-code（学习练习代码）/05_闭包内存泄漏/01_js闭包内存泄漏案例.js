function createFnArray(){
    // 占据的空间是4M，4 * 1024 * 1024 ，1kb = 1024 byte
    let arr = new Array(1024*1024).fill(1)
    return function(){
        console.log(arr.length)  // 这个函数引用了上面的对象导致没法销毁
    }
}

// let arrayFn = new createFnArray()
    let arrayFn = []
    for(let i =0; i < 100; i++){
        setTimeout(() => {
            arrayFn.push(createFnArray())
        }, 100 * i)
    }

// 等上面都创建完，再进行销毁
    setTimeout(() => {
        for(let i = 0; i < 50; i++){
            setTimeout(() => {
                arrayFn.pop()
            }, 100 * i)
        }
    }, 10000)
