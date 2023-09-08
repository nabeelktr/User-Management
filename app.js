import express from "express";
import hbs from "express-handlebars";
import path from "path";
import colors from "colors";
import adminRouter from "./routes/adminRoutes.js"
import userRouter from "./routes/userRoutes.js"
import { fileURLToPath } from 'url';
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import { errorHandler } from "./middleware/errorHandler.js";


dotenv.config()
connectDB()

const PORT = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine({ extname: 'hbs' }));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});


app.use(errorHandler)

app.use('/', userRouter);
app.use('/admin', adminRouter);

app.listen(PORT, () => {
    console.log('Listening to PORT..'.bgGreen.bold)
})


export default app;