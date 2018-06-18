const moment = require('moment');

// const createdAt = new Date().getTime();
const createdAt = moment().valueOf();
const date = moment(createdAt);

// date.add(2, 'year').subtract(9, 'months');

// console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mma'));
