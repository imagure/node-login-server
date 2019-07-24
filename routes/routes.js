const router = require('koa-router')();
const queries = require('../db/queries/users');
const koaBody = require('koa-body');
const validateUser = require('./utils').validateUser;
const encryptPwd = require('./utils').encryptPwd;
const jwt = require('jsonwebtoken');
const fs = require('fs');

const publicKEY  = fs.readFileSync('./public.key', 'utf8');
const privateKEY  = fs.readFileSync('./private.key', 'utf8');

const i  = 'Mysoft corp';          // Issuer 
const s  = 'some@user.com';        // Subject 
const a  = 'http://mysoftcorp.in'; // Audience

const signOptions = {
 issuer:  i,
 subject:  s,
 audience:  a,
 expiresIn:  "12h",
 algorithm:  "HS256"
};

var verifyOptions = {
 issuer:  i,
 subject:  s,
 audience:  a,
 expiresIn:  "12h",
 algorithm:  ["HS256"]
};


router.get('/users', async function(ctx, next) {
  console.log('get /')
  try {
    const users = await queries.getAllUsers();
    ctx.body = {
      status: 'success',
      data: users
    };
  } catch (err) {
    console.log(err)
  }
})

router.post('/new_user', koaBody(), async function(ctx, next) {
  try {
    console.log('/new_user')
    const name = ctx.request.body.name
    const password = ctx.request.body.password
    const hash = encryptPwd(password)
    console.log(name, hash)
    await queries.insertNewUser(name, hash)
    ctx.body = {
      status: "success"
    };
  } catch (err) {
    console.log(err)
    ctx.body = {
      status: "failed"
    };
  }
})


router.post('/verify_user', koaBody(), async function(ctx, next) {
  try {
    console.log('/verify_user')
    const token = ctx.request.header.token
    if (!token) {
      return ({ status: false, message: 'No token provided.' });
    }
    jwt.verify(token, privateKEY, function(err, decoded) {
      if (err) {
        console.log('Token verification error!')
        console.log(err)
        ctx.body = { status: false, message: 'Failed to authenticate' };
      } else {
        console.log('Token verification succeded!')
        const name = decoded.name
        ctx.body = {status: true, message: "You are logged as" + name}
      }
    })
  } catch (err) {
    console.log(err)
    ctx.body = {
      status: false,
      message: "Failed attempt to verify user"
    };
  }
});

router.post('/login', koaBody(), async function(ctx, next) {
  try {
    console.log('/login')
    const name = ctx.request.body.name
    const password = ctx.request.body.password
    const hash = await queries.getUserPwd(name)
    if (validateUser(password, hash)) {
      console.log("valid user")
      const payload = {name: ctx.request.body.name}
      const token = jwt.sign(payload, privateKEY, signOptions);
      ctx.body = {
        token: token,
        status: 'Logged'
      }
    } else {
      console.log("invalid user")
      ctx.body = {
        status: 'Invalid user or password'
      };
    }

  } catch (err) {
    console.log(err);
    console.log("failed validation");
    ctx.body = {
      status: 'Failed Log in'
    };
  }
})

module.exports = {
  router: router
}