Documentation will attempt to lean on the side of too much as this project may be updated by a casual contributor. Please try to help keep everything understandable!

REMEMBER: as long as the interfaces of the code are well structured, tangles can be undone.

RANDO: on the question of using semicolins to use or not, I went with not. Where you see them is copied code.

#Incomplete
Development Setup
Install Postgres
Clone Repo
Server setup
  from the server folder run:
    npm install
  copy ormconfig.example.json and rename as ormconfig.json
  update DB username and password
  in seperate terminals run two commands:
    npm run watch-ts
    npm run watch-node
  connecting to localhost:3000 should respond with "Welcome..."
DB setup
Client setup
  from the client folder run:
    npm install
    npm run start
