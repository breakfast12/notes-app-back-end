const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NotesService = require('./service/inMemory/NotesService');
const NotesValidatior = require('./validator/notes/index');

const init = async () => {
    const notesService = new NotesService();
    const server = Hapi.server({
        port: 3000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
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
