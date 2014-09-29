# TCP Shell
[![npm](http://img.shields.io/npm/v/tcp-shell.svg?style=flat)](https://npmjs.org/tcp-shell)
[![npm downloads](http://img.shields.io/npm/dm/tcp-shell.svg?style=flat)](https://npmjs.org/tcp-shell)

## Install via [npm](https://npmjs.org)

```sh
$ npm install --global tcp-shell
```

## Usage

```
Usage: tcp <port> <host>

Options:
  --version, -v  Display version number
  --help, -h     Display this usage help
  --tls, -s      Use TLS / SSL
  --crlf, -c     Use <CRLF> as EOL
```

## Example

```sh
$ tcp --tls --crlf 993 imap.gmail.com
```

```
[CONNECTION] 192.168.1.5:58499 -> 74.125.25.108:993

* OK Gimap ready for requests from 118.93.93.244 7mb48335792pbn
1 LOGOUT
* BYE Logout Requested 7mb48335792pbn
1 OK Quoth the raven, nevermore... 7mb48335792pbn

[CONNECTION:CLOSE]
```
