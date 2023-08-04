1. Copy .env.example to .env
2. Build an image
docker build --tag "nestjs-api" .
3. Run docker-compose 
docker-compose up
4. Seed the database
npm run db:seed
5. app is running on localhost:3000
