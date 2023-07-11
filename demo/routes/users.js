var express = require('express');
var router = express.Router();
var User = require("../models/userSchema");
var auth = require("../middlewares/auth");
var app = express();



router.get('/', (req, res, next) => {
  User.find({}).then((users) => {
    res.json(users)
  })
    .catch((err) => {
      console.log(err)
    })
})

// router.post('/', (req, res, next) => {
//   User.create(req.body)
//     .then(() => console.log(req.body))
// })

router.post('/', async (req, res, next) => {
  try {
    var user = await User.create(req.body);
    res.status(201).json({ user: user.userJSON(token) });
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    res.redirect('/');
  }
  try {
    var user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email not registered" });
    }
    var result = await user.verifyPassword(password);
    if (!result) {
      return res.status(400).json({ error: "Invalid password" });
    }
    console.log(result, user.name);
    req.session.userId = user.id;
    res.redirect('/')
    res.json(user);
  } catch (error) {
    next(error)
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/');
})


router.get("/protected", auth.loggedInUser, (req, res) => {
  res.send("hello world")
})

// router.post('/login', (req, res, next) => {
//   var { email, password } = req.body;
//   if (!email || !password) {
//     res.redirect('/');
//   }
//   User.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         return res.redirect('/login')
//       }
//       if (user) {
//         user.verifyPassword(password, (err, result) => {
//           if (!result) {
//             req.flash('error', 'Invalid Password');
//             return res.redirect('/login');
//           }
//           console.log(result, user);
//           res.redirect('/')
//         })
//       }
//     })
// })

// router.use(auth.loggedInUser)

router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;
  User.findById(id).then((user) => {
    res.send(user);
  })
})

router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id;
  let user = req.body;
  User.findByIdAndUpdate((id), user).then((user) => {
    res.json(user);
    res.redirect('/');
  })
})

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  User.findByIdAndDelete(id).then((user) => {
    res.send(id)
  })
})

module.exports = router;
