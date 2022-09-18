(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.test = factory());
})(this, (function () { 'use strict';

    var foo = {
        text: "hello world!",
    };

    // src/main.js

    function main () {
        console.log(foo.text);
    }

    return main;

}));
