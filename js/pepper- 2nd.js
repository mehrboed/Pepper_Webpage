$(function(){
    var qis, ip, als = {};
	var Speed ;		//global variable for Speed of motor
	//Volume setting 
		var slider = document.getElementById("myRange");
		var output = document.getElementById("lblVolume");
			output.innerHTML = slider.value; // Display the default slider value
		
		// Update the current slider value (each time you drag the slider handle)
		slider.oninput = function() {
			output.innerHTML = this.value;
			//console.log(output.innerHTML);
		var volume = parseInt(output.innerHTML);	//Pepper just accept float as input in function
			als.AlALAudioDevice.setOutputVolume(volume); 
		}
		
		//Speed slide bar
		var slider2 = document.getElementById("myRange2");
		var output2 = document.getElementById("lblSpeed");
			output2.innerHTML = slider2.value; // Display the default slider value
		var SP = parseFloat(output2.innerHTML/10);
			Speed = parseFloat(SP);		
		// Update the current slider value (each time you drag the slider handle)
		slider2.oninput = function() {
			output2.innerHTML = this.value;
			//console.log(output.innerHTML);
		var SP = parseFloat(output2.innerHTML/10);		//slide bar is in range 1to10 but robot just accept 0.1 to 1.0
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
	
    // on clock
    $('#connect-btn').on('click', function(){				// button connect & NAOqi Session 
        
        ip = $('#ip').val();
        // NAOqi Session 
        qis = new QiSession(ip);
        // socketing
        qis.socket(qis)
		
       .on('connect', function(){							// on connect  & qis.service for all components
            
            console.log('[CONNECTED]');
			
			
			document.getElementById('lblConnect').innerHTML = 'Connected';
			document.getElementById('lblConnect').style.color = "green";
			document.getElementById('lblConnect').attributes
			//alert ( '[CONNECTED]' );
			//

			
			//Start qis.service for all components
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
        .on('disconnect', function(){						// on disconnect
            
            console.log('[DISCONNECTED]');
        })
        .on('error', function(){ 							// On error
            
            console.log('[CONNECTION ERROR]');
			document.getElementById('lblConnect').innerHTML = 'Connection error';
			document.getElementById('lblConnect').style.color = "red";
			//alert ( '[Connection error]' );
        });
    });

    //click function
    $('#test-btn').on('click', function(){
        console.log('[say the Text]');
		TextBox = $('#TextBox').val();
        if(als.alTextToSpeech) als.alTextToSpeech.say(TextBox);
    });
	$('#btn-chao1').on('click', function(){
        console.log('[Tschuss]');
        if(als.alTextToSpeech) als.alTextToSpeech.say('#Tschüss');
    });
	$('#btn-hallo').on('click', function(){
        console.log('[Hallo]');
        if(als.alTextToSpeech) als.alTextToSpeech.say('#Hallo');
    });
	$('#btn-wiegehts').on('click', function(){
        console.log('[Wie gehts Ihnenen]');
        if(als.alTextToSpeech) als.alTextToSpeech.say('#Wie gehts Ihnenen');
    });
	$('#btn-chao2').on('click', function(){
        console.log('[AufWiedersehen]');
        if(als.alTextToSpeech) als.alTextToSpeech.say('#AufWiedersehen');
    });
	$('#btn-danke1').on('click', function(){
        console.log('[Danke sehr]');
        if(als.alTextToSpeech) als.alTextToSpeech.say('#Danke Sehr');
    });
	$('#btn-freue').on('click', function(){
        console.log('[Ich freue mich, dich zu sehen]');
        als.alTextToSpeech.say('#Ich freue mich, dich zu sehen');
    });	
	$('#btn-aria').on('click', function(){					//Run ARiA behavior-------------
        if(als.alALBehaviorManager){
			als.alALBehaviorManager.runBehavior("webapi/behavior_1");
			console.log('[run ARiA]');
		}else{
			als.alALBehaviorManager.stopAllBehaviors()
			als.alALBehaviorManager.runBehavior("webapi/behavior_1");
			console.log('[run ARiA with force]');
		}
    });	
	$('#btn-battery').on('click', function(){				//Check the battery
        als.AlALBattery.getBatteryCharge().done(function(val){
			console.log('Batterly level is' ,val);
			document.getElementById('lblBattery').innerHTML = val;
		})
    });	
	$('#btn-shutdown').on('click', function(){				//shutdown		
		als.AlALTabletService.goToSleep ();			//Put the tablet in sleep mode (standby mode).	
		als.AlALSystem.shutdown();	
		
    });	
	$('#btn-restart').on('click', function(){				//restart
		als.AlALSystem.reboot();						

    });	
	$('#btn-sleep').on('click', function(){					//sleep mode
		als.AlALTabletService.goToSleep ();			//Put the tablet in sleep mode (standby mode).	
		als.AlMotion.rest();							

    });	
	$('#btn-wakeup').on('click', function(){				//wake up
		als.AlMotion.wakeUp();
		als.AlALTabletService.wakeUp();				//PWake the tablet (from standby mode).			

    });	
	$('#btn-test1').on('click', function(){
        console.log('[test]');
        
		//als.AlAnimatedSpeech.say("Guten morgen"); 		//animation say

		//als.AlALTabletService.showWebview (); 			//show web page	
		//als.AlALTabletService.loadUrl("http://google.com/");     
		
		//		
		//			
		//		
		//als.alALLeds.fadeRGB("FaceLeds","yellow",0.0); //face leds to yellow,red,blue,green.white			
		//
		

		//als.ALAutonomousLife.setState("disabled"); 		//put the pepper in sleep mode
		//als.ALAutonomousLife.setState("solitary");		//normal life
		//als.ALAutonomousLife.setState("interactive");		//i don't know :\
		//als.ALAutonomousLife.setState("safeguard");		//freezing mode

		

    });	
//-----------------------------------------------button movment function-----------------------------------------------
	document.getElementById("btn-forward").onmousedown = function() {mouseDownF()};
	document.getElementById("btn-forward").onmouseup = function() {mouseUpF()};
	function mouseDownF() {
		console.log('[Forward]');		
	if(Speed<0)						//if movment is in reverse then make it possitive
		Speed=Speed*-1; 
	als.AlMotion.move(Speed,0.0,0.0);
	}

	function mouseUpF() {
		console.log('[Stop]');		
		als.AlMotion.move(0.0,0.0,0.0);
	}
	/*$('#btn-forward').on('click', function(){
        console.log('[Forward]');		
		if(Speed<0)						//if movment is in reverse then make it possitive
			Speed=Speed*-1; 
		als.AlMotion.move(Speed,0.0,0.0);
    });
	function clickFunction(){
		console.log('[Stop]');		
        als.AlMotion.move(0.0,0.0,0.0);
       //code goes here
	};*/

	
	
/*	$('#btn-backward').on('click', function(){
		if(Speed>0)						//check if need to be in reverse mode
			Speed=Speed*-1;
		console.log('[Backward]');		
		        console.log(Speed);	
        als.AlMotion.move(Speed,0.0,0.0);	//speed--> speed of movment that selected from slide bar
    });*/
	
	document.getElementById("btn-backward").onmousedown = function() {mouseDownB()};
	document.getElementById("btn-backward").onmouseup = function() {mouseUpB()};
	function mouseDownB() {
		console.log('[Backward]');		
	if(Speed>0)						//if movment is in reverse then make it possitive
		Speed=Speed*-1; 
	als.AlMotion.move(Speed,0.0,0.0);
	}

	function mouseUpB() {
		console.log('[Stop]');		
		als.AlMotion.move(0.0,0.0,0.0);
	}
	
/*	
	$('#btn-left').on('click', function(){
        if(Speed<0)
			Speed=Speed*-1;
		console.log('[Left]');		
       als.AlMotion.move(0.0,Speed,0.);
    });*/
	
	document.getElementById("btn-left").onmousedown = function() {mouseDownL()};
	document.getElementById("btn-left").onmouseup = function() {mouseUpL()};
	function mouseDownL() {
        if(Speed<0)
			Speed=Speed*-1;
		console.log('[Left]');		
       als.AlMotion.move(0.0,Speed,0.);
	}

	function mouseUpL() {
		console.log('[Stop]');		
		als.AlMotion.move(0.0,0.0,0.0);
	}	
	
/*	$('#btn-right').on('click', function(){
		if(Speed>0)
			Speed=Speed*-1;
        console.log('[Right]');	
		        console.log(Speed);			
        als.AlMotion.move(0.0,Speed,0.0);
    });*/
	
	document.getElementById("btn-right").onmousedown = function() {mouseDownR()};
	document.getElementById("btn-right").onmouseup = function() {mouseUpR()};
	function mouseDownR() {
		if(Speed>0)
			Speed=Speed*-1;
        console.log('[Right]');	
		        console.log(Speed);			
        als.AlMotion.move(0.0,Speed,0.0);
	}

	function mouseUpR() {
		console.log('[Stop]');		
		als.AlMotion.move(0.0,0.0,0.0);
	}	
	
	$('#btn-stop').on('click', function(){
        console.log('[Stop]');		
        als.AlMotion.move(0.0,0.0,0.0);
    });
	$('#btn-cw').on('click', function(){
		if(Speed>0)
			Speed=Speed*-1;
        console.log('[Clockwise rotation]');
				        console.log(Speed);	
        als.AlMotion.move(0.0,0.0,Speed);
    });
	$('#btn-ccw').on('click', function(){
        if(Speed<0)
			Speed=Speed*-1;
		console.log('[Counter Clockwise]');	
        als.AlMotion.move(0.0,0.0,Speed);
    });	
	//                         color of pepper
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
	//speech text box area
	function validate(e){
		var text=e.target.value;
		TextBox = $('#TextBox').val();
				console.log(TextBox);

        if(als.alTextToSpeech) als.alTextToSpeech.say(TextBox);
		document.getElementById("TextBox").value = "";
	}

	setInterval(function(){				//Timer for battery and check the connection
		
		als.AlALBattery.getBatteryCharge().done(function(val){
			//console.log('Batterly level is' ,val);
			document.getElementById('lblBattery').innerHTML = val;
		})
		
		}, 60000); //every minute will check the level Battery
	
	
	});