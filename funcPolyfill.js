//****************************** 14) Function.bind
Function.prototype.myBind = function(fn){
    var thisFunction = this;
    return function returnFunction() {
        return thisFunction.apply(fn);
    };
};

// Function.prototype.myBind = function (fn, context) {
//     const thisFn = this;
//     return function () {
//         return thisFn.apply(context, fn);
//     }
// };
// Function.prototype.myBind = function(fn, context) {
//     // обрезаем ненужные аргументы (функцию и контекст)
//     fn = this;
//     const bindArgs = [].slice.call(arguments, 2);
//     return function() {
//         // здесь все аргументы будут необходимы
//         const fnArgs = [].slice.call(arguments);
//         // собираем все
//         return fn.apply(context, bindArgs.concat(fnArgs));
//     };
// };
//****************************** 15) Function.call
Function.prototype.myCall = function (context, ...arg) {
    context.fnName = this;
    return context.fnName(...arg);

};
//****************************** 16) Function.apply
Function.prototype.myApply = function (context, arr) {
    // context.fnName = this;
    // return context.fnName(...arr);
    const newBind = this.bind(context);
    return newBind(...arr);

};
//****************************** tests

const user = {
    firstName: "Вася",
    sayHi: function () {
        console.log(this.firstName);
    }
};

setTimeout(user.sayHi, 1000);
setTimeout(user.sayHi.bind(user), 1000);
setTimeout(user.sayHi.myBind(user), 1000);

let greet = function (greeting, cry) {
    return greeting + "My name is " + this.name + ". I am " + this.age + cry;
};

const person = {
    name: "John",
    age: 13,
    greet: greet
};
const anotherPerson = {
    name: "Bob",
    age: 65,
    greet: greet
};
let bound = greet.bind(anotherPerson);
console.log(bound("Hello! ", " and I am old "));

bound = greet.myBind(anotherPerson);
console.log(bound("Hello! ", " and I am old "));

//******************* tests call & apply
function greet1(greeting) {
    return `${greeting} ${this.firstName} ${this.lastName}`;
}

const user2 = {
    firstName: "Василий",
    lastName: "Петров",
    greet1: greet1
};
const user3 = {
    firstName: "Иван",
    lastName: "Сидоров",
    greet1
};
console.log(`Call: ${user2.greet1.call(user3, 'Hi')}`);
console.log(`myCall: ${user3.greet1.myCall(user2, 'Hi')}`);

console.log(`Apply: ${user2.greet1.apply(user3, ['Hi'])}`);
console.log(`Apply: ${user2.greet1.myApply(user3, ['Hi'])}`);

/* мин/макс числа в массиве */
const numbers = [5, 6, 2, 3, 7];

/* используем apply к Math.min/Math.max */
let max = Math.max.myApply(null, numbers); /* Это эквивалентно Math.max(numbers[0], ...)
                                            или Math.max(5, 6, ...) */
let min = Math.min.myApply(null, numbers);

console.log(max,min);