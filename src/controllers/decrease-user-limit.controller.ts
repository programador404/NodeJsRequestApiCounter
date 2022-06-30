import { Request, Response } from 'express';

import { memoryRepository } from '../repositories/memory.repository';
import { DecreaseUserLimitUseCase } from '../usecases/decrease-user-limit.usecase';

interface IDecreaseUserLimitController {
  update(request: Request, response: Response): Promise<Response>
}

class DecreaseUserLimitController implements IDecreaseUserLimitController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { email } = request.params;

    const decreaseUserLimitUseCase = new DecreaseUserLimitUseCase(memoryRepository);

    const { message = '' } = await decreaseUserLimitUseCase.handle(email);

    return response.status(200).json({ message });
  }
}

const decreaseUserLimitController = new DecreaseUserLimitController();

export { decreaseUserLimitController };
