import DB from '../db';

export const withAuth = async (req, res, next) => {
  try {
    const { userId } = req.cookies;

    const user = await DB.single('SELECT * FROM users WHERE id = $1 LIMIT 1', [userId]);
    console.log('user?', user);
    if (!user) throw new Error('UNAUTHENTICATED');

    next();
  } catch (err) {
    res.send({ error: true, message: err.message });
  }
};
