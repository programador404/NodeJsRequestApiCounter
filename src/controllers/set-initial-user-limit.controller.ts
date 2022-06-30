import { Request, Response } from 'express';

import { memoryRepository } from '../repositories/memory.repository';
import { SetInitialUserLimitUseCase } from '../usecases/set-initial-user-limit.usecase';

interface ISetInitialUserLimitController {
  store(request: Request, response: Response): Promise<Response>
}

class SetInitialUserLimitController implements ISetInitialUserLimitController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email, initial_limit } = request.params;

    const setInitialUserLimitUseCase = new SetInitialUserLimitUseCase(memoryRepository);

    const { success, message = '' } = await setInitialUserLimitUseCase.handle(email, +initial_limit);

    if (success) {
      return response.status(200).json({ message });
    } else {
      return response.status(409).json({ message });
    }
  }
}

const setInitialUserLimitController = new SetInitialUserLimitController();

export { setInitialUserLimitController };
