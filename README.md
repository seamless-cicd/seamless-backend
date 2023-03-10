# Seamless Backend

Seamless's backend is comprised of an Express server connected to a Postgres database through the Prisma ORM.

## Developer Usage

1. Run `npm install`
2. Initialize `.env` with variables matching those found in `.env.example`. Specify a `DATABASE_URL` to use during development or deployment.
3. Run `npx prisma migrate deploy` to setup the schema and perform subsequent schema migrations.

## Deploying the Application

Create an ECR repository on AWS with the name `seamless-backend`. Click "View push commands" and follow the instructions to build and push the image to ECR. In order to deploy Seamless's infrastructure using this image for the backend. The service should automatically connect to the RDS instance created with the CDK.

### Deployment Commands

`aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/p6x2h7y7`
`docker build --no-cache -t seamless-backend .`
`docker tag seamless-backend:latest public.ecr.aws/p6x2h7y7/seamless-backend:latest`
`docker push public.ecr.aws/p6x2h7y7/seamless-backend:latest`

## Database
`
### Deploying the Database

Run `npx prisma migrate deploy` to setup the schema and perform subsequent schema migrations.

### Seeding the Database

Run `prisma db seed` to manually seed prisma.

Running `prisma migrate dev` or `primsa migrate reset` automatically seeds the database. To skip seeding, pass the `--skip-seeed` flag.


