heroku-cli-plugin-free
===============

A heroku cli plugin to find your apps using free dynos and data

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/heroku-cli-plugin-free.svg)](https://npmjs.org/package/@heroku-cli/plugin-free)
[![Downloads/week](https://img.shields.io/npm/dw/heroku-cli-plugin-free.svg)](https://npmjs.org/package/@heroku-cli/plugin-free)
[![License](https://img.shields.io/npm/l/heroku-cli-plugin-free.svg)](https://github.com/heroku/heroku-cli-plugin-free/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ heroku plugins:install free
$ heroku free
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`heroku free`](#heroku-free)

## `heroku free`

find your apps using free dynos and data

```
USAGE
  $ heroku free

OPTIONS
  -t, --team=team    team to use. 'none' will return all personal apps
  --columns=columns  select columns to display
  --csv              return table as a csv
  --filter=filter    filter table where this condition is true
  --sort=sort        sort table by these columns

EXAMPLES
  $ heroku free
  $ heroku free --team=none
  $ heroku free --team=keeprubyweird
  $ heroku free --csv
  $ heroku free --filter='dyno=true'
  $ heroku free --columns='name,dyno'
  $ heroku free --sort='team,name'

```

_See code: [src/commands/free.ts](https://github.com/heroku/heroku-cli-plugin-free/blob/main/src/commands/free.ts)_
<!-- commandsstop -->
