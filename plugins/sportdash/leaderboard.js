function leaderboard(res){
    result = "";
					var leaderboard = "";
					var position = 0	
					for (const item of res.values()) {  
						if (Number(JSON.stringify(item.xp))<1){
						} else {
						position++
								//	console.log(`Cache item: ${JSON.stringify(item)}`)
								if (position>100){
								} else {
									leaderboard+="\n "+position+".@"+JSON.stringify(item.xp)+"xp@"+JSON.stringify(item.username)+"@ #"+JSON.stringify(item.user_id)
								}
						}
					}
					console.log(leaderboard)
					
return leaderboard;
}
module.exports = leaderboard;