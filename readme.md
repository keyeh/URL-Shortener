# URL Shortener

> Simple URL Shortener written in NodeJS and Express

## Online demo

https://shorten.pi.keyeh.io (Hosted on Raspbery Pi Docker swarm)

In case the above link doesn't work try http://35.229.113.190
## Assumptions

-   Straight HTML. No need for any CSS. (basic/ugly frontend is ok)
-   Sequential IDs fine. I would use prefer to use something like [hashids](https://hashids.org) to prevent enumeration
-   The long URL must be less than 2000 characters
-   SQLite is used for ease of development. See notes in `db.js`
-   Don't need to handle DB locking / multiple app servers
-   No caching needed yet
-   Don't need to track analytics/number of visits per short URL

## Running Locally

Developed on NodeJS v10.11.0 but should work on version 8 or later

```sh
git clone git@github.com:keyeh/URL-Shortener.git
npm install
npm start
```

Open http://localhost:9000

To run tests use `npm run test`
