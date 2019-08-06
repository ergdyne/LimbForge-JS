Documentation will attempt to lean on the side of too much as this project may be updated by a casual contributor. Please try to help keep everything understandable!

RANDO: on the question of using semicolins to use or not, I went with not. Where you see them is copied code.

--Incomplete Setup--
Install node (v12.1.0) and npm (use nvm on github)

Development Setup
Clone Repo
Client setup
  from the client folder run:
    npm install
    npm run start

Install Postgres
  Add database and username and password for db

DB setup & Server setup
  from the server folder run:
    npm install
  copy ormconfig.example.json and rename as ormconfig.json
  update DB username and password (or env)
  in seperate terminals run two commands:
    npm run watch-ts
    npm run watch-node
  connecting to 127.0.0.1:3000 should respond with "Welcome..."
