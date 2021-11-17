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
- Jest
- Workbox

## Getting started

1. [Install nvm](https://github.com/creationix/nvm#installation)

1. Run `nvm install` to install and use the Node version from the project's .nvmrc file

1. [Install yarn](https://yarnpkg.com/lang/en/docs/install/)

1. Run `yarn install` to install the modules

1. Install watchman `brew install watchman`

1. Sign up for an API key at [meaningcloud.com](https://www.meaningcloud.com/developer/create-account)

1. Create a new `.env` file in the root of the project and fill it with your API key like this:
   ```
   API_KEY=***
   ```

## Running the App

Run the following commands in the terminal and the open a browser window at the corresponding url

| Prod Build                 |
| :------------------------- |
| `yarn compile; yarn start` |
| http://localhost:8080      |

| Dev Build                      |
| :----------------------------- |
| `yarn compile:dev; yarn start` |
| http://localhost:8080          |

| Dev Build with hot reload           |
| :---------------------------------- |
| `yarn dev`                          |
| `yarn start` (on a second terminal) |
| http://localhost:3000               |

## Other commands

| Command       | Action                         |
| :------------ | :----------------------------- |
| `yarn test`   | run unit tests with jest       |
| `yarn format` | format all the files           |
| `yarn lint`   | check the styling of the files |
