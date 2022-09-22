@heroku-cli/plugin-free
===============

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@heroku-cli/plugin-free.svg)](https://npmjs.org/package/@heroku-cli/plugin-free)
[![Downloads/week](https://img.shields.io/npm/dw/@heroku-cli/plugin-free.svg)](https://npmjs.org/package/@heroku-cli/plugin-free)
[![License](https://img.shields.io/npm/l/@heroku-cli/plugin-free.svg)](https://github.com/heroku/heroku-cli-plugin-free/blob/master/package.json)

The `apps:free` Heroku CLI plugin shows the apps using free dynos or free data (PostgreSQL & Redis).

# Usage

To get started, install the plugin from NPM.

```
$ heroku plugins:install @heroku-cli/plugin-free
```

With the plugin installed, you can run it without any arguments to fetch all apps across personal and any Heroku Team you’re a part of.

```
$ heroku apps:free

=== Apps with Free Dynos & Data
 Name                           Team             Dyno Postgresql                     Redis
 ────────────────────────────── ──────────────── ──── ────────────────────────────── ────────────────────────────────────────────
 example-app-12345              none             true postgresql-flexible-54321      redis-vertical-1234
 example-prod-23456             none             true postgresql-acute-54321         none
 example-qa-34567               none             true none                           redis-clean-12345
 example-test-89012             none             true none                           none
 my-example-app                 none             true example-db,other-example-1234  redis-vertical-4567
 team-example-app               example-team     none postgresql-acute-12345         none
 team-example-app-test          example-team     none postgresql-aerodynamic-23456   redis-clean-98765
```
This table provides the following fields:

* Name: This column contains the Heroku application name. In [terminals that support hyperlinks](https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda), the link takes you to the resource page of the application.
* Team: The team that owns the application. `none` means it’s a personal application.
* Dyno: If this is true, then the application is using free dynos and must be upgraded to the hobby tier before Novermber 28, 2022.
* Postgresql: This column contains the list of free `heroku-postgresql` add-ons in use. You can use the add-on name directly to remove it from the application. For example, `heroku addons:remove postgresql-flexible-54321 -a example-app-12345`.
* Redis: This column contains the list of free `heroku-redis` add-ons in use. You can use the add-on name directly to remove it from the application. For example, `heroku addons:remove redis-vertical-1234 -a example-app`.

## Flag: --team

This flag allows you to filter the list by the team. If `none` is passed, it only returns personal applications.

## Flag: --csv

This flag returns the output formatted as a CSV instead of a table.

## Table Flags

### --columns

This flag restricts what columns are returned. It takes a comma separated quoted string: `--column='name,dyno'`.

### --filter

This flag returns rows that match the condition specificed by the filter. It takes a quoted string: `--filter='dyno=true'`.

### --sort

This flag returns an ascending sorted table by the column names. The columns are listed in priority order. It takes a quoted comma-separated list: `--sort='team,name'`.
