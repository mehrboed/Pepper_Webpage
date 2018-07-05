$(function(){
    var qis, ip, als = {};
	var Speed ;		//global variable for Speed of motor
	var d = new Date();
	//Volume setting -------------------------------------------------------------------------
		var sliderVolume = document.getElementById("myRange");
		var outputVolume = document.getElementById("lblVolume");
			outputVolume.innerHTML = sliderVolume.value; // Display the default slider value
		
		// Update the current slider value (each time you drag the slider handle)
		sliderVolume.oninput = function() {
			outputVolume.innerHTML = this.value;
			//console.log(output.innerHTML);
		var volume = parseInt(outputVolume.innerHTML);	//Pepper just accept float as input in function
			als.AlALAudioDevice.setOutputVolume(volume); 
		}
		//Bright slide bar -------------------------------------------------------------------------
		var sliderBright = document.getElementById("myRangeBright");
		var outputBright = document.getElementById("lblBright");
			outputBright.innerHTML = sliderBright.value; // Display the default slider value
		var Br = parseFloat(outputBright.innerHTML/100);
			//Speed = parseFloat(Br);		
		// Update the current slider value (each time you drag the slider handle)
		sliderBright.oninput = function() {
			outputBright.innerHTML = this.value;
			//console.log(output.innerHTML);
		var Br = parseFloat(outputBright.innerHTML/100);		//slide bar is in range 1to10 but robot just accept 0.1 to 1.0
		als.AlALTabletService.setBrightness(1); 
		console.log('Current Bright =',Br);
		}		
		//Speed slide bar -------------------------------------------------------------------------
		var sliderSpeed = document.getElementById("myRangeSpeed");
		var outputSpeed = document.getElementById("lblSpeed");
			outputSpeed.innerHTML = sliderSpeed.value; // Display the default slider value
		var SP = parseFloat(outputSpeed.innerHTML/10);
			Speed = parseFloat(SP);		
		// Update the current slider value (each time you drag the slider handle)
		sliderSpeed.oninput = function() {
			outputSpeed.innerHTML = this.value;
			//console.log(output.innerHTML);
		var SP = parseFloat(outputSpeed.innerHTML/10);		//slide bar is in range 1to10 but robot just accept 0.1 to 1.0
			Speed = parseFloat(SP);			//Pepper just accept float as input in function
			console.log('Current Speed =',Speed);
		}		
	//active speech by enter
	var TextBox= document.getElementById("TextBox");
	TextBox.addEventListener("keydown",function(e){
		if(e.keyCode==13){
			validate(e);
		}
	});	
    //----------Connectios-----------------------------------------------------------------------
    $('#connect-btn').on('click', function(){				// button connect & NAOqi Session 
        
        ip = $('#ip').val();
        // NAOqi Session 
        qis = new QiSession(ip);
        // socketing
        qis.socket(qis)		
       .on('connect', function(){		//------------------------------------ on connect  & qis.service for all components            
            console.log('[CONNECTED]');
			document.getElementById('lblConnect').innerHTML = 'Connected';
			document.getElementById('lblConnect').style.color = "green";
			document.getElementById('lblConnect').attributes
			//alert ( '[CONNECTED]' );

			//Start qis.service for all components-------------------------------------
            qis.service('ALTextToSpeech').done(function(ins){
                als.alTextToSpeech = ins;
            });
			qis.service('ALMotion').done(function(ins){
                als.AlMotion  =  ins ; 
            }); 
            qis.service('ALRobotPosture').done(function(ins){ 
                als.AlRobotPosture  =  ins ; 
            }); 
            qis.service('ALAudioDevice').done(function(ins){ 
                als.AlALAudioDevice  =  ins ; 
            }); 
            qis.service('ALAnimatedSpeech').done(function(ins){
				als.AlAnimatedSpeech = ins;
            }); 
            qis.service('ALTabletService').done(function(ins){ 
                als.AlALTabletService  =  ins ; 
            }); 
            qis.service('ALAutonomousLife').done(function(ins){
                als.ALAutonomousLife  =  ins; 
            }); 
            qis.service('ALBehaviorManager').done(function(ins){ 
                als.alALBehaviorManager=ins; 
            }); 
            qis.service('ALBattery').done(function(ins){ 
                als.AlALBattery  =  ins ; 
            }); 
            qis.service('ALBasicAwareness').done(function(ins){
                als.AlALBasicAwareness  =  ins ; 
            }); 
            qis.service('ALAutonomousMoves').done(function(ins){ 
                als.AlALAutonomousMoves  =  ins ; 
            }); 
            qis.service('ALLeds').done(function(ins){ 
                als.alALLeds  =  ins ; 
            }); 
            qis.service('ALSystem').done(function(ins){ 
                als.AlALSystem  =  ins ; 
            }); 
        })
        .on('disconnect', function(){	// ------------------------------------on disconnect
            
            console.log('[DISCONNECTED]');
			document.getElementById('lblConnect').style.color = "yellow";
			document.getElementById('lblConnect').attributes
        })
        .on('error', function(){ 		// ------------------------------------On error
            
            console.log('[CONNECTION ERROR]');
			document.getElementById('lblConnect').innerHTML = 'Connection error';
			document.getElementById('lblConnect').style.color = "red";
			document.getElementById('lblConnect').attributes
			//alert ( '[Connection error]' );
        });
    });
    //----------Buttons function-----------------------------------------------------------------
   /* $('#test-btn').on('click', function(){
        console.log('[say the Text]');
		TextBox = $('#TextBox').val();
        if(als.alTextToSpeech) als.alTextToSpeech.say(TextBox);
    });*/
	$('#btn-chao').on('click', function(){  //-------------Say Goodbye
        console.log('[Tschuss]');
		switch (Math.floor((Math.random() * 5))){
        case 0: als.alTextToSpeech.say('Tschüss');break;
		case 1: als.alTextToSpeech.say('Aufwiedersehen');break;
		case 2: als.alTextToSpeech.say('Servus');break;
		case 3: als.alTextToSpeech.say('Wiedersehen!');break;
		case 4: als.alTextToSpeech.say('schön tag noch!');break;
		default:console.log('[Tschuss=> Error ]');
		}
    });
	$('#btn-hallo').on('click', function(){//-------------Say Hello
        console.log('[Hallo]');
		switch (Math.floor((Math.random() * 5))){
        case 0: als.alTextToSpeech.say('Hallo ');break;
		case 1: als.alTextToSpeech.say('hi');break;
		case 2: als.alTextToSpeech.say('Servus');break;
		case 3: als.alTextToSpeech.say('Hallo, Leute!');break;
		case 4: console.log(d.getHours());
			var x=d.getHours();
				if (x<10)
					als.alTextToSpeech.say('Guten Morgen');
				else if(5<x<17)
					als.alTextToSpeech.say('Guten Tag');
				else 
					als.alTextToSpeech.say('Guten Abend');

			default:console.log('[Hallo=> Error ]');break;
			}
    });
	$('#btn-wiegehts').on('click', function(){//-------------How are you
        console.log('[Wie gehts Ihnenen]');
        if(als.alTextToSpeech) als.alTextToSpeech.say('Wie gehts Ihnenen');
    });
	$('#btn-danke').on('click', function(){//-------------Thanks
        console.log('[Danke ]');
		switch (Math.floor((Math.random() * 5))){
        case 0: als.alTextToSpeech.say('Danke ');break;
		case 1: als.alTextToSpeech.say('Danke Sehr');break;
		case 2: als.alTextToSpeech.say('Vielen Dank!');break;
		case 3: als.alTextToSpeech.say('Recht schönen Dank!');break;
		case 4: als.alTextToSpeech.say('dankeschön');break;
		default:console.log('[Danke=> Error ]');
		}
    });
	$('#btn-freue').on('click', function(){//-------------My pleasure
        console.log('[Freue]');
		switch (Math.floor((Math.random() * 2))){
        case 0: als.alTextToSpeech.say('Ich freue mich, dich zu sehen ');break;
		case 1: als.alTextToSpeech.say('Freut mich, dich kennenzulernen');break;
		default:console.log('[Freue=> Error ]');
		}

    });	
	$('#btn-aria').on('click', function(){			//--------------Run ARiA behavior-------------

			als.alALBehaviorManager.stopAllBehaviors()
			als.alALBehaviorManager.runBehavior("webapi/behavior_1");
			console.log('[run ARiA]');
		
    });	
	$('#btn-stop').on('click', function(){  		//--------------closing all behaviors and tablet
        console.log('[Stop avtivity]');
		als.AlALTabletService.hideWebview()
		als.alALBehaviorManager.stopAllBehaviors()

    });
	$('#btn-google').on('click', function(){		//--------------launch google
		als.AlALTabletService.showWebview (); 			//show web page	
		als.AlALTabletService.loadUrl("http://google.com/");  
		
    });	
	$('#btn-shutdown').on('click', function(){		//--------------shutdown		
		als.AlALTabletService.goToSleep ();			//Put the tablet in sleep mode (standby mode).	
		als.AlALSystem.shutdown();	
		
    });	
	$('#btn-restart').on('click', function(){		//--------------restart
		als.AlALSystem.reboot();						

    });	
	$('#btn-sleep').on('click', function(){			//--------------sleep mode
		als.AlALTabletService.goToSleep ();				//Put the tablet in sleep mode (standby mode).	
		als.AlMotion.rest();							
		als.alALLeds.fadeRGB("AllLeds","magenta",0.0); //set all leds to magenta	
    });	
	$('#btn-wakeup').on('click', function(){		//--------------wake up
		als.AlMotion.wakeUp();
		als.AlALTabletService.wakeUp();				//Wake the tablet (from standby mode).	
		als.alALLeds.reset("AllLeds");				//put leds to default condition
    });	
	$('#btn-test1').on('click', function(){//for test
        console.log('[test]');
        

		//als.alALLeds.fadeRGB("FaceLeds","yellow",0.0); //face leds to yellow,red,blue,green.white			
		//als.ALAutonomousLife.setState("disabled"); 		//put the pepper in sleep mode
		//als.ALAutonomousLife.setState("solitary");		//normal life
		//als.ALAutonomousLife.setState("interactive");		//i don't know :\
		//als.ALAutonomousLife.setState("safeguard");		//freezing mode

		

    });	
//-----------------------------------------------button movment function-----------------------------------------------
	
	//-----------Move Forward-----------
	document.getElementById("btn-forward").onmousedown = function() {mouseDownF()};
	document.getElementById("btn-forward").onmouseup = function() {mouseUpF()};
	function mouseDownF() {			//on click Forward button
		console.log('[Forward]');		
	if(Speed<0)						//if movment is in reverse then make it possitive
		Speed=Speed*-1; 
	als.AlMotion.move(Speed,0.0,0.0);
	}
	function mouseUpF() {			//on release Forward button
		console.log('[Stop]');		
		als.AlMotion.move(0.0,0.0,0.0);
	}
	
	//-----------Move Back-----------
	document.getElementById("btn-backward").onmousedown = function() {mouseDownB()};
	document.getElementById("btn-backward").onmouseup = function() {mouseUpB()};
	function mouseDownB() {			//on click button
		console.log('[Backward]');		
	if(Speed>0)						//if movment is in reverse then make it possitive
		Speed=Speed*-1; 
	als.AlMotion.move(Speed,0.0,0.0);
	}
	function mouseUpB() {			//on release button
		console.log('[Stop]');		
		als.AlMotion.move(0.0,0.0,0.0);
	}

	//-----------Move To Left-----------
	document.getElementById("btn-left").onmousedown = function() {mouseDownL()};
	document.getElementById("btn-left").onmouseup = function() {mouseUpL()};
	function mouseDownL() {			//on click button
        if(Speed<0)
			Speed=Speed*-1;
		console.log('[Left]');		
       als.AlMotion.move(0.0,Speed,0.);
	}
	function mouseUpL() {			//on release button
		console.log('[Stop]');		
		als.AlMotion.move(0.0,0.0,0.0);
	}	
	

	//-----------Move to Right-----------
	document.getElementById("btn-right").onmousedown = function() {mouseDownR()};
	document.getElementById("btn-right").onmouseup = function() {mouseUpR()};
	function mouseDownR() {			//on click button
		if(Speed>0)
			Speed=Speed*-1;
        console.log('[Right]');	
		        console.log(Speed);			
        als.AlMotion.move(0.0,Speed,0.0);
	}
	function mouseUpR() {			//on release button
		console.log('[Stop]');		
		als.AlMotion.move(0.0,0.0,0.0);
	}	
	//-----------Rotate to Left-----------
	document.getElementById("btn-ccw").onmousedown = function() {mouseDownCCW()};
	document.getElementById("btn-ccw").onmouseup = function() {mouseUpCCW()};
	function mouseDownCCW() {			//on click button
        if(Speed<0)
			Speed=Speed*-1;
		console.log('[Counter Clockwise]');	
        als.AlMotion.move(0.0,0.0,Speed);
	}
	function mouseUpCCW() {				//on release button
		console.log('[Stop]');		
		als.AlMotion.move(0.0,0.0,0.0);
	}	
	
	//-----------Rotate to Right-----------
	document.getElementById("btn-cw").onmousedown = function() {mouseDownCW()};
	document.getElementById("btn-cw").onmouseup = function() {mouseUpCW()};
	function mouseDownCW() {			//on click
		if(Speed>0)
			Speed=Speed*-1;
        console.log('[Clockwise rotation]');
			console.log(Speed);	
        als.AlMotion.move(0.0,0.0,Speed);
	}
	function mouseUpCW() {				//on release
		console.log('[Stop]');		
		als.AlMotion.move(0.0,0.0,0.0);
	}		
	

	//--------------------------------------color of pepper-----------
	$('#btn-red').on('click', function(){
		console.log('[Color Red]');	
		als.alALLeds.fadeRGB("AllLeds","red",0.0); //set all leds to red
    });	
	$('#btn-green').on('click', function(){
		console.log('[Color Green]');	
		als.alALLeds.fadeRGB("AllLeds","green",0.0); //set all leds to green
    });	
	$('#btn-blue').on('click', function(){
		console.log('[Color Blue]');
		als.alALLeds.fadeRGB("AllLeds","blue",0.0); //set all leds to blue	
    });	
	$('#btn-yellow').on('click', function(){
		console.log('[Color Yellow]');	
		als.alALLeds.fadeRGB("AllLeds","yellow",0.0); //set all leds to yellow
    });	
	$('#btn-def').on('click', function(){
		console.log('[Default Color]');	
		als.alALLeds.reset("AllLeds"); 				//Set a LED or Group of LEDs to their default state.
    });	
	
	function validate(e){//-----------speech text box area-----------
		var text=e.target.value;
		TextBox = $('#TextBox').val();
				console.log(TextBox);		
        if(als.AlAnimatedSpeech) als.AlAnimatedSpeech.say(TextBox);//animation say-> read the text box
		document.getElementById("TextBox").value = "";
	}

	setInterval(function(){//-----------Timer for battery and check the connection-----------
			//als.AlALTabletService.getBrightness().done(function(val){
			als.AlALBattery.getBatteryCharge().done(function(val){
			document.getElementById('lblBattery').innerHTML = val;
		})
		}, 60000); //every minute will check the level Battery

	});