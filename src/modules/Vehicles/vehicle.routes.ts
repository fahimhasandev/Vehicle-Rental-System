import { Router } from 'express';
import { vehicleController } from './vehicle.controller';
import setAuthHeader from '../../middleware/auth';

const router = Router();

router.post('/', vehicleController.createVehicle);
router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehiclebyID);
router.put('/:id', vehicleController.updateVehicle);
router.delete('/:id', vehicleController.deleteVehicle);

export const vehicleRoutes = router;
