# GraphQL Server Boilerplate

A GraphQL server boilerplate made with Node.js, Apollo Server and MongoDB. The starting schema is based on a social media app with Users and Posts, with authentication middleware.

## Installation

1. Clone project

```
git clone https://github.com/martinyoussef/graphql-server-boilerplate.git
```

2. cd into folder

```
cd graphql-server-boilerplate
```

3. Download dependencies

```
yarn
```

4. Create a new MongoDB cluster and get a new API key
5. Setup environment variables.

```
Add API Key and secret to a .env file (see .env_sample for reference).
```

## Usage

You can start the server with `yarn start` then navigate to `http://localhost:5000` to use GraphQL Playground.

## Features

- Register (Email confirmation to be added)
- Login
- Forgot Password (to be added)
- Cookies
- Authentication middleware
- Testing (Jest - to be added)
