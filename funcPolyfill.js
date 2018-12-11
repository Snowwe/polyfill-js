//****************************** 14) Function.bind
Function.prototype.myBind = function (fn) {
    const thisFn = this;
    return function () {
        return thisFn.apply(fn);
    }
};
//****************************** 15) Function.call
Function.prototype.myCall = function () {

};
//****************************** 16) Function.apply
Function.prototype.myApply = function () {

};


//****************************** tests

const user = {
    firstName: "Вася",
    sayHi: function() {
        console.log( this.firstName );
    }
};

setTimeout(user.sayHi, 1000);
setTimeout(user.sayHi.myBind(user), 1000);

