var addLoot = function(name, cost, damage, baseChance, flavorText){
  var temp = {
    id: player.lootList.length,
    name: name,
    cost: cost,
    damage: damage,
    baseChance: baseChance,
    looted: 0,
    flavorText: flavorText
  }
  player.lootList.push(temp);
}

//              name, cost, damage, baseChance, flavorText
var initLoot = function(){
  addLoot("Rock", 2, 2, 10, "It doesn't do much, but it's better than nothing");
  addLoot("Brick", 2, 2, 8, "It doesn't do much, but it's better than nothing");
}


var lootChance = function(){

}

var lootPerEnemy = {
  1: ["Rock", "Brick"],
  2: ["Rock", "Brick"],
  3: ["Rock", "Brick"]
}

var gainRandomLoot = function(enemyID){
  var randomItemName;
	var possibleItems = itemsPerEnemy[enemyID];
	var rand = Math.floor(Math.random()*possibleItems.length);
	randomItemName = possibleItems[rand];
  return gainItemByName(randomItemName);
}

var gainLoot = function(index){
  player.lootList[index].looted += 1;
  log("You found loot! '"+player.lootList[index].name+"' has been added to your inventory");
}
