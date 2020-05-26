# pubsub-swarm

> Form a p2p swarm of nodes around a topic and exchange messages.

## Background

This module provides a simple pubsub interface on top of an unstructured swarm
of peers interested in a common topic string. Distributed pubsub! It's meant to
be used as a primitive to build server-less applications without needing to have
a deeper understanding of distributed systems.

This module doesn't make guarantees about latencies, nor does it guarantee
delivery. Gossip isn't as fast as flooding, but it's a very robust means of
propagating data over an unstructured network. If the network is stable message
should reach every node, but partitions can occur in the network and bridging
peers can drop out at any time.

Messages are cryptographically signed by their creator and given a unique
sequence number. This means that a. each incoming message can be verified that
it came from its claimed author, and that b. peers will not report duplicate
messages (e.g. if two different peers deliver them).


## Example

```js
var pubsub = require('pubsub-swarm')

var swarm = pubsub('the-topic')

swarm.on('message', function (msg) {
  console.log('message', msg)

  setTimeout(function() { process.exit(0) }, 1000)
})

swarm.on('connected', function () {
  swarm.publish({ data: 'hello world from ' + this.id + '!'})
})
```

Run two copies of this:

```
$ node example.js &
$ node example.js &
```

Running this in two terminals shows the message exchange:

```
found + connected to peer
message { data: 'hello world from
WpiDF+5f+HRTrm2JOmNHTPyGlYGpAN3QNNwwsu3RtbY=.ed25519!' }
found + connected to peer
message { data: 'hello world from
JxafbAD7qjHCpQY+G/2i1B7vMmBlNTC7HEh9GfP+5yY=.ed25519!' }
```

## API

```js
var pubsub = require('pubsub-swarm')
```

### var swarm = pubsub(topic)

Returns a new pubsub swarm interested in the topic `topic` (string). It will
begin searching for other interested peers  using the BitTorrent DHT and
multicast DNS.

### swarm.on('message', function (msg) {})

Emits when a new message has been received by a peer.

### swarm.publish(msg)

Publish a message to the rest of the swarm. It will gradually propogate through
the swarm using [periodic gossip](https://github.com/noffle/secure-gossip).

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install pubsub-swarm
```

## License

ISC
