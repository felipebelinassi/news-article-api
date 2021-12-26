# 📰 News Article API
> NodeJS API built with TypeScript

## Table of Contents
  - [Getting Started](#getting-started)
    - [Step 1: Set up the development environment](#step-1-set-up-the-development-environment)
    - [Step 2: Clone the project](#step-2-clone-the-project)
    - [Step 3: Install dependencies](#step-3-install-dependencies)
    - [Step 4: Init the application](#step-4-init-the-application)

## Getting Started
### Step 1: Set up the development environment

You need to set up your development environment before you can do anything.

- Install [Node.js and NPM](https://nodejs.org/en/download/)
- Install yarn globally. This is **optional** since you can use npm, but be aware that the documentation will mention the yarn scripts.
  
```bash
npm i -g yarn
```

### Step 2: Clone the project

Fork or clone this project and then open it using your favorite IDE.
```bash
git clone git@github.com:felipebelinassi/news-article-api.git

# Open the project directory
cd news-article-api
```

Copy the `.env.example` file and rename it to `.env`. In this file you have to add the required environment variables for the application to work. You can see the details regarding the variables in the [Environment Variables](#-environment-variables) section.

### Step 3: Install dependencies

After cloning the project, you need to install the required dependencies for it to run.

```bash
yarn
```

### Step 4: Init the application

Finally you can start your project with the following script.

```bash
yarn start
```

## API Documentation

The service is documented using OpenAPI 3.0 standards. The spec file is located on `docs/apiSpec.json`. You can also access the Swagger interface by running the application and opening the following route in your browser:
`http://localhost:{{port}}/docs`

## Environment Variables

The list bellow features the environment variables defined in the application. All variables are **required**.

| Environment               | Description                                   |
|-------------------------- |---------------------------------------------- |
| PORT                      | Port where the server will start              |