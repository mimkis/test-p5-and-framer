let fontToren;
let button;
let wonderful;
let sound;
let worldgif;
let cursorr;
let inverted;
let maskImg;
let rosegif;

function preload() {
  fontToren = loadFont('Toren-Proportional.otf');
  button = loadImage('win93 button.png');
  wonderful = loadImage('wonderfulworld.png')
  sound = loadSound('Song_No bgm_retro.mp3');
  worldgif = loadImage('full.gif');
  cursorr = loadImage('cursorsmall.png');
  rosegif = loadImage('rose.gif');
}

function setup() {
  createCanvas(500,500);
  noCursor();
  
  //create an image to store the inverted version
  inverted = createImage(width,height);
}

function draw() {
  background(0);
  
  //call windowFrame function
  windowFrame();   
  
  //load gif
  push();
  imageMode(CENTER);
  image(worldgif,width/2,height/2);
  pop();
  
  //call wonderfulWorld functionp
  wonderfulWorld();
  
  //load img asset
  push();
  scale(0.5);
  image(wonderful,width/2-75,height/2+130);
  pop();
   
  
  //call the dust fuction
  //randomize number of dust
  dust(random(6,8));
  
  //press P to play music
  push();
  textSize(10);
  textAlign(CENTER,CENTER);
  stroke(0.5);
  strokeWeight(0.5);
  fill(255);
  textFont(fontToren);
  text('press [P] to play music',width/2,height-25);
  pop();
  
  push();
  imageMode(CENTER);
  image(rosegif,350,170,100,100);
  pop();
  
  //call masked function
  maskCursorr();
}

//randomize dust particles
function dust(numberofdust) {
  for (i = 0; i<numberofdust; i++) {
    //set parameter for location of dust
    let x = random(width);
    let y = random(height);
    //set parameter for size of dust
    let dustsize = random(1.5,3);
    
    //draw the grain
    //random fill colour to be either black or white
    //random the opacity of the grain between 95 or 100
    noStroke();
    fill(random([0,200,225]));
    circle(x,y,dustsize);
  }
}

//draw window95

function windowFrame() {
  rectMode(CENTER);
  
  //draw window frame
  fill(194, 191, 184);
  rect(width/2-1,height/2-1,402,402)
  
  fill(56, 55, 53);
  rect(width/2+1,height/2+1,402,402)
  
  fill(148, 145, 139);
  rect(width/2,height/2,400,400);

  fill(194, 191, 184);
  rect(width/2,height/2,383,383);
  
  fill(0);
  rect(width/2,height/2,380,380);
  
  //draw the blue frame
  fill(0, 23, 232)
  rect(width/2,height/2-173,375,30);
    
  //add button
  image(button,width/2+160,height/2-186,25,25);

  
}


//glitch the world 'welcome' while mouse is hover effect
//parameter str = the text we want to glitch, in this case, 'welcome'
//parameter glitch text is the declared array that contains characters to be replaced with
//parameter probability is the probability in which each character will be replaced
//on going
let ogText = 'hello world';
let displayText = ogText;
let glitchText = '/?@#$%^&*()[]{}<>";~\|';
let glitchProbability = 0.1;

//text glitch effect on 'ogText'
//check if mouse is hovered above text//use dist() to calculate distance between mousex,mousey relative to 'welcome'
//if said distance is <100 then mouseHover = TRUE 
//if mouseHover is true, then text randomize
//if not, display 'welcome'
function wonderfulWorld() {

  let mouseHover = dist(mouseX,mouseY,width/2-130,height/2-175) <100;
  
  if (mouseHover) {
    displayText = glitchChar(displayText,glitchProbability,glitchText);
  } else {
    displayText = ogText;
  }
   
  //create text 'welcome'
  textSize(20);
  textAlign(CENTER,CENTER);
  stroke(0.5);
  strokeWeight(0.5);
  fill(255);
  textFont(fontToren);
  text(displayText,width/2-115,height/2-175);
}  

//*****************************************************
//**************CUSTOMIZE GLITCH FUNCTION**************
//*****************************************************

//split the ogText into array ['w','e','l','c','o','m','e']
//apply .map() to remap the array of ogTEXT to be glitchText based on probability
//that means not all ogText characters will be replaced

//math.random() to randomize between 0 and 1
//which we compare with glitchProbability
//if smaller than glitchProbability, we randomize the character
//if bigger, we leave it the same

//glitchText[something to give us random number] to return the text to replaced the og characters with
//Math.floor to round up the number
//Math.random() randomize between 0 and 1
//.length return the number of characters in a string
//Math.random() * glitchText.length to generate the position number within glitchText

//iterate over each character
//use .join("") to join the radomized array back into a string

function glitchChar(str, glitchProbability, glitchText) {
  //return the glitch efect if satisfy if (statement)
  return str.split("").map((char) => {
    if (Math.random() < glitchProbability) {
      //Choose a random character from glitchText
      let arrayPOS = Math.floor(Math.random() * glitchText.length);
      return glitchText[arrayPOS];
    } else {
      //keep original character
      return char;
    }
  })
  .join("");
}

function keyPressed() {
  //press p or P to play music
  if (key == 'P' || key == 'p') {
    
    //check if sound is NOT playing by adding ! in front
    //if sound is not playing then play sound
    if (!sound.isPlaying()) {
      sound.play();
      console.log("Sound is playing");
      
    //if sound is playing then press P will stop music
    } else {
      sound.pause();
      console.log("Sound is paused");
      
      }
    }
  }




//show the inverted canvas within the cursorr
function maskCursorr() {
  // Create an image the size of the cursor
  maskImg = createImage(cursorr.width, cursorr.height);
  
  // Constrain the mouse position to make sure the cursor doesn't go out of bounds
  let x = constrain(mouseX - cursorr.width / 2, 0, width - cursorr.width);
  let y = constrain(mouseY - cursorr.height / 2, 0, height - cursorr.height);
  
  // Capture the portion of the canvas under the cursor
  let captured = get(x, y, cursorr.width, cursorr.height);
  
  // Apply the invert filter to the captured image
  captured.filter(INVERT);

  // Use the inverted portion as the cursor mask
  maskImg.copy(captured, 0, 0, cursorr.width, cursorr.height, 0, 0, cursorr.width, cursorr.height);
  maskImg.mask(cursorr);  // Apply the custom cursor as a mask
  
  // Draw the custom cursor with the inverted portion
  image(maskImg, mouseX - cursorr.width / 2, mouseY - cursorr.height / 2);
}