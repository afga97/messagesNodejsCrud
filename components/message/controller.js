const response = require('../../network/responses')
const store = require('./store');

const addMessageHandler = function clousureAddMessage(){
    return function clousureHandlerAddMessage(req, res){
        res.status(200).send('Creado Correctamente');
    }
}

function addMessage(req, res) {
    user = req.body.user;
    message = req.body.message;
    if (!user || !message) response.error(req, res, 'Los datos son incorrectos', 500);
    let fileUrl = '';
    if (req.file){
        fileUrl = 'http://localhost:3000/app/files/' + req.file.filename;
    }
    const fullMessage = {
        user,
        message,
        date: new Date(),
        file: fileUrl
    }
    try{
        store.addMessage(fullMessage);
        response.success(req, res, fullMessage);
    }catch(error){
        response.error(req, res, 'Ocurrio un error al crear el mensaje', 500, error);
    }
}

async function getMessages(req, res){
    try{
        let filterUser = req.query.user || null
        const messages = await store.getMessages(filterUser);
        response.success(req, res, { 'body': messages } );
    }catch(error){
        response.error(req, res, 'Ocurrio un error al recuperar los mensajes', 500, error);
    }
}

function addMessagePromise(user, message) {
    return new Promise( (resolve, reject) => {
        if (!user || !message) reject('Los datos son incorrectos');
        const fullMessage = {
            user,
            message,
            date: new Date()
        }
        resolve(fullMessage)
    });
}

async function updateMessage(req, res){
    if (!req.params.id ||  !req.body.message) return response.error(req, res, 'Datos invalidos para la actualizacion', 500);
    let messageUpdate = null;
    try {
        messageUpdate = await store.updateMessage(req.id, req.body.message)
    }catch(error){
        return response.error(req, res, 'Ocurrio un error al actualizar el mensaje', 500, error);
    }
    response.success(req, res, { message: 'Actualizado correctamente', 'messageUpdate': messageUpdate } );
}

function updateMessageTwo(req, res){
    return new Promise( async (resolve, reject ) =>{
        if (!req.params.id ||  !req.body.message) reject('datos invalidos');
        let messageUpdate = null;
        try {
            messageUpdate = await store.updateMessage(req.params.id, req.body.message)
        }catch(error){
            reject('ocurrio un error al guardar')
        }
        resolve(messageUpdate);
    })
}

const updateMessageThree = async function(req, res){
    if (!req.params.id ||  !req.body.message) {
        return response.error(req, res, 'Datos invalidos para la actualizacion', 500, 'datos invalidos');
    }
    let messageUpdate = null;
    try {
        messageUpdate = await store.updateMessage(req.params.id, req.body.message)
    }catch(error){
        return response.error(req, res, 'Ocurrio un error al actualizar el mensaje', 500, error);
    }
    response.success(req, res, { message: 'Actualizado correctamente', 'messageUpdate': messageUpdate } );
}

const deleteMessage = async function(req, res){
    if (!req.params.id) {
        return response.error(req, res, { error: 'Datos invalidos para la eliminación' }, 500, 'datos invalidos');
    }
    let messageDelete = null;
    try {
        messageDelete = await store.deleteMessage(req.params.id);
    }catch(error){
        return response.error(req, res, { error: 'Ocurrio un error al eliminar el mensaje'}, 500, error)
    }
    response.success(req, res, { message: 'Eliminado correctamente', data: messageDelete });
}


module.exports = {
    addMessage,
    addMessageHandler,
    addMessagePromise,
    getMessages,
    updateMessage,
    updateMessageTwo,
    updateMessageThree,
    deleteMessage
}