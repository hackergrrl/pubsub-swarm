var pubsub = require('./index')

var swarm = pubsub('the-topic')

swarm.on('message', function (msg) {
  console.log('message', msg)
  setTimeout(function() { process.exit(0) }, 1000)
})

swarm.on('connected', function () {
  swarm.publish({ data: 'hello world from ' + this.id + '!'})
})
