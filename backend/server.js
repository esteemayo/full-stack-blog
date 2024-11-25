import app from './app.js';
import { connectDB } from './libs/connectDB.js';

const port = process.env.PORT || 3030;

app.set('port', port);

app.listen(app.get('port'), async () => {
  await connectDB();
  console.log(`Server is running on port ${port}!`.cyan.bold);
});
