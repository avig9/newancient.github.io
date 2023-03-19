// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/kKT0v3qhIQY
p5.disableFriendlyErrors = true; // disables FES

var canvas;
var tree;
var max_dist;
var min_dist;

function setup() {
 canvas = createCanvas(windowWidth, windowHeight);
 canvas.position(0,0);
 canvas.style('z-index', '9999');
  canvas.style('position', 'fixed');
  init();
 
}

function init(){
	background (0,0,0,0);
	max_dist = 777;
 	min_dist = 10;
	tree = new Tree();

}

function draw() {
 
 grow();
}

function grow(){


  tree.show();
  tree.grow();


}
