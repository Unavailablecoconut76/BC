export function auth(req, res, next) {
  const requiredToken = process.env.API_TOKEN;
  // If no token configured, skip auth (useful for local dev)
  if (!requiredToken) return next();

  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.slice(7);
  if (token !== requiredToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

// module.exports = { auth };
