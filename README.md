![name](https://user-images.githubusercontent.com/74154385/228689679-1de28721-ca1d-4a6a-a7a9-dbcf26c54f59.png)

## Overview

> _Seamless automates the deployment process from push to Prod_

Seamless's backend is comprised of an Express server connected to a Postgres database through the Prisma ORM.

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
