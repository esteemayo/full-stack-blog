import mongoose from 'mongoose';

const devEnv = process.env.NODE_ENV !== 'production';
const { DATABASE, DATABASE_PASSWORD, DATABASE_LOCAL } = process.env;

// const mongoURI = DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD);
const dbLocal = DATABASE_LOCAL;

// const connectionStr = devEnv ? dbLocal : mongoURI;
const connectionStr = dbLocal;

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(connectionStr);
    console.log(`Connected to MongoDB → ${con.connection.port}`.gray.bold);
  } catch (err) {
    throw err;
  }
};

mongoose.set('strictQuery', false);

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to Database'.rainbow.bold);
});

db.on('disconnected', () => {
  console.log('Database disconnected'.strikethrough.bold);
});

db.on('error', (err) => {
  console.log(err);
});
