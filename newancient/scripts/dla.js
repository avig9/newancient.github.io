function createField(width, height) {
  var field = new Uint8Array(width * height);
  var fcenterX = Math.floor(width / 2);
  var fcenterY = Math.floor(height / 2);

  // center occupied
  field[fcenterX + fcenterY * width] = 1;

  return { field: field, width:width, height:height};
}

function createParticles(field, particleCount) {
  var particlesX = new Uint16Array(particleCount);
  var particlesY = new Uint16Array(particleCount);
  var particlesStuck = new Uint8Array(particleCount);

  return { x: particlesX, y:particlesY, stuck: particlesStuck, count: particleCount};
}


function resetSingleParticle(particles, field, i) {
  var x = Math.floor(Math.random() * width);
  var y = Math.floor(Math.random() * height);

  while(field[y*width+x]) {
    x = Math.floor(Math.random() * width);
    y = Math.floor(Math.random() * height);
  }

  particles.x[i] = x;
  particles.y[i] = y;
}


function resetAllParticles(particles, field) {
  for (var i=0;i<particles.count;i++) {
    resetSingleParticle(particles, field, i);
  }
}

function alone(particles, field, i) {
  var cx = particles.x[i];
  var cy = particles.y[i];

  var lx = cx - 1;
  var rx = cx + 1;
  var ty = cy - 1;
  var by = cy + 1;

  if (cx <= 0 || cx >= field.width || 
    lx <= 0 || lx >= field.width || 
    rx <= 0 || rx >= field.width || 
    cy <= 0 || cy >= field.height || 
    ty <= 0 || ty >= field.height || 
    by <= 0 || by >= field.height) {
    return true;
  }
    
  cy *= field.width;     
  by *= field.width;     
  ty *= field.width;

  if (field.field[cx + ty] ||         
    field.field[lx + cy] ||         
    field.field[rx + cy] ||         
    field.field[cx + by]) {
    return false;
  }

  if (field.field[lx + ty] ||         
    field.field[lx + by] ||         
    field.field[rx + ty] ||         
    field.field[rx + by]) {
    return false;
  }

  return true;
}

function updateSingleParticle(particles,field, i) {
  if (particles.stuck[i] == 0) {
    var x = particles.x[i];
    var y = particles.y[i];

    x += Math.random() > 0.5 ? 1 : -1;
    y += Math.random() > 0.5 ? 1 : -1;

    if ( (x < 0) || (y < 0) || (x >= field.width) || (y >= field.height)) {
      resetSingleParticle(particles, field, i);
    }

        particles.x[i] = x;
        particles.y[i] = y;
        
    if (!alone(particles, field, i)) {
      particles.stuck[i] = 1;
      field.field[y*field.width + x] = 1;
    }
  }
}

function step(particles, field) {
  for (var i = 0;i<particles.count;i++) {
    updateSingleParticle(particles, field, i);
  }
}

function createCanvas(width, height) {
  var canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  canvas.width = width;
  canvas.height = height;

  return canvas;
}


function paint(field, canvas, particles) {
  var ctx = canvas.getContext('2d');
  ctx.clearRect ( 0 , 0 , field.width, field.height );
  var imageData = ctx.getImageData(0, 0, field.width, field.height);

  var data = imageData.data;

  for (var i=0;i<particles.count;i++) {
    var x = particles.x[i];
    var y = particles.y[i];
    var stuck = particles.stuck[i];

    var fieldIndex = y * field.width + x;
      var index = fieldIndex * 4;
      var value = stuck ? 255 : 0;
      data[index]   = value;  // red
        data[++index] = value;  // green
        data[++index] = value;  // blue
        data[++index] = 255;  // alpha
  }

  ctx.putImageData(imageData, 0, 0);
}


var particleCount = 40000;
var width = 800;
var height = 800;
// const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
// const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);


var canvas = createCanvas(width, height);
var field = createField(width, height);
var particles = createParticles(field, particleCount);
resetAllParticles(particles,field);


setInterval(function() {
  for (var i = 0;i < 4;i++) {
    step(particles, field);
  }
  
  paint(field, canvas, particles);
} , 33);