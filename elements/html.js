var logCount = 0;

var log = function(text){
	logCount++;
	if(logCount > 250){
		logCount = 0;
		$("#console").html("");
	}
	$("#console").append(text+"<br>");
	var elem = document.getElementById('console');
	elem.scrollTop = elem.scrollHeight;
}

var updateEnemy = function(){
    if (curEnemy.health <0){
        curEnemy.health = 0;
    }
    if(curEnemy.health == 0 ){
        enemyDefeated();
    }
    if (curEnemy.alive){
			$("#enemyInfo").html("<br>"+curEnemy.name+"<br><img id=enemy src=images/enemies/"+curEnemy.id+".png>");
    }
    $("#healthBar").width(100*curEnemy.health/curEnemy.maxHealth+"%");
    $("#healthDisplay").html(curEnemy.health+"/"+curEnemy.maxHealth);
}

var updateStats = function(){
			$("#statBody").html(
						"<tr><th>Money</th><th>$"+player.money+"</th></tr>" +
						"<tr><th>Click Attack</th><th>"+getClickAttack()+"</th></tr>" +
						"<tr><th>Minion Attack</th><th>0</th></tr>"
			)
}

var updateUpgrades = function(){
	$(".upgradeBoxes").remove();
	for( var i = 0; i<player.upgradeList.length; i++){
		if( player.upgradeList[i].require <= boughtUpgrades() && !player.upgradeList[i].bought
		&& (alreadyUpgradeId(player.upgradeList[i].requiredUpgrade) || player.upgradeList[i].requiredUpgrade == null )){
			var upgrade = player.upgradeList[i];
			if(player.money >= upgrade.cost){
				$("#upgradeBox").append("<button type=button id=Upgrade"+upgrade.id+" class='upgradeBoxes btn btn-warning col-sm-12'>"+upgrade.name+"<br>Cost: "+upgrade.cost+"<p id=flavor"+upgrade.id+"> </p></button>");
			} else {
				$("#upgradeBox").append("<button type=button id=Upgrade"+upgrade.id+" class='upgradeBoxes disabled btn btn-warning col-sm-12'>"+upgrade.name+"<br>Cost: "+upgrade.cost+"<p id=flavor"+upgrade.id+"> </p></button>");
			}
			document.getElementById("flavor"+upgrade.id).innerHTML = upgrade.flavorText;
		}
	}
}
