![logo name](https://user-images.githubusercontent.com/74154385/229306579-2e820193-cd80-417d-9ee3-bab904cca774.png)

## Overview

> _Seamless automates the deployment process from push to Prod_

Seamless's backend is comprised of an [Express](https://expressjs.com/) server connected to a [Postgres](https://www.postgresql.org/) database through the [Prisma](https://www.prisma.io/) ORM. It utilizes the Amazon Web Service's [Software Development Kit](https://aws.amazon.com/sdk-for-javascript/) (SDK) to communicate with select parts of Seamless' infrastructure, including the [Step Functions](https://aws.amazon.com/step-functions/).

## Developer Usage

1. Run `npm install`
2. Initialize `.env` with variables matching those found in `.env.example`. Specify a `DATABASE_URL` to use during development or deployment.
3. Run `npx prisma migrate deploy` to setup the schema and perform subsequent schema migrations.

## Deploying the Application

Create an ECR repository on AWS with the name `seamless-backend`. Click "View push commands" and follow the instructions to build and push the image to ECR. In order to deploy Seamless's infrastructure using this image for the backend. The service should automatically connect to the RDS instance created with the CDK.

### Deployment Commands

Run `./deploy.sh` as an authenticated user.

## Database

### Commands to Deploy the Database

```sh
npx prisma migrate deploy
```
- To setup the schema and perform subsequent schema migrations.

### Commands to Seed the Database

```sh
prisma db seed
```
- To manually seed prisma.

```sh
prisma migrate dev
```
```sh
primsa migrate reset
```
- Both of these commands automatically seed the database.
- To skip seeding, pass the `--skip-seed` flag.


## The Team
**<a href="https://github.com/jasonherngwang" target="_blank">Jason Wang</a>** _Software Engineer_ • Los Angeles, CA

**<a href="https://github.com/ethanjweiner" target="_blank">Ethan Weiner</a>** _Software Engineer_ • Boston, MA

**<a href="https://github.com/RDeJonghe" target="_blank">Ryan DeJonghe</a>** _Software Engineer_ • Denver, CO
