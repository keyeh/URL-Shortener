# URL Shortener

> Simple URL Shortener written in NodeJS and Express

## Online demo

https://shorten.pi.keyeh.io

## Assumptions

-   Straight HTML. No need for any CSS. (basic/ugly frontend is ok)
-   The long URL must be less than 2000 characters
-   SQLite is used for ease of development. See notes in `db.js`
-   Not solving for massive scale / horizontal scaling
-   Don't need to handle DB locking / multiple app servers
-   No caching needed yet
-   Don't need to track analytics/number of visits per short URL

## Development setup

NodeJS v10.11.0

```sh
git clone git@github.com:keyeh/URL-Shortener.git
npm install
npm start
```

Open http://localhost:9000

To run tests use `npm run test`