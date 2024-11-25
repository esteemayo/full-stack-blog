import app from './app.js';
import { connectDB } from './libs/connectDB.js';

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), async () => {
  await connectDB();
  console.log(`Server is running on port ${server.address().port}!`);
});
