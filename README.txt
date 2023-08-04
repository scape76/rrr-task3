1. Build an image
docker build --tag "nestjs-api" .
2. Run docker-compose 
docker-compose up
3. Seed the database
npm run seed:db
4. app is running on localhost:3000