import axios from 'axios';
import bcrypt from 'bcrypt';
import DB from '../db';

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await DB.single('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);

    if (!user) throw new Error('No user found with this email');

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) throw new Error('Incorrect password');

    res.cookie('userId', user.id);
    res.cookie('userEmail', user.email);
    res.send({ user });
  } catch (err) {
    res.send({ error: true, message: err.message });
  }
};

export const signOut = (_, res) => {
  res.clearCookie('userId');
  res.send({ success: true, message: 'User logged out' });
};

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 6);

    const user = await DB.single('INSERT INTO users(email, password) VALUES($1, $2) RETURNING *', [
      email,
      hashedPassword,
    ]);

    if (!user) throw new Error('Could not create user');

    res.cookie('userId', user.id);
    res.cookie('userEmail', user.email);

    res.send({ user });
  } catch (err) {
    res.send({ error: true, message: err.message });
  }
};

export const getJoke = async (_, res) => {
  const { data } = await axios.get('https://api.icndb.com/jokes/random');
  res.send({ joke: data.value.joke });
};
