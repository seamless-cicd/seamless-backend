# Seamless Backend

Seamless's backend is comprised of an Express server connected to a Postgres database through the Prisma ORM.

## Developer Usage

1. Run `npm install`
2. Initialize `.env` with variables matching those found in `.env.example`. Specify a `DATABASE_URL` to use during development or deployment.
3. Run `npx prisma migrate deploy` to setup the schema and perform subsequent schema migrations.

## Deploying the Database

Run `npx prisma migrate deploy` to setup the schema and perform subsequent schema migrations.