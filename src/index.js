import express from "express";
import api from "./api/index.js";

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json())


app.use("/", (req, res, next) => {
    const headerAuth = req.headers["x-blog-app-key"] === process.env.APP_KEY;
    const queryStrAuth = req.query["api-key"] === process.env.APP_KEY;

    if (headerAuth || queryStrAuth) {
        next()
    } else {
        res.status(401).json({ response: "Anauthorized" });
    }
});

app.get("/", (req, res) => {
    res.json({ response: "Hello there!" });
});

app.use("/api", api);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(process.env.NODE_ENV)
});
