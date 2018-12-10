//****************************** 1) Object.create

Object.prototype.myCreate = function () {
    // To save on memory, use a shared constructor
    function Temp() {
    }

    // make a safe reference to Object.prototype.hasOwnProperty
    let hasOwn = Object.prototype.hasOwnProperty;

    return function (O) {
        // 1. If Type(O) is not Object or Null throw a TypeError exception.
        if (typeof O != 'object') {
            throw TypeError('Object prototype may only be an Object or null');
        }

        // 2. Let obj be the result of creating a new object as if by the
        //    expression new Object() where Object is the standard built-in
        //    constructor with that name
        // 3. Set the [[Prototype]] internal property of obj to O.
        Temp.prototype = O;
        let obj = new Temp();
        Temp.prototype = null; // Let's not keep a stray reference to O...

        // 4. If the argument Properties is present and not undefined, add
        //    own properties to obj as if by calling the standard built-in
        //    function Object.defineProperties with arguments obj and
        //    Properties.
        if (arguments.length > 1) {
            // Object.defineProperties does ToObject on its first argument.
            let Properties = Object(arguments[1]);
            for (let prop in Properties) {
                if (hasOwn.call(Properties, prop)) {
                    obj[prop] = Properties[prop];
                }
            }
        }

        // 5. Return obj
        return obj;
    };
};

//****************************** 2) Object.keys

    Object.prototype.myKeys = (function () {
        'use strict';
        let hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function (obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            let result = [];

            for (let prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (let i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());

//****************************** 17) Object.freeze

Object.prototype.myFreeze = function (obj) {

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

let objCreate;
objCreate=Object.myCreate();
console.log('objCr: '+ objCreate.myKeys);

