$(function(){
    var qis, ip, als = {};
	var Speed ;		//global variable for Speed of motor
	var d = new Date();
	var AutonomousBlinking = new Boolean(true);
	var intial = new Boolean(false);
	var counter = "0";
    var rDuration = 0.5;
	var Battery = "0";
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
        if(document.getElementById('radioRobbie').checked) {
			ip = '192.168.1.102';
		}else if(document.getElementById('radioPaula').checked) {
			ip = '192.168.1.126';
		}else if(document.getElementById('radioIP').checked) {
			ip = $('#ip').val();
		}
		//ip = "192.168.1.126";
        // NAOqi Session 
			console.log(ip);
        qis = new QiSession(ip);

        // socketing
        qis.socket(qis)		
       .on('connect', function(){		//------------------------------------ on connect  & qis.service for all components            
			document.getElementById('lblConnect').innerHTML = 'Connected';
			document.getElementById('lblConnect').style.color = "green";
			document.getElementById('lblConnect').attributes;
			//Start qis.service for all components-------------------------------------
            qis.service('ALTextToSpeech').done(function(ins){
                als.AlTextToSpeech = ins;
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
                als.AlAutonomousLife  =  ins; 
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
                als.AlLeds  =  ins ; 
            }); 
            qis.service('ALSystem').done(function(ins){ 
                als.AlALSystem  =  ins ; 
            });
			//Test area of more API
			qis.service('ALAutonomousBlinking').done(function(ins){ 
                als.AlAutonomousBlinking  =  ins ; 
            });
			
			
			

			
			
			//end of the test
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
    //---------------------------------------------------------------------------Buttons function
   /* $('#test-btn').on('click', function(){
        console.log('[say the Text]');
		TextBox = $('#TextBox').val();
        if(als.AlTextToSpeech) als.AlTextToSpeech.say(TextBox);
    });*/
	//-------------------------------------------------------------------------language checkbox setting------------------------
	$('#lang').click(function(){
		if($(this).is(':checked')){
			als.AlTextToSpeech.setLanguage('German');
		} else {
			als.AlTextToSpeech.setLanguage('English');
		}
	});
	//-------------------------------------------------------------------------buttons---------------------------------------------
	$('#btn-chao').on('click', function(){  //-------------Say Goodbye
        console.log('[Tschuss]');
		if ( document.getElementById('lang').checked){ 
			switch (Math.floor((Math.random() * 5))){
				case 0: als.AlTextToSpeech.say('Tschüss');break;
				case 1: als.AlTextToSpeech.say('Aufwiedersehen');break;
				case 2: als.AlTextToSpeech.say('Servus');break;
				case 3: als.AlTextToSpeech.say('Wiedersehen!');break;
				case 4: als.AlTextToSpeech.say('schön tag noch!');break;
				default:console.log('[Tschuss=> Error ]');
			}
		}else{
			switch (Math.floor((Math.random() * 5))){
				case 0: als.AlTextToSpeech.say('Bye');break;
				case 1: als.AlTextToSpeech.say('Good bye!');break;
				case 2: als.AlTextToSpeech.say('see you!');break;
				case 3: als.AlTextToSpeech.say('bye bye!');break;
				case 4: als.AlTextToSpeech.say('Have a nice day');break;
				default:console.log('[good bye=> Error ]');
			}			
		}
    });
	$('#btn-hallo').on('click', function(){//-------------Say Hello
        console.log('[Hallo]');
		if ( document.getElementById('lang').checked){ 
			switch (Math.floor((Math.random() * 5))){
				case 0: als.AlTextToSpeech.say('Hallo ');break;
				case 1: als.AlTextToSpeech.say('hi');break;
				case 2: als.AlTextToSpeech.say('Servus');break;
				case 3: als.AlTextToSpeech.say('Hallo, Leute!');break;
				case 4: console.log(d.getHours());
					var x=d.getHours();
						if (x<10)
							als.AlTextToSpeech.say('Guten Morgen');
						else if(5<x<17)
							als.AlTextToSpeech.say('Guten Tag');
						else 
							als.AlTextToSpeech.say('Guten Abend');

					default:console.log('[Hallo=> Error ]');break;
					}
		}else{
			switch (Math.floor((Math.random() * 5))){
				case 0: als.AlTextToSpeech.say('Hello ');break;
				case 1: als.AlTextToSpeech.say('hi');break;
				case 2: als.AlTextToSpeech.say('holla');break;
				case 3: als.AlTextToSpeech.say('Hi, there!');break;
				case 4: console.log(d.getHours());
					var x=d.getHours();
						if (x<10)
							als.AlTextToSpeech.say('Good Morning');
						else if(5<x<17)
							als.AlTextToSpeech.say('Hello');
						else 
							als.AlTextToSpeech.say('Good evening');
					break;
					default:console.log('[Hallo=> Error ]');break;
			}
			
		}
    });
	$('#btn-wiegehts').on('click', function(){//-------------How are you
        console.log('[Wie gehts Ihnenen]');
		if ( document.getElementById('lang').checked){ 
			als.AlTextToSpeech.say('Wie gehts Ihnenen');
		}else{
			switch (Math.floor((Math.random() * 2))){
				case 0: als.AlTextToSpeech.say('How are you? ');break;
				case 1: als.AlTextToSpeech.say('How are you doing? ');break;
			}
		}
    });
	$('#btn-danke').on('click', function(){//-------------Thanks
        console.log('[Danke ]');
		if ( document.getElementById('lang').checked){ 
			switch (Math.floor((Math.random() * 5))){
				case 0: als.AlTextToSpeech.say('Danke ');break;
				case 1: als.AlTextToSpeech.say('Danke Sehr');break;
				case 2: als.AlTextToSpeech.say('Vielen Dank!');break;
				case 3: als.AlTextToSpeech.say('Recht schönen Dank!');break;
				case 4: als.AlTextToSpeech.say('dankeschön');break;
				default:console.log('[Danke=> Error ]');
			}
		}else{
			switch (Math.floor((Math.random() * 5))){
				case 0: als.AlTextToSpeech.say('Thanks ');break;
				case 1: als.AlTextToSpeech.say('Thank so much');break;
				case 2: als.AlTextToSpeech.say('Thanks a lot');break;
				case 3: als.AlTextToSpeech.say('Appreciated');break;
				case 4: als.AlTextToSpeech.say('i am all gratitude');break;
				default:console.log('[merci=> Error ]');
			}
		}
    });
	$('#btn-freue').on('click', function(){//-------------My pleasure
        console.log('[Freue]');
		if ( document.getElementById('lang').checked){ 
			switch (Math.floor((Math.random() * 2))){
				case 0: als.AlTextToSpeech.say('Ich freue mich, dich zu sehen ');break;
				case 1: als.AlTextToSpeech.say('Freut mich, dich kennenzulernen');break;
				default:console.log('[Freue=> Error ]');
			}
		}else{
			switch (Math.floor((Math.random() * 2))){
				case 0: als.AlTextToSpeech.say(' Im glad to see you ');break;
				case 1: als.AlTextToSpeech.say('I am glad to have seen you');break;
				default:console.log('[Freue=> Error ]');
		}
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
	$('#btn-bootconfig').on('click', function(){  		//-------------- boot-config
        console.log('[boot-config]');
		als.AlALTabletService.hideWebview()
		als.alALBehaviorManager.runBehavior("boot-config/.");
	});
	$('#btn-show-webpage').on('click', function(){		//--------------show the web
		als.AlALTabletService.showWebview (); 			//show web page	
		var URLs = $('#input-url').val();
		als.AlALTabletService.loadUrl(URLs);  
		
    });	
	$('#btn-show-google').on('click', function(){		//--------------show the web
		als.AlALTabletService.showWebview (); 			//show web page	
		var URLs = "https://google.com";
		als.AlALTabletService.loadUrl(URLs);  
		
    });	
	function myFunction(event) {
		var x = event.which || event.keyCode;
		console.log(x);
		switch(x){
			case 117:console.log('[test]');
		}
	}
	$('#logoUni_show').on('click', function(){
		als.ALTabletService.showImage();
		console.log('[show logo of uni on the tablet]');	
    });	
	$('#logoWSJ_show').on('click', function(){
		als.ALTabletService.showImage();
		console.log('[show logo of uni on the tablet]');	
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
		als.AlLeds.fadeRGB("AllLeds","magenta",0.0); //set all leds to magenta	
    });	
	$('#btn-wakeup').on('click', function(){		//--------------wake up
		als.AlMotion.wakeUp();
		als.AlALTabletService.wakeUp();				//Wake the tablet (from standby mode).	
		als.AlLeds.reset("AllLeds");				//put leds to default condition
    });	
	$('#btn-execute').on('click', function(){		//--------------wake up
		if(document.getElementById('radioDisabled').checked) 
			als.AlAutonomousLife.setState("disabled"); 		//put the pepper in sleep mode
        if(document.getElementById('radioSolitary').checked) 
			als.AlAutonomousLife.setState("solitary");		//normal life
        if(document.getElementById('radioInteractive').checked) 
			als.AlAutonomousLife.setState("interactive");		//i don't know 
        if(document.getElementById('radioSafeguard').checked) 
			als.AlAutonomousLife.setState("safeguard");		//freezing mode
	
    });	
	$('#btn-test1').on('click', function(){//for test
        console.log('[test]');
        

		//als.AlLeds.fadeRGB("FaceLeds","yellow",0.0); //face leds to yellow,red,blue,green.white			

    });	
//-----------------------------------------------button movment function-----------------------------------------------
	$('#btn_move_stop').on('click', function(){// stop movmentof pepper
		console.log('[Stop]');
		als.AlMotion.move(0.0,0.0,0.0);
	});
	
	//-----------Move Forward-----------
	document.getElementById("btn_move_forward").onmousedown = function() {mouseDownF()};
	document.getElementById("btn_move_forward").onmouseup = function() {mouseUpF()};
	function mouseDownF() {			//on click Forward button
		console.log('[Forward]');		
	if( Speed < 0)						//if movment is in reverse then make it possitive
		Speed = Speed * -1; 
	als.AlMotion.move(Speed,0.0,0.0);
	}
	function mouseUpF() {			//on release Forward button
		console.log('[Stop]');		
		als.AlMotion.move(0.0,0.0,0.0);
	}
	//-----------Move Forward-----------
	document.getElementById("btn_move_forward").onmousedown = function() {mouseDownF()};
	document.getElementById("btn_move_forward").onmouseup = function() {mouseUpF()};
	function mouseDownF() {			//on click Forward button
		console.log('[Forward]');		
	if( Speed < 0)						//if movment is in reverse then make it possitive
		Speed = Speed * -1; 
	als.AlMotion.move(Speed,0.0,0.0);
	}
	function mouseUpF() {			//on release Forward button
		console.log('[Stop]');		
		als.AlMotion.move(0.0,0.0,0.0);
	}	
	//-----------Move Back-----------
	document.getElementById("btn_move_backward").onmousedown = function() {mouseDownB()};
	document.getElementById("btn_move_backward").onmouseup = function() {mouseUpB()};
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
	document.getElementById("btn_move_left").onmousedown = function() {mouseDownL()};
	document.getElementById("btn_move_left").onmouseup = function() {mouseUpL()};
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
	document.getElementById("btn_move_right").onmousedown = function() {mouseDownR()};
	document.getElementById("btn_move_right").onmouseup = function() {mouseUpR()};
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
	document.getElementById("btn_move_ccw").onmousedown = function() {mouseDownCCW()};
	document.getElementById("btn_move_ccw").onmouseup = function() {mouseUpCCW()};
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
	document.getElementById("btn_move_cw").onmousedown = function() {mouseDownCW()};
	document.getElementById("btn_move_cw").onmouseup = function() {mouseUpCW()};
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
	
	//--------------------------------------program button for testing things-----------
	$('#btn-program').on('click', function(){
		console.log('[programmable part]');	
		//als.AlALTabletService.showWebview("http://198.18.0.1/apps/boot-config/preloading_dialog.html"); //working
		//als.AlALTabletService.showWebview("http://198.18.0.1/apps/boot-config/preloading_dialog.html"); 
		als.AlALTabletService.showWebview("http://198.18.0.1/apps/tablettest-a12269/Url_Page.jpg");
    });	
	
	//--------------------------------------color of pepper----------------------------------------------- LEDs --------------------
	$('#btn-red').on('click', function(){
		console.log('[Color Red]');	
		als.AlLeds.fadeRGB("AllLeds","red",0.0); //set all leds to red
    });	
	$('#btn-green').on('click', function(){
		console.log('[Color Green]');	
		als.AlLeds.fadeRGB("AllLeds","green",0.0); //set all leds to green
    });	
	$('#btn-blue').on('click', function(){
		console.log('[Color Blue]');
		als.AlLeds.fadeRGB("AllLeds","blue",0.0); //set all leds to blue	
    });	
	$('#btn-yellow').on('click', function(){
		console.log('[Color Yellow]');	
		als.AlLeds.fadeRGB("AllLeds","yellow",0.0); //set all leds to yellow
    });	
	$('#btn-cyan').on('click', function(){
		console.log('[Color cyan]');	
		als.AlLeds.fadeRGB("AllLeds","cyan",0.0); //set all leds to cyan
    });	
	$('#btn-magenta').on('click', function(){
		console.log('[Color magenta]');	
		als.AlLeds.fadeRGB("AllLeds","magenta",0.0); //set all leds to magenta
    });	
	$('#btn-def').on('click', function(){
		console.log('[Default Color]');	
		als.AlLeds.reset("AllLeds"); 				//Set a LED or Group of LEDs to their default state.
    });	
	$('#btn-blinking').on('click', function(){
		//als.AlAutonomousBlinking.isEnabled();
		if(AutonomousBlinking){
			als.AlAutonomousBlinking.setEnabled(false);
			console.log('[AutonomousBlinking set off]');
			AutonomousBlinking	= false;		
		}else{
			als.AlAutonomousBlinking.setEnabled(true);
			console.log('[AutonomousBlinking set on]');	
			AutonomousBlinking = true;
		}
    });
	$('#led_blinking').on('click',function () {
        rDuration = 0.05;
        als.AlLeds.fadeRGB( "FaceLed0", 0x000000, rDuration );
        als.AlLeds.fadeRGB( "FaceLed1", 0x000000, rDuration );
        als.AlLeds.fadeRGB( "FaceLed2", 0xffffff, rDuration );
        als.AlLeds.fadeRGB( "FaceLed3", 0x000000, rDuration );
        als.AlLeds.fadeRGB( "FaceLed4", 0x000000, rDuration );
        als.AlLeds.fadeRGB( "FaceLed5", 0x000000, rDuration );
        als.AlLeds.fadeRGB( "FaceLed6", 0xffffff, rDuration );
        als.AlLeds.fadeRGB( "FaceLed7", 0x000000, rDuration );

        //time.sleep( 0.1 );

        rDuration = 0.05;
        als.AlLeds.fadeRGB( "FaceLeds", 0xffffff, rDuration );

    })
	$('#led_cautious').on('click',function () {
		rDuration = 0.2;
        als.AlLeds.fadeRGB( "FaceLed0", 0x1111FF, rDuration );
        als.AlLeds.fadeRGB( "FaceLed1", 0x1111FF, rDuration );
        als.AlLeds.fadeRGB( "FaceLed2", 0x6611FF, rDuration );
        als.AlLeds.fadeRGB( "FaceLed3", 0x1111FF, rDuration );
        als.AlLeds.fadeRGB( "FaceLed4", 0x33CCFF, rDuration );
        als.AlLeds.fadeRGB( "FaceLed5", 0x33CCFF, rDuration );
        als.AlLeds.fadeRGB( "FaceLed6", 0x6611FF, rDuration );
        als.AlLeds.fadeRGB( "FaceLed7", 0x6611FF, rDuration );
        
            //#time.sleep( 0.1 );

        als.AlLeds.fadeRGB( "FaceLed0", 0x33CCFF, rDuration*3 );
        als.AlLeds.fadeRGB( "FaceLed1", 0x33CCFF, rDuration*3 );
        als.AlLeds.fadeRGB( "FaceLed2", 0x33CCFF, rDuration*3 );
        als.AlLeds.fadeRGB( "FaceLed3", 0x33CCFF, rDuration*3 );
        als.AlLeds.fadeRGB( "FaceLed4", 0x1111FF, rDuration*3 );
        als.AlLeds.fadeRGB( "FaceLed5", 0x1111FF, rDuration*3 );
        als.AlLeds.fadeRGB( "FaceLed6", 0x33CCFF, rDuration*3 );
        als.AlLeds.fadeRGB( "FaceLed7", 0x33CCFF, rDuration*3 );
		
    })
	
    $('#led_laugh').on('click',function () {
        als.AlLeds.fadeRGB( "FaceLed0", 0x787e9d, rDuration );
        als.AlLeds.fadeRGB( "FaceLed1", 0x000000, rDuration );
        als.AlLeds.fadeRGB( "FaceLed2", 0x2ec1e9, rDuration );
        als.AlLeds.fadeRGB( "FaceLed3", 0x000000, rDuration );
        als.AlLeds.fadeRGB( "FaceLed4", 0x000000, rDuration );
        als.AlLeds.fadeRGB( "FaceLed5", 0x1e9980, rDuration );
        als.AlLeds.fadeRGB( "FaceLed6", 0x000000, rDuration );
        als.AlLeds.fadeRGB( "FaceLed7", 0x000000, rDuration );

				

        als.AlLeds.fadeRGB( "FaceLed0", 0x0400a1, rDuration*2 );
        als.AlLeds.fadeRGB( "FaceLed1", 0x14a176, rDuration*2 );
        als.AlLeds.fadeRGB( "FaceLed2", 0x000022, rDuration*2 );
        als.AlLeds.fadeRGB( "FaceLed3", 0x000000, rDuration*2 );
        als.AlLeds.fadeRGB( "FaceLed4", 0x00000e, rDuration*2 );
        als.AlLeds.fadeRGB( "FaceLed5", 0x56ffff, rDuration*2 );
        als.AlLeds.fadeRGB( "FaceLed6", 0x000020, rDuration*2 );
        als.AlLeds.fadeRGB( "FaceLed7", 0x000038, rDuration*2 );

    })
    $('#led_thinking').on('click',function () {
        als.AlLeds.fadeRGB( "FaceLed0", 0x1111FF, rDuration );
        als.AlLeds.fadeRGB( "FaceLed1", 0x1111FF, rDuration );
        als.AlLeds.fadeRGB( "FaceLed2", 0x1111FF, rDuration );
        als.AlLeds.fadeRGB( "FaceLed3", 0x1111FF, rDuration );
        als.AlLeds.fadeRGB( "FaceLed4", 0x33CCFF, rDuration );
        als.AlLeds.fadeRGB( "FaceLed5", 0x33CCFF, rDuration );
        als.AlLeds.fadeRGB( "FaceLed6", 0x1111FF, rDuration );
        als.AlLeds.fadeRGB( "FaceLed7", 0x1111FF, rDuration );
        
            //#time.sleep( 0.1 );

        als.AlLeds.fadeRGB( "FaceLed0", 0x33CCFF, rDuration*3 );
        als.AlLeds.fadeRGB( "FaceLed1", 0x33CCFF, rDuration*3 );
        als.AlLeds.fadeRGB( "FaceLed2", 0x33CCFF, rDuration*3 );
        als.AlLeds.fadeRGB( "FaceLed3", 0x33CCFF, rDuration*3 );
        als.AlLeds.fadeRGB( "FaceLed4", 0x1111FF, rDuration*3 );
        als.AlLeds.fadeRGB( "FaceLed5", 0x1111FF, rDuration*3 );
        als.AlLeds.fadeRGB( "FaceLed6", 0x33CCFF, rDuration*3 );
        ALLeds.fadeRGB( "FaceLed7", 0x33CCFF, rDuration*3 );
    })
	$('#led_happy').on('click',function () {
	    for ( var i=0 ; i<3 ; i++){
            setTimeout(myFunction,500);
        }

        function myFunction() {

            als.AlLeds.fadeRGB("FaceLed0", 0x00002e30, rDuration);
            als.AlLeds.fadeRGB("FaceLed1", 0x00002022, rDuration);
            als.AlLeds.fadeRGB("FaceLed2", 0x0020d700, rDuration);
            als.AlLeds.fadeRGB("FaceLed3", 0x00b59b04, rDuration);
            als.AlLeds.fadeRGB("FaceLed4", 0x003aff00, rDuration);
            als.AlLeds.fadeRGB("FaceLed5", 0x00001a2a, rDuration);
            als.AlLeds.fadeRGB("FaceLed6", 0x0000182e, rDuration);
            als.AlLeds.fadeRGB("FaceLed7", 0x00001232, rDuration);


            als.AlLeds.fadeRGB("FaceLed0", 0x00007030, rDuration * 2);
            als.AlLeds.fadeRGB("FaceLed1", 0x00006622, rDuration * 2);
            als.AlLeds.fadeRGB("FaceLed2", 0x00db8f00, rDuration * 2);
            als.AlLeds.fadeRGB("FaceLed3", 0x000aff04, rDuration * 2);
            als.AlLeds.fadeRGB("FaceLed4", 0x00d3dd00, rDuration * 2);
            als.AlLeds.fadeRGB("FaceLed5", 0x00004c2a, rDuration * 2);
            als.AlLeds.fadeRGB("FaceLed6", 0x0000502e, rDuration * 2);
            als.AlLeds.fadeRGB("FaceLed7", 0x00004e32, rDuration * 2);
        }
        als.AlLeds.reset("AllLeds");
    })
	$('#led_off').on('click', function(){
		console.log('[turn leds off]');	
		als.AlLeds.off("AllLeds"); 				//Set a LED or Group of LEDs to their default state.
    });	
	$('#led_on').on('click', function(){
		console.log('[turn leds off]');	
		als.AlLeds.on("AllLeds"); 				//Set a LED or Group of LEDs to their default state.
    });	
	$('#led_disco').on('click', function(){
		console.log('[turn leds off]');	
		als.AlLeds.randomEyes(10.0); 				//Set a LED or Group of LEDs to their default state.
    });	
	$('#led_circle').on('click', function(){
		console.log('[turn leds off]');	
		als.AlLeds.rasta(3.0); 				//Set a LED or Group of LEDs to their default state.
    });	
	
	function validate(e){//-----------speech text box area-----------
		var text=e.target.value;
		TextBox = $('#TextBox').val();
		console.log(TextBox);	
        if(als.AlAnimatedSpeech) als.AlAnimatedSpeech.say(TextBox);//animation say-> read the text box
		document.getElementById("TextBox").value = "";
	}
	
	function Battery_changelevel(para){

		if ( para <= 10 ){
			document.getElementById("battary_container_1").style.backgroundColor = "red";
			document.getElementById("battary_container_2").style.backgroundColor = "#808080";
			document.getElementById("battary_container_3").style.backgroundColor = "#808080";
			document.getElementById("battary_container_4").style.backgroundColor = "#808080";
			document.getElementById("battary_container_5").style.backgroundColor = "#808080";
			document.getElementById("battary_container_6").style.backgroundColor = "#808080";
		}else if( para <= 20 ){
			document.getElementById('battary_container_1').style.backgroundColor = "orange";
			document.getElementById('battary_container_2').style.backgroundColor = "#808080";
			document.getElementById('battary_container_3').style.backgroundColor = "#808080";
			document.getElementById('battary_container_4').style.backgroundColor = "#808080";
			document.getElementById('battary_container_5').style.backgroundColor = "#808080";
			document.getElementById('battary_container_6').style.backgroundColor = "#808080";
		}else if( para <= 40){
			document.getElementById('battary_container_1').style.backgroundColor = "yellow";
			document.getElementById('battary_container_2').style.backgroundColor = "yellow";
			document.getElementById('battary_container_3').style.backgroundColor = "#808080";
			document.getElementById('battary_container_4').style.backgroundColor = "#808080";
			document.getElementById('battary_container_5').style.backgroundColor = "#808080";
			document.getElementById('battary_container_6').style.backgroundColor = "#808080";
		}else if( para <= 60){
			document.getElementById('battary_container_1').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_2').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_3').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_4').style.backgroundColor = "#808080";
			document.getElementById('battary_container_5').style.backgroundColor = "#808080";
			document.getElementById('battary_container_6').style.backgroundColor = "#808080";
		}else if( para <= 80){
			document.getElementById('battary_container_1').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_2').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_3').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_4').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_5').style.backgroundColor = "#808080";
			document.getElementById('battary_container_6').style.backgroundColor = "#808080";
		}else if( para <= 95){
			document.getElementById('battary_container_1').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_2').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_3').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_4').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_5').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_6').style.backgroundColor = "#808080";
		}else{
			document.getElementById('battary_container_1').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_2').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_3').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_4').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_5').style.backgroundColor = "#06ddf9";
			document.getElementById('battary_container_6').style.backgroundColor = "#06ddf9";
		}		
	
	}

	setInterval(function(){//---------------------------------------------------------------------------------Timer for battery and check the connection-----------

		
		//als.AlALTabletService.getBrightness().done(function(val){
		als.AlAutonomousLife.getState().done(function(val){
			document.getElementById('lblState').innerHTML = val;
			})
        als.AlALBattery.getBatteryCharge().done(function(val){	//update battery level
            document.getElementById('lblBattery').innerHTML = val;
			if ( Battery != val){
				Battery = val;
				Battery_changelevel(Battery);
			}
        })
		als.AlALAudioDevice.getOutputVolume().done(function(val){  //update volume range
			document.getElementById('lblVolume').innerHTML=val;
			document.getElementById("myRange").value = val;
		})
		/*if (counter == "5"){
			var robot = als.AlALSystem.robotName();
			document.getElementById('robot_name').innerHTML = robot;
			console.log(robot);
			intial = true;
			
			
		}else
			counter ++;
		
		console.log(counter);
		/*if(intial == false){
			var robot = als.AlALSystem.robotName();
			document.getElementById('robot_name').innerHTML = robot;
			console.log(robot);
			intial = true;
		}*/
    }, 1000); //every minute will check the level Battery

	});