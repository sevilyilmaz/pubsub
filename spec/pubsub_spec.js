const pubsub = require('../src/pubsub');

describe('when the module init', () => {
    it('should be defined', () => {
        expect(pubsub).toBeDefined();
    });

    it('publish method should be defined', () => {
        expect(pubsub.pub).toBeDefined();
    });

    it('subscribe method should be defined', () => {
        expect(pubsub.sub).toBeDefined();
    });

    it('unsubscribe method should be defined', () => {
        expect(pubsub.unsub).toBeDefined();
    });
});

describe('when something is published', () => {
    let test;

    beforeEach(() => {
        pubsub.sub('lorem', (data) => { test = data; });
        pubsub.pub('lorem', 'ipsum');
    });

    it('should be added to the cache', () => {
        expect(test).toBe('ipsum');
    });
});

describe('when something is published before subscription', () => {
    let test;

    beforeEach(() => {
        pubsub.pub('dolor', 'sit');
        pubsub.sub('dolor', (data) => { test = data; });
    });

    it('should still be accessible later on', () => {
        expect(test).toBe('sit');
    });
});

describe('when unsubscribe from a subscription', () => {
    let test;

    beforeEach(() => {
        pubsub.pub('amet', 'sit');
        pubsub.sub('amet', (data) => { test = data; });
        pubsub.unsub('amet');
        pubsub.pub('amet', 'dolor');
    });

    it('should not be accessible', () => {
        expect(test).toBe('sit');
    });
});

describe('when unsubscribe from a particular subscription', () => {
    let test, test2;
    let testSub = data => { test = data; };
    let testSub2 = data => { test2 = data; };

    beforeEach(() => {
        pubsub.sub('amet', testSub);
        pubsub.sub('amet', testSub2);
        pubsub.unsub('amet', testSub);
        pubsub.pub('amet', 'sit');
    });

    it('should preserve other subscriptions', () => {
        expect(test).not.toBeDefined();
        expect(test2).toBe('sit');
    });
});