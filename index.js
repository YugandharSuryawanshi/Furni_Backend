// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import express from 'express';
// import upload from 'express-fileupload';
// import { adminRoute } from './routers/admin_route.js';
// import { userRoute } from './routers/user_route.js';

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(upload());
// app.use(express.static("public"));

// //Configure CORS
// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use('/', userRoute);
// app.use('/admin', adminRoute);

// const PORT = process.env.PORT || 1000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });



import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import upload from 'express-fileupload';
import { adminRoute } from './routers/admin_route.js';
import { userRoute } from './routers/user_route.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload());
app.use(express.static("public"));

// Configure CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Test route to check server is running
app.get('/', (req, res) => {
    res.send('✅ Furniture Backend running on Vercel!');
});

app.use('/user', userRoute);
app.use('/admin', adminRoute);

// ❌ REMOVE this line for Vercel
// const PORT = process.env.PORT || 1000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// ✅ Instead, EXPORT the app for Vercel
export default app;
