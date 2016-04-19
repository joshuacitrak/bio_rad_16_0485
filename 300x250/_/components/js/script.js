function startAd(){  
    
    var btl = new TimelineLite();
    btl.from("#b1", .6, {opacity:0, scale:.8, ease: Elastic.easeOut.config(1, 0.5)})
    .from("#t1", .3, {opacity:0, ease: Power3.easeOut}, "-=.6")
    .to("#b1Container", .3, {y:-53, ease: Power3.easeOut}, 4)
    .from("#b2", .6, {opacity:0, scale:.8, ease: Elastic.easeOut.config(1, 0.5)}, "-=.2")
    .from("#t2", .3, {opacity:0, ease: Power3.easeOut}, "-=.6")
    .to("#b1Container", .3, {y:-67, ease: Power3.easeOut}, 8)
    .to("#b2Container", .3, {y:-17, ease: Power3.easeOut}, 8)
    .from("#b3", .6, {opacity:0, scale:.8, ease: Elastic.easeOut.config(1, 0.5)}, "-=.2")
    .from("#t3", .3, {opacity:0, ease: Power3.easeOut}, "-=.6")
    .from("#t4", .3, {opacity:0, ease: Power3.easeOut}, "+=2.7")
    .to("#b1Container", .6, {opacity:0, ease: Power3.easeOut}, 14)
    .to("#b2Container", .6, {opacity:0, ease: Power3.easeOut}, 14)
    .to("#b3Container", .6, {opacity:0, ease: Power3.easeOut}, 14)
    .to("#t4", .6, {opacity:0, ease: Power3.easeOut}, 14);
    
    var itl = new TimelineLite()
    itl.from("#t5", .6, {opacity:0, ease: Power3.easeOut})
    .from("#bradIconContainer", .6, {opacity:0, ease: Power3.easeOut}, "-=.6");
    
    var ctl = new TimelineLite();
    ctl.from("#bradCtaButton", .4, {opacity:0,ease: Power3.easeOut})
    
    tl.add(btl, 0);
    tl.add(itl, 14.4)
    tl.add(ctl, 14.4);
    
    tl.totalDuration(15);
           
};

function addListeners(){
    document.getElementById("bradContent").addEventListener("click", clickthrough);
};

function clickthrough() {
    EB.clickthrough();
}


function animationComplete(evt){
};

function checkInit() {
              if (!EB.isInitialized()) {
                 EB.addEventListener(EBG.EventName.EB_INITIALIZED, onInit); 
                 // This code checks whether the EB object is initialized, if the object is initialized, it
                     //launches the function "onInit", otherwise "EB_INITIALIZED" event. 
              }
              else {
                      onInit();
               }         
               function onInit() {
    
    TweenLite.set("#bradContainer", {opacity:1});
    addListeners();
    startAd();
              } 
     }

window.addEventListener('load', checkInit);

var tl = new TimelineLite({onUpdate:updateSlider});
tl.eventCallback("onComplete", animationComplete);


$("#play").click(function() {
  //play() only plays forward from current position. If timeline has finished, play() has nowhere to go.
  //if the timeline is not done then play() or else restart() (restart always restarts from the beginning).

  if(tl.progress() != 1){
    //carl just changed this again
		tl.play();
  } else {
    tl.restart();
  }
});
		
$("#pause").click(function() {
		tl.pause();
});
		
$("#restart").click(function() {
		tl.restart();
});		
	
$("#slider").slider({
  range: false,
  min: 0,
  max: 100,
  step:.1,
  slide: function ( event, ui ) {
    tl.pause();
    //adjust the timeline's progress() based on slider value
    tl.progress( ui.value/100 );
    }
});	
		
function updateSlider() {
  $("#slider").slider("value", tl.progress() *100);
} 	