const url = require('url');
const querystring = require('querystring');

/* second option parses the query */

let { query } = url.parse(
  'https://app.pluralsight.com/player?course=nodejs-advanced&author=samer-buna&name=nodejs-advanced-m5&clip=5&mode=live',
  true
);
console.log(query);

query = querystring.stringify(query);
console.log(query);

const reconstructedUrl = url.format({
  protocol: 'https',
  host: 'app.pluralsight.com',
  pathname: '/player',
  search: `?${query}`
});

console.log(reconstructedUrl);

console.log(querystring.parse(query));
