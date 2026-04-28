const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();

const API_KEY = process.env.GOOGLE_API_KEY;

app.get("/api/lighthouse", async (req, res) => {
    const url = req.query.url;

    try {
        const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${API_KEY}`;

        const response = await fetch(api);
        const data = await response.json();

        const lighthouse = data.lighthouseResult.categories;

        res.json({
            performance: Math.round(lighthouse.performance.score * 100),
            seo: Math.round(lighthouse.seo.score * 100),
            mobile: Math.round(lighthouse["best-practices"].score * 100),
            conseil: "Optimisez vitesse, SEO et mobile pour plus de clients."
        });

    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.listen(3000, () => console.log("API démarrée"));