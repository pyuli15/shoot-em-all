
//creating my variables
var bg;
var player;
var bullets = 8;
var bullet;
var outOfBullets;

var theCanvas;

var player;
var playerX;
var playerY;

var startingText;

var hit;
var miss;

var birds = [];
var birdsX = [];
var birdsY = [];
var birdsSpeed = [];
var birdSounds = [];

var sliderVal = 1;

var state = "start";
//difficulty will determine the size of the target;
var playerSize;

var myFont;

var coverMan;
var outside;
var shooting;
var outOfAmmoSound;
var reloadingGun;

var blackScreen = 0;
var controlKeys;
var closePage;

function preload()
{
	//preloading all of my images and sounds prior to starting my setup function
	bg = loadImage("images/background2.jpg");
	myFont = loadFont("font/HandmadeMemories.otf");
	coverMan = loadImage("images/hunter.png");
	outside = loadSound("sounds/nature.mp3");
	player = loadImage("images/target.png");
	controlKeys = loadImage("images/wasd_keys.png");
	closePage = loadImage("images/redx.jpg");
	//making an array
	birds[0] = loadImage("images/bird1.png");
	birds[1] = loadImage("images/bird2.png");
	birds[2] = loadImage("images/bird3.png");

	birdSounds[0] = loadSound("sounds/hitA.mp3");
	birdSounds[1] = loadSound("sounds/hitB.mp3");
	birdSounds[2] = loadSound("sounds/hitC.mp3");
	birdSounds[3] = loadSound("sounds/hitD.mp3");
	birdSounds[4] = loadSound("sounds/hitE.mp3");
	birdSounds[5] = loadSound("sounds/hitF.mp3");

	bullet = loadImage("images/bullet.png");

	shooting = loadSound("sounds/shot.mp3");
	outOfAmmoSound = loadSound("sounds/need_ammo.mp3");
	reloadingGun = loadSound("sounds/reloaded.mp3");
	
	//Here I am putting my canvas inside of a container so that I can determine where I want it on my page
	
}

function setup()
{
	//creating my canvas
	theCanvas = createCanvas(600,600);
	
  	imageMode(CENTER);
  	
}

function draw() 
{
	//creating my states for my game
	if (state == "start")
	{
		gameStart();
	}

	if(state == "controls")
	{
		gameControls();
	}
	if (state == "play")
	{
		gamePlay();
	}
	if (state == "dead")
	{
		gameEnd();
	}
}

function gameControls()
{
	//setting up a controls page that tells you how to play
	background(80);
	fill(255);
	imageMode(CENTER);
	image(controlKeys,width/2,200, 150,150);
	textFont(myFont);
	textSize(60);
	text("Controls",width/4 +50,100);
	textSize(20);
	text("Use WASD to move your target. Aim for the birds and press F to shoot.\n           If you run out of bullets, press R to reload your gun. \n Use the slider below to either speed up or slow down the birds. \n                  If you miss 25 birds it's GAME OVER.", 50,320);
	ellipse(550,50,40,40);
	image(closePage,550,50,30,30);

}

function gameStart()
{
	//my start page
  	image(bg,width/2, height/2);
  	fill(255);
  	ellipse(width/4 + 20, 400,150,150);
  	ellipse(width/2 + 140,400,150,150);
  	ellipse(width/2, 525,70,70);

  	fill(0);
  	textFont(myFont);
	textSize(80);
	text("Shoot Em' All!", 100,120);
  	image(coverMan, 300,350,150,300);

  	textSize(30);
	text("Easy", width/4 -10,400);
	text("Hard", width/2 + 110,400);
	textSize(14);
	text("Controls",width/2 -20,525);


}

