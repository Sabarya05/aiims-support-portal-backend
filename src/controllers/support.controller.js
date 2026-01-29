import SupportAgent from '../models/SupportAgent.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

// 🔹 REGISTER SUPPORT AGENT
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if user already exists
    const existing = await SupportAgent.findOne({ where: { username } });
    if (existing) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await hashPassword(password);

    await SupportAgent.create({
      username,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Support agent registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// 🔹 LOGIN SUPPORT AGENT
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const agent = await SupportAgent.findOne({ where: { username } });
    if (!agent) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, agent.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({
      id: agent.id,
      role: 'SUPPORT_AGENT'
    });

    res.json({
      token,
      username: agent.username
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};
