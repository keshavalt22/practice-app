var express = require('express');
var router = express.Router();

// var User = require("../models/userSchema");

// // router.get('/', function (req, res, next) {
// //     res.send('respond with a formdata');
// // });

// router.get('/', (req, res, next) => {
//     User.find({}).then((users) => {
//         res.json(users)
//     })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// router.post('/', (req, res, next) => {
//     User.create(req.body)
//         .then(() => console.log(req.body))
// })

// router.get('/edit/:id', (req, res, next) => {
//     let id = req.params.id;
//     User.findById(id).then((user) => {
//         res.json(user);
//     })
// })

// router.post('/edit/:id', (req, res, next) => {
//     let id = req.params.id;
//     let user = req.body;
//     User.findByIdAndUpdate((id), user).then((user) => {
//         res.json(user);
//     })
// })

// router.delete('/:id', (req, res, next) => {
//     let id = req.params.id;
//     User.findByIdAndDelete(id).then((user) => {
//         res.send(id)
//     })
// })


module.exports = router;
