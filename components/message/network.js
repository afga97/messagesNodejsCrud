const express = require('express');
const response = require('../../network/responses');
const controller = require('./controller');
const router = express.Router()
const { upload } = require('../../multer')
router.get('/', function (req, res) {
    console.log(req.headers);
    res.send('Lista de mensajes');
})

router.get('/messages', (req, res) => controller.getMessages(req, res));

router.post('/add', controller.addMessageHandler());

router.post('/',  upload.single('file'), (req, res) => controller.addMessage(req, res));

router.post('/addpromise', (req, res) => {
    controller.addMessagePromise(req.body.user, req.body.message)
        .then( (data) => {
            response.success(req, res, data, 201);
        })
        .catch( e => {
            response.error(req, res, 'Información invalida', 400, `Error al crear el mensaje ${e}`);
        })
})


//router.patch('/:id', (req, res) => controller.updateMessage(req, res));

/*router.patch('/:id', (req, res) => controller.updateMessageTwo(req, res).then( data => {
    response.success(req, res, data, 201);
})
.catch( e => {
    response.error(req, res, 'Información invalida', 400, `Error al actualizar el mensaje ${e}`);
})
);*/

router.patch('/:id', controller.updateMessageThree);

router.delete('/:id', controller.deleteMessage)
module.exports = router;