function gamePlay()
{
	//setting the background
	image(bg,width/2, height/2);

	//this for loop controls the flow of the birds
	for (var i = birds.length - 1; i >= 0; i--) 
	{
		//spitting out each bird from the array I made above
		image(birds[i], birdsX[i], birdsY[i], 40, 40);
		//makes it so that if the slider is moved, that value will be multiplied by the speed
		//essentially making the birds move faster
		birdsX[i] += birdsSpeed[i] * sliderVal;

		//making it so that if the bird reaches the end of the canvas, it will be placed back onto the left
		//side with a new x and y position and new speed
		if (birdsX[i] >= width)
		{
			birdsY[i] = (random(100,500));
  			birdsX[i] = (random(-150,0));
  			//fine tune the speed if too fast
  			birdsSpeed[i] = (random(2,6));
  			//counter to setermine how many birds were missed
  			miss +=1;
  		

		}

		//determining if the target is on a bird and the f key is down while still having bullets
		if(dist(playerX,playerY,birdsX[i],birdsY[i]) <= playerSize/2 + 10 && keyIsDown(70) && bullets >= 1)
		{
			birdsY[i] = (random(100,500));
  			birdsX[i] = (random(-150,0));
  			//fine tune the speed if too fast
  			birdsSpeed[i] = (random(2,6));
  			hit +=1;
  			random(birdSounds).play();
		}

		//making it so that if you miss 20 or more, the game ends and you are taken to a game over page
		if (miss == 25)
		{

			state = "dead";

		}
		
	}

	//printing the player/target
	image(player, playerX, playerY, playerSize, playerSize);

	//creating my canvas borders
	noStroke();
	fill(0);
	rect(0,0,15,599);
	rect(585,0,15,599);
	rect(0,0,599,15);
	rect(0,585,599,599);
	

	//controlling the left side of the player
	if (keyIsDown(65))
	{
		playerX -= 4;

	}
	//controlling the right side of the player
	if (keyIsDown(68))
	{
		playerX += 4;

	}
	//controlling the up button
	if (keyIsDown(83))
	{
		playerY += 4;
	}
	//controlling the down button
	if (keyIsDown(87))
	{
		playerY -= 4;
	}


	//making boundaries for my player so that they can't go outside of the screen
	if (playerX <= 15 )
	{
		
		playerX = 15;
	}

	//making boundaries for my player so that they can't go outside of the screen
	else if (playerX >= 525 )
	{
		
		playerX = 525;
	}

	//making boundaries for my player so that they can't go outside of the screen
	if (playerY <=15)
	{
		playerY = 15;
	}

	//setting up my text at the top with all of the scores, and bullet amount
	textFont(myFont);
	textSize(20);
	text("Hits: " + hit, 60,70);
	text("Miss: " + miss, 60,90);
	text("Bullets: " + bullets, 60, 50);
	image(bullet,140,40, 30,30);


}

//death screen
function gameEnd()
{
	rect(0,blackScreen,599,blackScreen)
	blackScreen += 2;

	if(blackScreen >= 599)
	{
		//printing out game over with the mount of birds hit in that round
		textSize(100);
		fill(255);
		text("Game Over", width/4-40,height/2);
		textSize(40);
		text("You Shot : " + hit + " birds", width/4 +20, height/2 + 75);
		text("Press Q to start over", width/4, height/2 + 110);

		//if the q key is pressed while in the game over screen, you will be taken to the start screen
		if(keyIsDown(81))
		{
			blackScreen = 0;
			state = "start";
		}

	}


	
}
//controls my slider and collects that value

function updateRange(slider)
{
	sliderVal = slider.value;
}

function keyReleased()
{
	//my "shoot" key
	if(keyCode == 70)
		{
			//if bullets is greater than 1, the bullets number goes down and a sound plays
			if (bullets >= 1)
			{
				shooting.play();
				bullets -= 1;
				console.log("F key is down");
			}
			//if bullets equals zero, the player will need to reload
			if (bullets == 0)
			{
				outOfAmmoSound.play();
				console.log("Reload your gun");
				
			}
		}
}

function keyPressed()
{
	//if the player presses the r key when bullets equals zero, the gun will reload
	if ( bullets == 0 && keyIsDown (82))
	{
		reloadingGun.play();
		bullets = 8
		console.log("You just reloaded!");
	}


}

function mousePressed()
{
	//making it so that if stae equals start, and either of the buttons on the screen is pressed
	//it will take the player to the correct state
	if(state == "start")
	{
		if(dist(mouseX,mouseY,width/2,525 <= 5))
		{
			state = "controls";

		}
		//easy button with bigger target area making it easier to shoot the birds
		if(dist(mouseX,mouseY,width/4 + 20, 400) <= 75)
		{ 
			console.log("EASY");
			playerSize = 60;
			state = "play";
			playerX = (300);
		  	playerY = (300);

		  	hit = 0;
		  	miss = 0;
		  	outside.loop();

		  	//creating a for loop
		  	for ( var i = 0; i < birds.length; i++)
		  	{
		  		birdsY[i] = (random(100,500));
		  		birdsX[i] = (random(-150,0));
		  		//fine tune the speed if too fast
		  		birdsSpeed[i] = (random(2,6));
		  	}
		}
		//hard button with smaller target area making it necessary for the shot to be precise.
		if(dist(mouseX,mouseY,width/2 + 120,400) <= 75)
		{
			playerSize = 40;
			state = "play";
			playerX = (300);
		  	playerY = (300);

		  	hit = 0;
		  	miss = 0;
		  	outside.loop();

		  	//creating a for loop
		  	for ( var i = 0; i < birds.length; i++)
		  	{
		  		birdsY[i] = (random(100,500));
		  		birdsX[i] = (random(-150,0));
		  		//fine tune the speed if too fast
		  		birdsSpeed[i] = (random(2,6));
		  	}
		}

		
	}


	//making it so that if the state is in controls andthe player clicks on the x button, they will be
	//taken back to the start screen
	if(state == "controls")
	{
		if(dist(mouseX,mouseY,550,50) <=25)
		{
			state = "start";
		}
	}


}