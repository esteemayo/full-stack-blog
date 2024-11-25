import app from './app.js';
import { connectDB } from './libs/connectDB.js';

const port = app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), async () => {
  await connectDB();
  console.log(`Server is running on port ${port}!`.cyan.bold);
});
