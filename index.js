var rest = require('restler');

var OBA_API_URL = 'http://football-api.com/api/?Action=fixtures&APIKey=';
var OBA_KEY = '40f74956-edb7-bfca-b2adfb598aeb';
var apireq = '&APIKey=';
var compreq = '&comp_id=';
var compid = '1204';

var found = false;

var homeGoals = 0;
var homeTeam = "not set";
var awayGoals = 0;
var awayTeam = "not set";


exports.getscore = function(day,month,year,team){

	var fixturesurl = OBA_API_URL + OBA_KEY + compreq + compid + '&&match_date=' + day+"."+month+"."+year;

	rest.get(fixturesurl).on('complete', function(data) {
		//console.dir(data,{depth:5});
		//console.dir(data.APIRequestsRemaining);

		var home = [];
		var homeScore = [];
		var away = [];
		var awayScore = [];
		for (var i=0;i<data.matches.length;i+=1){
			home.push(data.matches[i].match_localteam_name);
			homeScore.push(data.matches[i].match_localteam_score);
			away.push(data.matches[i].match_visitorteam_name);
			awayScore.push(data.matches[i].match_visitorteam_score);
			if(home[i]==team && found==false){
				homeGoals = homeScore[i];
				awayGoals = awayScore[i];
				homeTeam = home[i];
				awayTeam = away[i];

				//console.log("team has been found")

				//console.dir(home[i]+" "+ homeScore[i]+"-"+awayScore[i]+" "+away[i]);
				found = true;
			} else if (away[i]==team && found==false){
				homeGoals = homeScore[i];
				awayGoals = awayScore[i];
				homeTeam = home[i];
				awayTeam = away[i];

				//console.dir(home[i]+" "+ homeScore[i]+"-"+awayScore[i]+" "+away[i]);
				found = true;
			}
		}

		console.log(found);
		if (found==false){
		 	console.log("No matches");
		} else if (found==true){
		 	console.log("Final Score: "+homeTeam+" "+homeGoals+"-"+awayGoals+" "+awayTeam);
		}
		// console.dir(found);
		//console.dir("reached end");
	});
}