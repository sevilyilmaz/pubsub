/**
 * Pub/Sub library that keeps historical data
 * https://jsfiddle.net/sevilyilmaz/493xa2y7/
 */

(function() {
    'use strict';

    var pubsub = {},
        cache = {};

    pubsub.pub = function(id, ...args) {
        if (!cache[id]) {
            cache[id] = {
                callbacks: [],
                args: [args]
            };
        }

        for (var i = 0; i < cache[id].callbacks.length; i++) {
            /**
             * apply method is used to pass an array
             */
            cache[id].callbacks[i].apply(null, args);
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

        for (var i = 0; i < cache[id].args.length; i++) {
            fn.apply(null, cache[id].args[i]);
        }
    };

    pubsub.unsub = function(id, fn) {
        var index;

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
                cache[id].callbacks = cache[id].callbacks.slice(0, index).concat(cache[id].callbacks.slice(index + 1));
            }
        }
    };

    var getPubSub = function() {
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
}());