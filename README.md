# Cachable Pub/Sub [![Codeship Status for sevilyilmaz/pubsub](https://app.codeship.com/projects/2a1a61d0-a35a-0134-d227-26264aac178c/status?branch=master)](https://app.codeship.com/projects/190236) [![Code Climate](https://codeclimate.com/github/sevilyilmaz/pubsub/badges/gpa.svg)](https://codeclimate.com/github/sevilyilmaz/pubsub) [![Test Coverage](https://codeclimate.com/github/sevilyilmaz/pubsub/badges/coverage.svg)](https://codeclimate.com/github/sevilyilmaz/pubsub/coverage)

Pub/Sub library that keeps historical data. It's possible to publish before subscription then subscribe and get the data that  was published.

## Usage

### Subscription

    pubsub.sub([ID], callback);
    pubsub.sub('lorem', (data) => data);

### Publish

    pubsub.pub([ID], data);
    pubsub.pub('lorem', 'ipsum');
    pubsub.pub('lorem', { data: 'ipsum'});

You may pass multiple arguments to the subscription.

    pubsub.pub('lorem', 'ipsum', 'dolor');

### Unsubscribe

To unsubscribe from all subscriptions that has the ID "lorem".

    pubsub.unsub('lorem');

To unsubscribe from only one subscription that has the ID "lorem".

    pubsub.unsub('lorem', callback);
