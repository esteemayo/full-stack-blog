import app from './app.js';

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), async () => {
  console.log(`Server is running on port ${server.address().port}`);
});
