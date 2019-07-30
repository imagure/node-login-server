const router = require('koa-router')();
const queries = require('../db/queries/users');
const koaBody = require('koa-body');
const validateUser = require('./utils').validateUser;
const encryptPwd = require('./utils').encryptPwd;
const signToken = require('./utils').signToken;
const verifyToken = require('./utils').verifyToken;


router.post('/users', koaBody(), async function(ctx, next) {
  console.log('get /')
  try {
    console.log(ctx.request)
    await verifyToken(ctx.request.header)
    .then(response => {
      if (response){
        // const users = await queries.getAllUsers();
        ctx.body = {status: true, message: 'success'}
      } else {
        ctx.body = {status: false, message: 'Validation Error'}
      }})
  } catch (err) {
    console.log(err)
    ctx.body = {status: false, message: "Failed attempt to verify user"};
  }
})

router.post('/new_user', koaBody(), async function(ctx, next) {
  try {
    console.log('/new_user')
    const name = ctx.request.body.name
    const password = ctx.request.body.password
    const hash = encryptPwd(password)
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
    if (verifyToken(ctx.request.header)) {
      ctx.body = {status: true, message: "You are logged"}
    } else {
      ctx.body = { status: false, message: 'Failed to authenticate' };
    }
  } catch (err) {
    console.log(err)
    ctx.body = {status: false, message: "Failed attempt to verify user"};
  }
});

router.post('/login', koaBody(), async function(ctx, next) {
  try {
    console.log('/login')
    console.log(ctx.request)
    const name = ctx.request.body.name
    const password = ctx.request.body.password
    const hash = await queries.getUserPwd(name)
    if (validateUser(password, hash)) {
      console.log("valid user")
      const payload = {name: ctx.request.body.name}
      const token = signToken(payload);
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