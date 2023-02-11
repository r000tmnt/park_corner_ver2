import { Router } from 'express';
import commission_type_controller from '../controller/commission_type_controller';

const router = Router();



router
    .get('/getType', commission_type_controller.get_types)
    .post('/add', commission_type_controller.add_new_type)

export default router;