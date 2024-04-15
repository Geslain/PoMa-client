# PoMa Client

![PoMa Logo](https://github.com/Geslain/PoMa/blob/main/logo.png?raw=true "PoMa Logo")
## Description

PoMa Client of [PoMa](https://github.com/Geslain/PoMa-api) project.
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Features (What to expect)

The app contains the following features
* Login / Sign-up
* Projects CRUD (👋 Don't forget to try the "Inline" edit for project title, just click on it in project page !)
* Users CRUD (👋 Don't forget to try the "Inline" edit for users, just click on user row in user list !)

### TODO (What not to expect)

Some missing features are:
* Unit tests
* e2e test
* More code documentation

## Installation

Please refer to [PoMa](https://github.com/Geslain/PoMa-api) Readme file for install. This app is meant to be used with [docker](https://www.docker.com/).
But still, for development purpose you can install with the following command:

```bash
$ cp .env.template .env # Copy env variables
$ yarn install
```

## Running the app

if you don't want to use docker, you can start the app with the following command

```bash
# development
$ npm run dev
# or
$ yarn dev
# or
$ pnpm dev
# or
$ bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

The ensure a clean and normalized development process, commit hooks have been settled on this project. You can find it in the `.husky` directory

Following tools are used:
* [husky](https://typicode.github.io/husky/)
* [commitlint](https://commitlint.js.org/)
* [commitizen](https://commitizen-tools.github.io/commitizen/)

In addition, every time you commit, code is formatted, linted, and unit and e2e tests are launched.
**This also means that docker must be running in order to be able to commit.**

## License

This project is [MIT licensed](LICENSE).
