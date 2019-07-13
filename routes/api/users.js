const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');


//@route  POST api/users/register
//@desc   Register user
//@access  public route
router.post('/register', (req, res) => {

    User
    .findOne({username: req.body.username})
    .then(user => {
        if(user){
            return res.status(400).json("This username already exists");
        }
        User
        .findOne({email: req.body.email})
        .then(user => {
            if(user){
                return res.status(400).json("This email already exists");
            }
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name : req.body.name,
                email : req.body.email,
                avatar,
                username : req.body.username,
                password: req.body.password

            });

            bcrypt.genSalt(10, (err, salt) => {
                if(err) throw err;
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));

                })
            })

        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

//@route POST api/users/login
//@desc  Login user
//@access public route 
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //Find user by email
    User.findOne({username})
    .then(user => {
        if(!user){
            return res.status(400).json("User not found");
        }
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch){
                    //Create a JWT payload
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    };

                    //Sign token
                    jwt.sign(payload, 
                        keys.secretOrKey,
                        {expiresIn: 3600},
                        (err, token) => {
                            if(err){
                                throw err;
                            }
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        });
                }
                else{
                    return res.status(400).json("Password incorrect");
                }
            })
    })
    .catch(err => console.log(err));
})

//@route   GET api/login/current
//@desc    return current user
//@access  private route
router.get('/current', 
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.json({msg: 'Success'});
        
        
})












module.exports = router;


