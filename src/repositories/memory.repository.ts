import Redis, { RedisOptions } from 'ioredis';

export interface IMemoryRepository {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
}

class MemoryRepository implements IMemoryRepository {
  private memoryClient: any;

  constructor () {
    const sentinelOptions: RedisOptions = {
      sentinels: [{ 
        host: process.env.MEMORY_CLIENT_SENTINEL_HOST,
        port: Number(process.env.MEMORY_CLIENT_SENTINEL_PORT)
      }],
      name: process.env.MEMORY_CLIENT_SENTINEL_MASTER,
      sentinelPassword: process.env.MEMORY_CLIENT_SENTINEL_PASSWORD,
      username: process.env.MEMORY_CLIENT_USERNAME,
      password: process.env.MEMORY_CLIENT_PASSWORD,
      db: Number(process.env.MEMORY_CLIENT_DB),
    };

    const standaloneOptions: RedisOptions = {
      host: process.env.MEMORY_CLIENT_HOST,
      port: Number(process.env.MEMORY_CLIENT_PORT),
      username: process.env.MEMORY_CLIENT_USERNAME,
      password: process.env.MEMORY_CLIENT_PASSWORD,
      db: Number(process.env.MEMORY_CLIENT_DB),
    };

    this.memoryClient = new Redis(process.env.MEMORY_CONNECTION_MODE == "sentinel" ? sentinelOptions : standaloneOptions);
  }

  public get(key: string): Promise<string | null> {
    return this.memoryClient.get(key);
  }

  public async set(key: string, value: string): Promise<void> {
    await this.memoryClient.set(key, value);
  }
}

const memoryRepository = new MemoryRepository();

export { memoryRepository }