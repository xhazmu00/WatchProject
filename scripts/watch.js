// zakomponování workeru kvůli tomu, že setinterval 
// nefungoval na neaktivních tabu v prohlížeči
const worker = new Worker('./scripts/watchWorker.js');

let hour = 00;
let minute = 00;
let second = 00;
let count = 00;
let once = true;

const restartBtn = document.getElementById('restart');
const startBtn = document.getElementById('start');

worker.addEventListener('message', function(e){
    setWatch();
});

restartBtn.addEventListener('click', function () {
    stopWatch();   
    restartWatch();
});

startBtn.addEventListener('click', function () {
    if (once) {
        once = false;
        startWatch();
    }
    else{
        once = true;
        stopWatch();   
    }
});

function startWatch() {
    worker.postMessage('start');
}

function stopWatch(){
    worker.postMessage('stop');
}

function restartWatch(){
    once = true;
    timer = false;
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('count').innerHTML = "00";
}

function setWatch() {

        count++;

        if (count == 100) {
            second++;
            count = 0;
        }

        if (second == 60) {
            minute++;
            second = 0;
        }

        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        let hrString = hour;
        let minString = minute;
        let secString = second;
        let countString = count;

        if (hour < 10) 
            hrString = "0" + hrString;
        if (minute < 10) 
            minString = "0" + minString;
        if (second < 10) 
            secString = "0" + secString;
        if (count < 10) 
            countString = "0" + countString;

        document.getElementById('hr').innerHTML = hrString;
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;

}
