require('dotenv').config();
const fetch = require('node-fetch');

const BASE_URL = 'https://api.meaningcloud.com/sentiment-2.1';
const { API_KEY } = process.env;

module.exports = {
  getTest: (_, res) => {
    res.send({
      title: 'test json response',
      message: 'it works!',
    });
  },
  postAnalyse: async (req, res, next) => {
    try {
      const { url } = req.body;
      const params = {
        key: API_KEY,
        lang: 'en',
        url,
      };
      const response = await fetch(`${BASE_URL}?${new URLSearchParams(params).toString()}`);
      const results = await response.json();
      if (response.status !== 200) {
        next(results.message);
        return res.status(response.status).json({
          success: false,
          message: results.message,
        });
      }
      return res.json({
        success: true,
        results,
      });
    } catch (err) {
      next(err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
