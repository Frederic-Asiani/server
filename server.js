const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const API_KEY = process.env.GOOGLE_API_KEY;

app.get("/api/lighthouse", async (req, res) => {
    const url = req.query.url;

    try {
        const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${API_KEY}`;

        const response = await fetch(api);
        const data = await response.json();

        const categories = data.lighthouseResult.categories;

        res.json({
            performance: Math.round(categories.performance.score * 100),
            seo: Math.round(categories.seo.score * 100),
            mobile: Math.round(categories["best-practices"].score * 100),
            conseil: "Optimisez votre site pour gagner plus de clients."
        });

    } catch (error) {
        res.status(500).json({ error: "Erreur API" });
    }
});

app.listen(3000, () => console.log("API running"));
