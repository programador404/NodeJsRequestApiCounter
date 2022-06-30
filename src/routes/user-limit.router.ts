import { Router } from 'express';

import { getUserLimitController } from '../controllers/get-user-limit.controller';
import { decreaseUserLimitController } from '../controllers/decrease-user-limit.controller';
import { setInitialUserLimitController } from '../controllers/set-initial-user-limit.controller';

const memoryRouter = Router();

memoryRouter.post(
  '/set_initial_limit/:email/:initial_limit', 
  (req, res) => {
    setInitialUserLimitController.store(req, res)
  }
);

memoryRouter.get(
  '/check_limit/:email',
  (req, res) => {
    getUserLimitController.find(req, res)
  }
);

memoryRouter.put(
  '/decrease_limit/:email', 
  (req, res) => {
    decreaseUserLimitController.update(req, res)
  }
);

export { memoryRouter };
