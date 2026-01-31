import express, { Router } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDB } from './db/connection.js';
import adminRouter from './src/routes/admin.router.js';
import blogRouter from './src/routes/blog.router.js';
import commentRouter from './src/routes/comment.router.js';
const app = express();
const port = process.env.PORT || 2000;
const allowedOrigins = [
  'https://blog-nest-client.vercel.app', // production frontend
  'http://localhost:5173'                // local frontend
];


// Middlewares
app.use(express.json());
// Allowed origins

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true
// }));


app.use(cors({
  origin: true,
  credentials: true
}));


// connect with database
connectDB();


// routes
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);
app.use('/api/comment', commentRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});