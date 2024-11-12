import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

const transportDataSchema = z.object({
  vendor: z.string(),
  office: z.string(),
  date: z.string(),
  shiftTime: z.string(),
  tripType: z.string(),
  routeType: z.string(),
  tripId: z.string(),
  routeName: z.string().optional(),
  routeNumber: z.string(),
  vehicleRegNo: z.string(),
  driver: z.string(),
  vehicleType: z.string(),
  rostered: z.number(),
  boarded: z.number(),
  guard: z.boolean(),
  plannedKms: z.number(),
  actualKms: z.number(),
  locality: z.string(),
  zone: z.string(),
  actualLocality: z.string(),
  actualZone: z.string(),
  billingCodeP: z.string().optional(),
  costP: z.number().optional(),
  billingCodeA: z.string().optional(),
  costA: z.number().optional(),
  remarks: z.string().optional(),
  finalDistance: z.number(),
  finalCost: z.number(),
});

router.post('/', authenticate, authorize('OPERATIONS', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const data = transportDataSchema.parse(req.body);
    const transportData = await prisma.transportData.create({
      data: {
        ...data,
        date: new Date(data.date),
      },
    });
    res.status(201).json(transportData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const transportData = await prisma.transportData.findMany({
      orderBy: { date: 'desc' },
    });
    res.json(transportData);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});