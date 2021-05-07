# pg-dashboard

Web-based client for PostgreSQL databases written in JavaScript.

## Overview

pg-dashboard is a web-based PostgreSQL client, written in JavaScript and works on macOS, Linux, and Windows machines. The project was created to illustrate the possibility to roll out a portable application on your work works with both local or remote PostgreSQL databases.

## Getting Started

### System Recommendation

* Postgres 10+
* node.js 14.16+
* yarn (optional)

## Installation

Create a clone of the repository

```sh
$ git clone https://github.com/rockacola/pg-dashboard.git
```

### Server Setup

Install required node.js packages

```sh
$ yarn install
```

### Client Setup

Install required node.js packages

```sh
$ yarn install
```

## Usage

### Server Usage

```sh
$ cd server/
$ yarn debug
```

Or to run as a production environment:

```sh
$ cd server/
$ yarn start
```

### Client Usage

Create a copy of the environment variable file.

```sh
cd client/
cp .env.template .env
```

Update the configuration details.

```sh
$ cd client/
$ yarn start
```

## Test

### Server Testings

Create a copy of the environment variable file for testing.

```sh
cd server/
cp .env.test.template .env.test
```

Update the configuration details to suit your hosting need.

### Client Testings

TBA

## Feedback

Please [open an issue](https://github.com/rockacola/pg-dashboard/issues/new) if you want to leave feedback.

## License

Open-source [MIT](https://github.com/rockacola/pg-dashboard/LICENSE.md).
