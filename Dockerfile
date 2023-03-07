# Base
FROM node:19-alpine AS base
WORKDIR /app
COPY package*.json ./

# Build stage
FROM base AS build
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/src/index.js"]

# Build for production
FROM base as prod-build
RUN npm install --only=production
COPY prisma prisma
RUN npx prisma generate
RUN cp -R node_modules prod_node_modules

# Final production layer
FROM base as prod
COPY --from=prod-build /app/prod_node_modules /app/node_modules
COPY --from=build  /app/prisma /app/prisma
COPY --from=build  /app/dist /app/dist
EXPOSE 3000
CMD ["npm", "start"]