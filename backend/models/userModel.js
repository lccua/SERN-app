const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { v4: uuidv4 } = require('uuid'); // Import UUID generator

const prisma = new PrismaClient();

const User = {};

// signup method
User.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough');
  }

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw Error('Email already in use');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Generate UUID
  const id = uuidv4();

  // Create user
  const newUser = await prisma.user.create({
    data: {
      id,
      email,
      password: hash,
    }
  });

  return newUser;
};

// login method
User.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw Error('Incorrect Email');
  }

  // Compare passwords
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = User;
