# devit-monorepo
DevIT test task.

Yet another CRUD app.

Monorepo with client and server.
User auth is done with JWT tokens.
Rss feed is being fetched on the backend with the help of cron task at every 15th minute.
Items are shown on the '/feed' route.
After login user gains access to protected route '/admin' where he can create, edit and delete items.

## Setup
  - clone repo
  - cd devit-monorepo
  
  ```
  npm install
  ```
  ```
  npm run start:dev
  ```

  ### Docker
  ```
  docker build -t devit-monorepo .
  ```
  ```
  docker start -p 3000:3000 -p 5000:5000 devit-monorepo:latest
  ```
## Login
  email: test@example.com
  
  password: 123456789012
