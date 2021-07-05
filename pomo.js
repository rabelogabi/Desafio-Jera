const notificationSound = document.querySelector('#notification');
var pomodoro = {
  
    
    init : function(){
      var self = this;
      this.minutesDom = document.querySelector('#minutes');
      this.secondsDom = document.querySelector('#seconds');
      this.fillerDom = document.querySelector('#filler');
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
      document.querySelector('#work').onclick = function(){
        self.startWork.apply(self);
      };
      document.querySelector('#shortBreak').onclick = function(){
        self.startShortBreak.apply(self);
      };
      document.querySelector('#longBreak').onclick = function(){
        self.startLongBreak.apply(self);
      };
      document.querySelector('#stop').onclick = function(){
        self.stopTimer.apply(self);
      };
      
    },
    VariaveisPomo : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 200/(this.minutes*60);
      this.fillerHeight = 0;  
    },
    startWork: function() {
      this.VariaveisPomo(25, 0, true);
      notificationSound.play();
    },
    startShortBreak : function(){
      this.VariaveisPomo(5, 0, true);
      notificationSound.play();
    },
    startLongBreak : function(){
      this.VariaveisPomo(10, 0, true);
      notificationSound.play();
    },
    stopTimer : function(){
      this.VariaveisPomo(25, 0, false);
      this.updateDom();
    },
    toDoubleDigit : function(n){
      if(n < 10) {
        return "0" + parseInt(n, 10);
      }
      return n;
    },
    updateDom : function(){
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes); 
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
      this.fillerHeight = this.fillerHeight + this.fillerIncrement;
      this.fillerDom.style.height = this.fillerHeight + 'px';
    },
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          
          this.timerComplete();
         
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
      
    },
    timerComplete : function(){
      this.started = false;
      this.fillerHeight = 0;
      notificationSound.play();
     
    }

    
};
window.onload = function(){
  pomodoro.init();
};