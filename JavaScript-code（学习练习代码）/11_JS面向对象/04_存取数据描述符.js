/*
 * @desc: 
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-09-28 22:42:42
 * @LastEditors: wc
 * @LastEditTime: 2022-12-28 13:26:56
 */

var player = {
  name:'kobe',
  age:18,
  height:1.98,
  address:'上海市'
}

Object.defineProperty(player, "address",{
  enumerable:true,
  configurable:true,
  // value:'成都市', 用value表示数据属性描述符
  // 用get 和 set 表示存取属性描述符
  get: function(){
    return this._address
  },
  set:function (value){
    return this._address = value
  },
})
console.log(player.address)
console.log('成都市')
console.log(player.address)
