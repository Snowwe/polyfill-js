//****************************** 3) Array.pop delete last and return last
Array.prototype.myPop = function () {
    let newArr = [];
    newArr[0] = this[this.length - 1];
    --this.length;

    return newArr;
};

//****************************** 4) Array.push insert last
Array.prototype.myPush = function (...param) {

    for (let i = 0; i < param.length; ++i) {
        this[this.length] = param[i];
    }
    return this.length;

};

//****************************** 5) Array.shift delete first and return first
Array.prototype.myShift = function () {

    let newArr = [];
    newArr[0] = this[0];
    for (let i = 0, len = this.length - 1; i < len; ++i) {
        this[i] = this[i + 1];
    }
    --this.length;

    return newArr;
};

//****************************** 6) Array.unshift insert first
Array.prototype.myUnshift = function (...param) {

    let lenParam = param.length;
    for (let i = this.length + lenParam - 1; i > 0; --i) {
        this[i] = this[i - lenParam];
    }
    for (let i = 0; i < lenParam; ++i) {
        this[i] = param[i];
    }
    return this.length;
};

//****************************** 7) Array.map
Array.prototype.myMap = function (fn) {
    let arr = [];
    this.myForEach(function (el) {
        arr.myPush(fn(el))
    });

    // for (let i = 0, len = this.length; i < len; i++)
    //     arr.myPush(fn(this[i]));

    return arr;
};
//****************************** 8) Array.forEach
Array.prototype.myForEach = function (fn, scope) {
    for (let i = 0, len = this.length; i < len; ++i) {
        fn.call(scope, this[i], i, this);
    }
};

//****************************** 9) Array.filter
Array.prototype.myFilter = function (fn) {
    let arr = [];

    for (let i = 0, len = this.length; i < len; i++) {
        if (fn(this[i])) arr.myPush(this[i]);
    }
    return arr;
};

//****************************** 10) Array.reverse
Array.prototype.myReverse = function () {
    let temp;
    for (let i = 0, len = this.length; i < len / 2; ++i) {
        temp = this[i];
        this[i] = this[len - i - 1];
        this[len - i - 1] = temp;
    }
};

//****************************** 11) Array.join
Array.prototype.myJoin = function (separator) {
    let strJoin = '';
    if (typeof separator === 'undefined') separator = ',';
    for (let i = 0, len = this.length; i < len; ++i) {
        strJoin += this[i];
        if (len - 1 !== i) {
            strJoin += separator;
        }
    }
    return strJoin;
};

//****************************** 12) Array.reduce
Array.prototype.myReduce = function (fn) {
    let res = 0;
    for (let i = 0, len = this.length; i < len; ++i) {
        res = fn(res, this[i]);
    }
    return res;
};

//****************************** 13) Array.sort
Array.prototype.mySort = function (compFunc) {
    console.log(compFunc);
    // if (compFunc === 'undefined') {

    const len = this.length;
    for (let j = 0; j < len; j++) {
        for (let i = 0; i < len - 1; ++i) {

            if (this[i] > this[i + 1]) {
                temp = this[i];
                this[i] = this[i + 1];
                this[i + 1] = temp;
                flag = false;
            }

        }
    }
    // }
    return this;
};

//****************************** 18) Array.some
Array.prototype.mySome = function (fn, thisArg) {
    'use strict';

    let obj = Object(this);

    thisArg = (arguments.length >= 2) ? arguments[1] : void 0;

    for (let i = 0, len = obj.length; i < len; ++i) {
        if (i in obj && fn.call(thisArg, obj[i], i, obj)) {
            return true;
        }
    }

    return false;
};

//****************************** 19) Array.every
Array.prototype.myEvery = function (fn, thisArg) {
    'use strict';
    let obj = Object(this);
    let flag = false;
    thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (let i = 0, len = obj.length; i < len; ++i) {
        if (i in obj && fn.call(thisArg, obj[i], i, obj)) {
            flag = true;
        } else {
            return false;
        }
    }

    return flag;
};


//************************ tests

let arr = [1, 2, 3, 4, 5];

console.log('arr: ' + arr);
let popped = arr.myPop();

console.log('arr after pop: ' + arr);
console.log('pop arr: ' + popped);

arr.myPush('push');
console.log('push arr (push): ' + arr);
arr.myPush(66, 55);
console.log('push arr (66, 55): ' + arr);
let arrShift = arr.myShift();
console.log('arr after shift: ' + arr);
console.log('shift arr: ' + arrShift);

arr.myUnshift('unshift');
console.log('unshift arr (unshift): ' + arr);
arr.myUnshift(99, 88);
console.log('unshift arr (99, 88): ' + arr);
arr.myReverse();
console.log('reverse: ' + arr);

let strJoin = arr.myJoin();
console.log('join: ' + strJoin);
strJoin = arr.myJoin(' *** ');
console.log('join \' *** \': ' + strJoin);
strJoin = [].myJoin(', ');
console.log('join []. \', \': ' + strJoin);

let longWords = arr.myFilter(word => word.length > 3);
console.log('filter len>3: ' + longWords);

let mapArr = arr.myMap(parseInt);
console.log('map Number: ' + mapArr);

console.log('some [2, 5, 8, 1] >10: ' + [2, 5, 8, 1].mySome(elem => elem > 10));  // false
console.log('some [12, 5, 8, 4] >10: ' + [12, 5, 8, 4].mySome(elem => elem > 10)); // true

console.log('every [12, 5, 8, 130] >10: ' + [12, 5, 8, 130].myEvery(elem => elem >= 10));   // false
console.log('every [12, 54, 130, 44] >10: ' + [12, 54, 130, 44].myEvery(elem => elem >= 10)); // true

let reduceRes = [2, 3, 4, 6].myReduce((a, b) => a + b);
console.log('reduce [2, 3, 4, 6]: ' + reduceRes);

let sortedArr = [9, 8, 66, 44, 1].mySort();
console.log(sortedArr);

