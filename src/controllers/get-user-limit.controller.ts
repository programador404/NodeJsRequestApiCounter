import { Request, Response } from 'express';

import { memoryRepository } from '../repositories/memory.repository';
import { GetUserLimitUseCase } from '../usecases/get-user-limit.usecase';

interface IGetUserLimitController {
  find(request: Request, response: Response): Promise<Response>
}

class GetUserLimitController implements IGetUserLimitController {
  public async find(request: Request, response: Response): Promise<Response> {
    const { email } = request.params;

    const getUserLimitUseCase = new GetUserLimitUseCase(memoryRepository);

    const { message = '', limit = '0' } = await getUserLimitUseCase.handle(email);

    return response.status(200).json({ message, limit });
  }
}

const getUserLimitController = new GetUserLimitController();

export { getUserLimitController };
