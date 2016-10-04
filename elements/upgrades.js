var addUpgrade = function(name,cost,type,amount,require,flavorText,requiredUpgrade){
      var temp = {
            id: player.upgradeList.length,
            name: name,
            cost: cost,
            type: type,
            amount: amount,
            bought: 0,
            require: require,
            flavorText: flavorText,
            requiredUpgrade: requiredUpgrade
      }
      if( !alreadyUpgrade(name)){
            player.upgradeList.push(temp);
      }
}

//                  name,cost,type,amount,require,flavorText,requiredUpgrade
var initUpgrades = function(){
  addUpgrade("Damage Up! I", 100, "plusDamage", 1, 0, "This upgrade will give you one more clicking power", null);
  addUpgrade("Damage Up! II", 500, "plusDamage", 1, 0, "This upgrade will give you one more clicking power", 0);
  addUpgrade("Damage Up! III", 2000, "plusDamage", 2, 0, "This upgrade will give you two more clicking power", 1);
}

var applyUpgrade = function(type, amount){
  switch(type) {
    case "plusDamage":
      player.clickAttack += amount;
      log("Your clicking attack has been increased by "+amount+"!");
      break;
    default:
      console.log("Something went wrong with buying an upgrade");
      break;
  }
}

var boughtUpgrades = function(){
  var number = 0;
  for( var i = 0; i<player.upgradeList.bought; i++){
    if(player.upgradeList[i].bought == 1){
      number++;
    }
  }
  return number;
}

var alreadyUpgrade = function(name){
  for( var i = 0; i<player.upgradeList.length; i++){
    if(player.upgradeList[i] == name){
      return true;
    }
  }
  return false;
}

var alreadyUpgradeId = function(id){
	for( var i = 0; i<player.upgradeList.length;i++){
		if( player.upgradeList[i].id == id){
			return player.upgradeList[i].bought == 1;
		}
	}
  return false;
}
