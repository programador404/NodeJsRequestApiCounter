import { IMemoryRepository } from "../repositories/memory.repository";

interface IHandleResponse {
  limit?: string;
  success: boolean;
  message?: string;
}

interface IGetUserLimitUseCase {
  handle: (userEmail: string) => Promise<IHandleResponse>
}

export class GetUserLimitUseCase implements IGetUserLimitUseCase {
  constructor(
    private readonly memoryRepository: IMemoryRepository
  ) {}

  async handle(userEmail: string): Promise<IHandleResponse> {
    try {
      const userCredit = await this.memoryRepository.get(userEmail);

      if (!userCredit) {
        return {
          success: false,
          message: 'User not found'
        }
      }

      return {
        success: true,
        limit: userCredit,
        message: "OK"
      };
    }
    catch (err) {
      return {
        success: false,
        message: "Fail to check"
      }
    }
  }
}
