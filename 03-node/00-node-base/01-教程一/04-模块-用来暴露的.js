var sayHI = function () {
  console.log("say hi");
}


var sayBye = function () {
  console.log("say bye");
}

module.exports = {
  sayHI:sayHI,
  sayBye:sayBye
}


//下面是简写
module.exports = {
  sayHI,
  sayBye
}