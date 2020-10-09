# Fullstack: PostgreSql - Express - React

Followed this course in Udemy: https://www.udemy.com/course/react-fullstack-with-nodeexpress-psql-and-aws/

The same course for free: https://www.freecodecamp.org/news/react-express-fullstack-search-engine-with-psql/

For my own edification I put all the modules in a Docker Container and converted the Frontend and Backend to TypeScript.

## Initial Start script
This script will do two things 
1. Build the containers
2. Start them and run them in the background

```shell
docker-compose up --build -d
```

## Start script after build
This script will only start the containers and run them in the background

```shell
docker-compose up -d
```

## TO DO:

- [x] Put 3 modules in a Docker Container
- [x] Initialize PostgreSql DB with tables
- [ ] Convert Frontend  to TypeScript and react Hooks
- [ ] Convert Backend to TypeScript