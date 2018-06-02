const express = require('express');
const hbs = require('hbs');

const app = express();
const port = '3000';

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', text => text.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    pageMessage: `Welcome Home`,
    message:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque quod nulla consequuntur eveniet ipsum, mollitia ipsa at impedit, non officia harum quo quis cupiditate reprehenderit, repellendus obcaecati eius. Velit, aliquid?'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    pageMessage: `We are here for you.`
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.'
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
