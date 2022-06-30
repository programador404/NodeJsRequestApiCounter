import { IMemoryRepository } from "../repositories/memory.repository";

interface IHandleResponse {
  success: boolean;
  message?: string;
}

interface IDecreaseUserLimitUseCase {
  handle: (userEmail: string) => Promise<IHandleResponse>
}

export class DecreaseUserLimitUseCase implements IDecreaseUserLimitUseCase {
  constructor(
    private readonly memoryRepository: IMemoryRepository
  ) {}

  async handle(userEmail: string): Promise<IHandleResponse> {
    try {
      const userCredit = await this.memoryRepository.get(userEmail);

      let userCreditNumber = userCredit ? Number(userCredit) : null;

      if (userCreditNumber && userCreditNumber > 0) {
        await this.memoryRepository.set(userEmail, JSON.stringify(--userCreditNumber));

        return {
          success: true,
          message: "OK"
        };
      }

      return {
        success: false,
        message: "Limit exceeded"
      }
    }
    catch (err) {
      return {
        success: false,
        message: "Fail to check"
      }
    }
  }
}
