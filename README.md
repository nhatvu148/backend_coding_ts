# Run Docker Compose

- docker-compose up -d --build

# Intialize DB for manual test

- npx ts-node src/helpers/initDB.ts

# Endpoint to get sport and associated players by sport name

- http://localhost:8080/api/sports?sportName=Soccer
