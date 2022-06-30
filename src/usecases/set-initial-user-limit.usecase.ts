import { IMemoryRepository } from "../repositories/memory.repository";

interface IHandleResponse {
  success: boolean;
  message?: string;
}

interface ISetInitialUserLimitUseCase {
  handle: (userEmail: string, userLimit: number) => Promise<IHandleResponse>
}

export class SetInitialUserLimitUseCase implements ISetInitialUserLimitUseCase {
  constructor(
    private readonly memoryRepository: IMemoryRepository
  ) {}

  async handle(userEmail: string, userLimit: number): Promise<IHandleResponse> {
    try {
      const userCredit = await this.memoryRepository.get(userEmail);

      if (userCredit) {
        return {
          success: false,
          message: 'User already exist'
        }
      }
      
      await this.memoryRepository.set(userEmail, JSON.stringify(userLimit));

      return {
        success: true,
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
