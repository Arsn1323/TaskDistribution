import express from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import List from '../models/List.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const types = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    cb(null, types.includes(file.mimetype));
  },
});

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const workbook = xlsx.read(req.file.buffer);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  const agents = await User.find({ role: 'agent' });
  if (agents.length === 0) return res.status(400).json({ message: 'No agents found' });

  const lists = [];
  data.forEach((item, idx) => {
    const agentId = agents[idx % agents.length]._id;
    lists.push({ ...item, agentId });
  });

  await List.insertMany(lists);
  res.json({ message: 'Tasks distributed successfully' });
});

router.get('/agent/:id', auth, async (req, res) => {
  const agentId = req.params.id;
  const list = await List.find({ agentId });
  res.json(list);
});
router.get('/', async (req, res) => {
  try {
    const lists = await List.find(); // optionally: .populate('agentId', 'name email');
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lists', error: error.message });
  }
});

export default router;