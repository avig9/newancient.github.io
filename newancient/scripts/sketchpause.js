// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/kKT0v3qhIQY
p5.disableFriendlyErrors = true; // disables FES


var canvas;
var tree;
var max_dist;
var min_dist;
var reset = 0;

function setup() {
 canvas = createCanvas(windowWidth, windowHeight);
 canvas.position(0,0);
 canvas.style('z-index', '-1');
  init();
 
}

function init(){
	background (0);
	max_dist = 777;
 	min_dist = 10;
	tree = new Tree();

}

function draw() {

if(millis() > 3000){

 grow();

}
}

function grow(){


  tree.show();
  tree.grow();


}
