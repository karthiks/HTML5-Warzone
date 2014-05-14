(function() {
    var currentPrime = 1;
    var intervalID;

    self.addEventListener('message', primes, false);

    function primes(eve) {
        var runningState = eve.data;
        
        if(runningState) {
            //Syntax: setInterval(func|code, delay-in-millis [, param1, param2, ...]);
            intervalID = setInterval(nextPrime, 100);
        }
        else if(intervalID) {
            clearInterval(intervalID);
            intervalID = null;
        }
    }

    function nextPrime() {
        currentPrime++;
        if (isPrime(currentPrime)) {
            postMessage(currentPrime); //Web-worker method
        };
    }

    function isPrime(num) {
        if(num <2 ) return false;
        if (num == 2 || num == 3) return true;
        for (var i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
            if (num%i == 0) return false;
        };
        return true;
    }
})()