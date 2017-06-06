var villageList = [];

var addVillage = function(name, image){
  var temp = {
    id: villageList.length
    name: name,
    image: image
  }
  villageList.push(temp);
}

var initVillages = function(){
  addVillage("Peacefull Village","images/village/1.png");
}
