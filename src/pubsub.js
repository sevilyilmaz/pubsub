/**
 * Pub/Sub library that keeps historical data
 * https://jsfiddle.net/sevilyilmaz/493xa2y7/
 */

(function() {
    'use strict';

    let pubsub = {},
        cache = {};

    pubsub.pub = function(id, ...args) {
        if (!cache[id]) {
            cache[id] = {
                callbacks: [],
                args: [args]
            };
        }

        for (let i = 0; i < cache[id].callbacks.length; i++) {
            cache[id].callbacks[i](...args);
        }
    };

    pubsub.sub = function(id, fn) {
        if (!cache[id]) {
            cache[id] = {
                callbacks: [fn],
                args: []
            };
        } else {
            cache[id].callbacks.push(fn);
        }

        for (let i = 0; i < cache[id].args.length; i++) {
            fn(...cache[id].args[i]);
        }
    };

    pubsub.unsub = function(id, fn) {
        let index;

        if (!id) {
            return;
        }

        if (!fn) {
            cache[id] = {
                callbacks: [],
                args: []
            };
        } else {
            index = cache[id].callbacks.indexOf(fn);

            if (index !== -1) {
                cache[id].callbacks.splice(index, 1);
            }
        }
    };

    let getPubSub = function() {
        return pubsub;
    };

    if (typeof define === 'function' && define.amd) {
        define(function() {
            return getPubSub();
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = getPubSub();
    } else {
        window.pubsub = getPubSub();
    }
})();