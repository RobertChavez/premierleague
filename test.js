var scores = require("./index.js");

var input = process.argv[2];

var day = input[0]+input[1];

var month = input[3]+input[4];

var year = input[6]+input[7]+input[8]+input[9];

var team = '';

for(i=11;i<input.length;i+=1){
	team = team+input[i];
}

//write arguments as day/month/year/team

//example: 11/05/2015/Arsenal

scores.getscore(day,month,year,team);