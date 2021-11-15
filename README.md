# Evaluate a News Article with Natural Language Processing Project

## Live Demo:

This project has been published to my personal heroku account and can be viewed visiting<br /> [https://my-evaluate-news-nlp-app.herokuapp.com/](https://my-evaluate-news-nlp-app.herokuapp.com/)

## Overview:

This is the fourth assessment project for the Udacity's [Front End Web Developer Nanodegree program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011)

This project aims to build a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. When a user submits a URL of an article, the web page then dispalys sentiment analysis returned from [meaningcloud API](https://www.meaningcloud.com/products/sentiment-analysis), based on the contents of the article.

The project I realised meets the [project specifications](https://review.udacity.com/#!/rubrics/3626/view) required by Udacity.

## Tech Stack:

- HTML
- CSS
- JavaScript
- Node
- Express
- Webpack
- meaningcloud API
- Jest (TODO!)
- Workbox

## Getting started

1. Use [nvm](https://github.com/nvm-sh/nvm) to install the required version node (v14.17.3)

1. Install the modules
   by running `yarn`

1. Sign up for an API key at [meaningcloud.com](https://www.meaningcloud.com/developer/create-account)

1. Create a new `.env` file in the root of the project and fill it with your API key like this:
   ```
   API_KEY=***
   ```
1. 7. Start the project

| Commands           | Action                    | Open Broswer                             |
| :----------------- | :------------------------ | :--------------------------------------- |
| `yarn compile`     | prod build                | http://localhost:8080                    |
| `yarn compile:dev` | dev build                 | http://localhost:8080                    |
| `yarn dev`         | dev build with hot reload | http://localhost:3000                    |
| `yarn start`       | run the express server    | run the server before opening a browser! |

When running `yarn dev`, you need to run also `yarn start` on a second terminal window.
