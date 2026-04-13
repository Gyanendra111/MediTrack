import { Router } from 'express';
import { db } from '../firebase.js';

const router = Router();

// Helper to check if Firebase is ready
const checkFirebase = (req, res, next) => {
  if (!db) {
    return res.status(503).json({ 
      message: 'Firebase not initialized. Please provide service account credentials.',
      status: 'pending_setup'
    });
  }
  next();
};

// GET all inventory items
router.get('/', checkFirebase, async (req, res) => {
  try {
    const snapshot = await db.collection('inventory').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new item (from OCR or manual)
router.post('/', checkFirebase, async (req, res) => {
  try {
    const newItem = {
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const docRef = await db.collection('inventory').add(newItem);
    res.status(201).json({ id: docRef.id, ...newItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE item
router.delete('/:id', checkFirebase, async (req, res) => {
  try {
    await db.collection('inventory').doc(req.params.id).delete();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
