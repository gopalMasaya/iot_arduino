
var incoming;
var val="";
var serialData = new Array(14);
for(var x=0;x< serialData.length;x++){
	serialData[x]="";
}
var socket;
var msg= "130";
var img;
var led= new Array(12);
var state = new Array(12);
var slider = new Array(6);
var s_value = new Array(6);


var r= 200;
var them;


function setup() {
	createCanvas(displayWidth, displayHeight);
	img = loadImage("assets/button1.png")
	socket = io.connect('http://localhost:3000');
socket.on('msg',getData);

for(let i=0;i<13;i++){
led[i] = new Button("on/off ",270,15+(i*40),100,25,18,0);}

for(let x=0;x< slider.length;x++){
	slider[x] = createSlider(0,100,10);
	slider[x].position(400,(80+x*60));
	slider[x].size(200,30);
	slider[x].style('color','#ff0000');
}



them = createButton("light/dark");
them.size(100,32);
them.position(1,0);
them.mousePressed(change);
them.style('border-color','rgb(120,70,140)');
them.style('border-width','1px');

state[0]= "100";state[1]= "110";
state[2]= "120";state[3]= "130";
state[4]= "140";state[5]= "150";
state[6]= "160";state[7]= "170";
state[8]= "180";state[9]= "190";

}

function getData(data){
// for (let i = 0;i< data.length;i++){
// 	serialData[i]=data[i];
// }
for(let i= 0; i< data.length;i++){
val +=data[i];
if(i== 0 ){val="";}
}
if(val.length > 0){
incoming = splitTokens(val, ',');
for(let x=0;x< incoming.length;x++){
	serialData[x]=incoming[x];
}
//console.log(incoming.length);
}
}

function draw() {
background(r);

noStroke();fill(60);rect(40,40,1000,800);
for(var i=1;i< 13;i++){ led[i].Draw();}

	socket.emit('msg',msg);
	textAlign(LEFT);strokeWeight(1);
for(let i = 0;i< 11;i++){
	fill(217,179,16);textSize(20);
	text("output   "+i,50,70+(i*40));}
	for(let i = 0;i< 12;i++){
	fill(0,250,0);
	text(serialData[i],190,67+(i*40));
	noFill();stroke(225,40,110);
	rect(160,50+(i*40),70,30);
}
fill(40,180,20);noStroke();
for(let x= 12; x< serialData.length;x++){
	text(serialData[x],830,-513+(x*50));
}

fill(217,179,16);noStroke();


for(let i=0; i< s_value.length;i++){
	s_value[i] = slider[i].value();
	noStroke();fill(217,179,16);
	text("output " +i+"   "+s_value[i],480,70+(i*60));
  text("input "+i,700,80+(i*50));
	noFill();stroke(225,40,110);
	rect(800,70+(i*50),100,30);
}


}
//text(incoming.length,30,400);

function mousePressed(){

	if(led[0].MouseIsOver()){
	     if(state[0] == "100"){ state[0] = "101"; msg = state[0];}
	else if(state[0] == "101"){ state[0] = "100"; msg = state[0];}}
if(led[1].MouseIsOver()){
      	if(state[1] == "110"){ state[1] = "111"; msg = state[1];}
   else if(state[1] == "111"){ state[1] = "110"; msg = state[1];}}
if(led[2].MouseIsOver()){
        if(state[2] == "120"){ state[2] = "121"; msg = state[2];}
   else if(state[2] == "121"){ state[2] = "120"; msg = state[2];}}
if(led[3].MouseIsOver()){
        if(state[3] == "130"){ state[3] = "131"; msg = state[3];}
   else if(state[3] == "131"){ state[3] = "130"; msg = state[3];}}
if(led[4].MouseIsOver()){
        if(state[4] == "140"){ state[4] = "141"; msg = state[4];}
   else if(state[4] == "141"){ state[4] = "140"; msg = state[4];}}
if(led[5].MouseIsOver()){
        if(state[5] == "150"){ state[5] = "151"; msg = state[5];}
   else if(state[5] == "151"){ state[5] = "150"; msg = state[5];}}
if(led[6].MouseIsOver()){
        if(state[6] == "160"){ state[6] = "161"; msg = state[6];}
   else if(state[6] == "161"){ state[6] = "160"; msg = state[6];}}

fill(0);	text(msg,50,500);console.log(msg);



}
function change(){
	if(r==200){r=20;console.log("dark")}
else	if(r==20){r=200;}

}
