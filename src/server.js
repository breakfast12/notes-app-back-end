require('dotenv').config();

const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NotesService = require('./service/postgres/NotesService');
const NotesValidatior = require('./validator/notes/index');

const init = async () => {
    const notesService = new NotesService();
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes:{
            cors: {
                origin: ['*'],
            }
        }
    });

    await server.register({
        plugin: notes,
        options: {
            service: notesService,
            validator: NotesValidatior,
        },
    });
    
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();
