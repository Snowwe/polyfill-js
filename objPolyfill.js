//****************************** 1) Object.create

Object.MyCreate = function (proto, params) {

    const o = {};
    o.prototype = proto;
    return o;

};

//****************************** 2) Object.keys
Object.myKeys = function (obj) {

    const arrKeys = [];
    for (let key in obj) {
        arrKeys.push(key);
    }

    return arrKeys;
};

//****************************** 17) Object.freeze
Object.myFreeze = function (obj) {

    Object.defineProperty(obj, key, {
        configurable: false,
        writable: false,
    });

    return obj;
};

//*************************tests
// Массив
let arr = ['a', 'b', 'c'];
console.log(Object.keys(arr));
console.log(Object.myKeys(arr));

// Массивоподобный объект
const obj = {3: 'a', 4: 'b', 5: 'c'};
console.log(Object.keys(obj));
console.log(Object.myKeys(obj));

// Массивоподобный объект со случайным порядком ключей
const an_obj = {100: 'a', 2: 'b', 7: 'c'};
console.log(Object.keys(an_obj));
console.log(Object.myKeys(an_obj));
