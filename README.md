# Evaluate a News Article with Natural Language Processing Project

## Overview:

This is the fourth assessment project for the Udacity's [Front End Web Developer Nanodegree program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011)

This project aims to build a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. When a user submits a URL of an article, the web page then dispalys sentiment analysis returned from [meaningcloud API](https://www.meaningcloud.com/products/sentiment-analysis), based on the contents of the article.

The project I realised meets the [project specifications](https://review.udacity.com/#!/rubrics/3626/view) required by Udacity.

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
| `yarn compile`     | prod build                | http://localhost:3000                    |
| `yarn compile:dev` | dev build                 | http://localhost:3000                    |
| `yarn dev`         | dev build with hot reload | http://localhost:5000                    |
| `yarn start`       | run the express server    | run the server before opening a browser! |

When running `yarn dev`, you need to run also `yarn start` on a second terminal window.

## After the Aylien API

Once you are hooked up to the Aylien API, you are most of the way there! Along with making sure you are following all the requirements in the project rubric in the classroom, here are a few other steps to make sure you take.

- Parse the response body to dynamically fill content on the page.
- Test that the server and form submission work, making sure to also handle error responses if the user input does not match API requirements.
- Go back to the web pack config and add the setup for service workers.
- Test that the site is now available even when you stop your local server

## Deploying

A great step to take with your finished project would be to deploy it! Unfortunately its a bit out of scope for me to explain too much about how to do that here, but checkout [Netlify](https://www.netlify.com/) or [Heroku](https://www.heroku.com/) for some really intuitive free hosting options.
