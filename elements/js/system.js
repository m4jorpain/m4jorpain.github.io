var clicks = 0;
var inProgress = 1;
var attackInterval;
var autoSave = "on";
var autoSaveCounter = 0;

var player = {
      clickAttack: 1,
      clickMultiplier: 1,
      money: 0,
      moneyMultiplier: 1,
      expMultiplier: 1,
      inventory: [],
      lootList: [],
      upgradeList: [],
      equippedWeapon: [],
      route: 1,
      routeKills: Array.apply(null, Array(100)).map(Number.prototype.valueOf,0),
      routeKillsNeeded: 10
};

var curEnemy = {
      name: "Peasant",
      id: 0,
      health: 20,
      maxHealth: 20,
      moneyReward: 20,
      alive: true,
      route: 1
};

$(document).ready(function(){

      // setInterval(itemInterval, 1000);
      // itemInterval();
      initLoot();
      initUpgrades();
      if(localStorage.getItem("player") != null){
            // load();
            generateEnemy(player.route)
      }

      updateAll();
      $("currentEnemy").show();

      $("body").on('click', "#enemy", function(){
            clicks++;
            if(curEnemy.alive && inProgress != 0){
                  if(curEnemy.health > 0){
                        curEnemy.health -= getClickAttack();
                  } else {
                        curEnemy.health = 0;
                  }

                  updateEnemy();
            }
      });

      $("body").on('click', "#boss", function(){
            clicks++;
            if(curEnemy.alive && inProgress != 0){
                  if(curEnemy.health > 0){
                        curEnemy.health -= getClickAttack();
                  } else {
                        curEnemy.health = 0;
                  }

                  updateBoss();
            }
      });

      // upgrades
      $("body").on('click',".upgradeBoxes", function(){
            var id = this.id.substr(7,this.id.length);
            for( var i = 0; i<player.upgradeList.length; i++){
                  if( player.upgradeList[i].id == id){
                        var upgrade = player.upgradeList[i];
                        if( !upgrade.bought && player.money >= upgrade.cost){
                              applyUpgrade(upgrade.type,upgrade.amount);
                              player.upgradeList[i].bought = 1;
                              player.money -= upgrade.cost;
                              updateAll();
                        } else {
                              log("Not enought money!");
                        }
                  }
            }
      });

      log("Dit is een work-in-progress web clicker game");
      log("De code is vooral een inspiratie uit pokeclicker");
      log("Klik op de enemy om hem aan te vallen");
      log("Have fun");
});

// Alles updaten
var updateAll = function(){
      updateStats();
      if( inProgress == 1){
            updateEnemy();
      }
      updateUpgrades();
      updateInventory();
};

var getClickAttack = function(){
      var clickAttack = Math.floor(player.clickAttack*player.clickMultiplier);
	    return clickAttack;
};

var gainMoney = function(money, message){
	     if(!isNaN(money)){
            money = Math.floor(money*player.moneyMultiplier);
            player.money += money;
            log(message + money + "!");
       }
};

var enemyDefeated = function(){
      if (curEnemy.alive){
            // var id = getEnemByName(curEnemy.name).id-1;
            log("You defeated the "+ curEnemy.name);
            var money = curEnemy.moneyReward;

            gainMoney(Math.floor(money), "You earned $");
            player.routeKills[player.route]++;
            // updateRoute();
            var chance = Math.floor(Math.random()*100+1);
            // if(chance < getItemChance(player.route))

            setTimeout(function(){
                  $("#enemyInfo").html("<br>"+curEnemy.name+"<br><img id=enemy src=images/enemies/"+curEnemy.id+"_death.gif>");
            }, 1);

            var catchRate = curEnemy.catchRate;

            setTimeout(function(){
              if(Math.floor(Math.random()*100+1) <= 10){
                gainLoot(Math.floor(Math.random()*player.lootList.length));
              }


              if( inProgress == 1){
                    generateEnemy(player.route);
              }
              updateAll();
            }, 1000);
            curEnemy.alive = false;
      }
};

var generateEnemy = function(route){
      var randomEnemy;
      var rand = Math.floor(Math.random()*enemyList.length);

      randomEnemyName = enemyList[rand].name;
      randomEnemy = getEnemyByName(randomEnemyName);

      curEnemy.name = randomEnemyName;
      curEnemy.id = randomEnemy.id;
      curEnemy.health = randomEnemy.health;
      curEnemy.maxHealth = curEnemy.health;
      curEnemy.alive = true;
      curEnemy.moneyReward = 20;

      return randomEnemy;
};

var calculateAttack = function(){
      var total = 0;

}

// var getMinionAttack = function(){
//       calcula
// }

var getEnemyAlive = function(){
      if( curEnemy.alive ){
            console.log("The enemy is alive");
      } else {
            console.log("The enemy is dead");
      }
};

var getEnemyByName = function(name){
      for( var i = 0; i<enemyList.length; i++){
            if(enemyList[i].name == name){
                  return enemyList[i];
            }
      }
};
