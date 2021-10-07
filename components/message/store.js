
const Model = require('./model');


function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages(filterUser){
    let filter = {};
    if (filterUser){
        filter = { user: filterUser }
    }
    messages = await Model.find(filter);
    return messages;
}

async function updateMessage(id, message){
    try{
        const messageIns = await Model.findOne({
            _id: id
        });
        messageIns.message = message;
        return messageIns.save();
    }catch(error){
        throw new Error('Ocurrio un error al actualizar', error);
    }
}

async function deleteMessage(id){
    return await Model.deleteOne({ _id: id})
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}