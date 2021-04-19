const jwt = require("jsonwebtoken")


// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjE4ODQ0MjA3LCJleHAiOjE2MTg5MzA2MDd9._zUtTJdFQABSjDgSYWSPkiNhs1k5WI25q589NviwyVg"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjE4NzUxNTUwLCJleHAiOjE2MTg4Mzc5NTB9.pk_JKbO5w9WHeJ9I7JGujnzF3fTRLynSDk2ixS_dlLQ"
const decode_token = jwt.decode(token,'infonet')

//{ username: 'admin', iat: 1618844207, exp: 1618930607 }


const end_time = parseInt(decode_token.exp);
const cur_time = new Date().getTime()/1000;

console.log(cur_time,end_time);



console.log(cur_time - end_time);

if(cur_time > end_time){
  console.log("过期了");
}else {
  console.log("还可以使用");
}