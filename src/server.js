// mengimpor dotenv dan menjalankan konfigurasinya
require('dotenv').config();

const Hapi = require('@hapi/hapi');

// notes
const notes = require('./api/notes');
const NoteService = require('./services/postgres/NotesService');
const NotesValidator = require('./validator/notes');

//users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const init = async () => {
  const noteService = new NoteService();
  const userService = new UsersService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
        cors: {
            origin: ['*'],
        },
    },
  });

  await server.register([
    {
      plugin: notes,
      options: {
        service: noteService,
        validator: NotesValidator,
    },
  },
  
  {
    plugin: users,
    options: {
      service: userService,
      validator: UsersValidator,
    },
  },
]);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
