# Reddit Tutorial Assignment

This is a tutorial assignment that teaches you how to interact with the Reddit API using JavaScript and Node.

## Getting Started

Before you can start working with the Reddit API, you need to create a Reddit app and get your app ID and secret. You can do this by following these steps:

1. Go to https://www.reddit.com/prefs/apps.
2. Click the "Create App" or "Create Another App" button.
3. Enter a name for your app, select "web app" as the app type, and enter a redirect URI (e.g. http://localhost:3000/callback).
4. Click "Create App".
5. Copy the "client ID" and "client secret" values from the app details page.

Once you have your app ID and secret, you can clone this repository and install the dependencies:

```sh
git clone https://github.com/your-username/reddit-tutorial.git
cd reddit-tutorial
npm install
```

## Usage

To run the tutorial code, you can use the following command:

```npm start```

This will start a local server at http://localhost:3000 that you can use to interact with the Reddit API.

The tutorial code provides several endpoints that you can use to perform different actions, such as getting the top posts in a subreddit, submitting a new post, or commenting on an existing post.

You can use a tool like Postman or cURL to send HTTP requests to these endpoints and see the results.