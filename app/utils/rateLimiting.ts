export class RateLimiter {
  private queue: (() => Promise<any>)[] = [];
  private processing = false;
  private requestsThisMinute = 0;
  private lastResetTime = Date.now();
  private readonly requestsPerMinute: number;

  constructor(requestsPerMinute: number) {
    this.requestsPerMinute = requestsPerMinute;
  }

  private async processQueue() {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      // Reset counter if a minute has passed
      if (Date.now() - this.lastResetTime >= 60000) {
        this.requestsThisMinute = 0;
        this.lastResetTime = Date.now();
      }

      // Check if we're under the rate limit
      if (this.requestsThisMinute >= this.requestsPerMinute) {
        // Wait until the next minute
        await new Promise(resolve => 
          setTimeout(resolve, 60000 - (Date.now() - this.lastResetTime))
        );
        continue;
      }

      const task = this.queue.shift();
      if (task) {
        this.requestsThisMinute++;
        try {
          await task();
        } catch (error) {
          console.error('Error in rate limited task:', error);
        }
      }
    }

    this.processing = false;
  }

  async add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.processQueue();
    });
  }
}
