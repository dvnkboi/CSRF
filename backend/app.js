const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const { default: helmet } = require('helmet');
const csrf = require('csurf');


const users = [];

app.use(cors({
  credentials: true,
}));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const csrfProtection = csrf({
  cookie: true
});

const path = __dirname + '/views/';
app.use(express.static(path));

app.post('/signup', (req, res) => {
  const userExists = users.find(user => user.id === req.body.id || user.email === req.body.email);

  if (userExists)
    return res.status(400).json({
      status: 'fail',
      message: 'User already exists'
    });

  const user = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    balance: req.body.balance,
    token: req.body.id,
  };

  users.push(user);

  console.log(users);

  res.cookie('token',
    user.token,
    { httpOnly: true }
  );

  res.json({
    status: 'success',
    action: 'signup',
    data: user
  });
});


app.post('/login', (req, res) => {
  const userExists = users.find(user => user.id === req.body.id || user.email === req.body.email);

  if (!userExists) {
    return res.status(400).json({
      status: 'fail',
      message: 'User does not exist'
    });
  }

  userExists.token = userExists.id;

  users.map(user => {
    if (user.id === userExists.id) {
      user.token = userExists.token;
    }
  });

  console.log(users);

  res.cookie('token',
    userExists.token,
    { httpOnly: true }
  );

  res.json({
    status: 'success',
    action: 'login',
    data: userExists
  });
});

app.get('/transfer', (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  const user = users.find(user => user.token === token);
  if (!user) {
    return res.status(401).json({
      status: 'fail',
      message: 'Not logged in'
    });
  }
  const from = req.query.from * 1;
  const to = req.query.to * 1;
  const amount = req.query.amount * 1.0;

  if (!user || user.id != from) {
    return res.status(401).json({
      status: 'fail',
      message: 'Not authorized'
    });
  }

  if (user.balance < amount || amount < 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'invalid amount'
    });
  }

  users.map(user => {
    if (user.id === from) {
      console.log(`deducted ${amount} from ${user.name} new balance is ${user.balance - amount}`);
      user.balance -= amount;
    }
    if (user.id === to) {
      console.log(`added ${amount} to ${user.name} new balance is ${user.balance + amount}`);
      user.balance += amount;
    }
  });


  res.json({
    status: 'success',
    action: 'transfer',
    data: {
      from,
      to,
      amount
    }
  });
});

app.use(csrfProtection);

app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  res.status(403);
  res.json({
    message: 'invalid csrf token',
  });
});

app.post('/transfer', (req, res) => {
  const token = req.cookies.token;
  const user = users.find(user => user.token === token);

  if (!user) {
    return res.status(401).json({
      status: 'fail',
      message: 'Not logged in'
    });
  }

  const from = req.body.from * 1;
  const to = req.body.to * 1;
  const amount = req.body.amount * 1.0;

  if (!user || user.id != from) {
    return res.status(401).json({
      status: 'fail',
      message: 'Not authorized'
    });
  }

  if (user.balance < amount || amount < 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'invalid amount'
    });
  }

  users.map(user => {
    if (user.id === from) {
      console.log(`deducted ${amount} from ${user.name} new balance is ${user.balance - amount}`);
      user.balance -= amount;
    }
    if (user.id === to) {
      console.log(`added ${amount} to ${user.name} new balance is ${user.balance + amount}`);
      user.balance += amount;
    }
  });

  res.json({
    status: 'success',
    action: 'transfer',
    data: {
      from,
      to,
      amount
    }
  });
});

app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.get("*", (req, res, next) => {
  res.sendFile(path + "index.html");
});

exports = module.exports = app;