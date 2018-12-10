//****************************** 14) Function.bind
//****************************** 15) Function.call
//****************************** 16) Function.apply
Function.prototype.myApply=function(){

};
/* мин/макс числа в массиве */
let numbers = [5, 6, 2, 3, 7];

/* используем apply к Math.min/Math.max */
let max = Math.max.apply(null, numbers); /* Это эквивалентно Math.max(numbers[0], ...)
                                            или Math.max(5, 6, ...) */
let min = Math.min.apply(null, numbers);