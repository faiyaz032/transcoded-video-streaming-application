require('dotenv').config();
import app from './app';
import connectDatabase from './config/database';

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  try {
    console.log(`Server is alive on PORT:${PORT}`);
    await connectDatabase();
  } catch (error) {
    console.log(`Error connecting Database`);
  }
});
