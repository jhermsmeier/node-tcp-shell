#!/usr/bin/env node

var TCP = require( 'net' )
var TLS = require( 'tls' )
var REPL = require( 'repl' )

var log = console.log.bind( console )

log( '' )

var options = require( 'optimist' )
  .usage( 'Usage: tcp <port> <host>' )
  .boolean( 'help' )
  .describe( 'help', 'Display this usage help' )
  .boolean( 'tls' )
  .describe( 'tls', 'Enable TLS' )
  .boolean( 'crlf' )
  .describe( 'crlf', 'Use <CRLF> as EOL' )
  .alias({
    help: 'h',
    tls: 's',
    crlf: 'c',
  })

var argv = options.argv

if( argv._.length === 0 || argv.help ) {
  return options.showHelp()
}

var transport = argv.tls ? TLS : TCP
var EOL = argv.crlf ? '\r\n' : '\n'
var socket = transport.connect({
  port: argv._.shift(),
  host: argv._.shift(),
})

var repl = REPL.start({
  prompt: '',
  input: process.stdin,
  output: process.stdout,
  ignoreUndefined: true,
  terminal: false,
  eval: function eval( cmd, context, filename, callback ) {
    cmd = cmd.replace( /^\(\s*|\s*\)$/mg, '' ) + EOL
    socket.write( cmd, function() {
      callback( null )
    })
  }
})

repl.on( 'exit', function() {
  socket.end()
  socket.close()
})

socket.pipe( process.stdout )

socket.on( 'connect', function() {
  var remote = this.remoteAddress + ':' + this.remotePort
  var local = this.address().address + ':' + this.address().port
  log( '[CONNECTION]', local, '->', remote )
  log( '' )
})

socket.on( 'secureConnect', function() {
  var remote = this.remoteAddress + ':' + this.remotePort
  var local = this.address().address + ':' + this.address().port
  log( '[CONNECTION]', local, '->', remote )
  log( '' )
})

socket.on( 'timeout', function() {
  log( '' )
  log( '[CONNECTION:TIMEOUT]' )
})

socket.on( 'close', function() {
  log( '' )
  log( '[CONNECTION:CLOSED]' )
  process.exit()
})

socket.on( 'error', function( error ) {
  log( '' )
  console.error( '[CONNECTION:ERROR]', error.message )
})
