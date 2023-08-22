import { EventEmitter } from "events";

interface RateLimiterOptions {
  windowSize: number; // Time window size in milliseconds (e.g., 1000ms = 1 second)
  maxRequests: number; // Maximum number of requests allowed within the window
}

type RateLimitReturnType = {
  success: boolean;
  remaining: number;
  limit: number;
};

interface RateLimiter {
  limit(key: string): RateLimitReturnType;
}

type LeakyBucketRateLimiterOptions = RateLimiterOptions & {
  drainRate: number;
  useQueue: boolean;
};

export class LeakyBucketRateLimiter<T>
  extends EventEmitter
  implements RateLimiter
{
  private options: LeakyBucketRateLimiterOptions;
  private requestQueue: Map<string, T[]>;
  private lastRequestTime: Map<string, number>;
  private bucket: Map<string, number>;

  constructor(options: LeakyBucketRateLimiterOptions) {
    super();
    this.options = options;
    this.requestQueue = new Map();
    this.lastRequestTime = new Map();
    this.bucket = new Map(); //holds the number of requests per key at the current window

    if (this.options.useQueue) {
      // Start the timer to process N requests at regular intervals with N = drainRate
      // Emits a 'processRequest' event with the key and the requests to process
      setInterval(this.processRequests.bind(this), options.windowSize);
    } else {
      // Start the timer to drain N requests at regular intervals with N = drainRate
      // Frees up N requests at regular intervals with N = drainRate
      setInterval(this.drainBucket.bind(this), options.windowSize);
    }
  }

  private drainBucket(): void {
    const now = Date.now();
    const { windowSize, drainRate } = this.options;

    for (const [key, count] of this.bucket.entries()) {
      const lastRequest = this.lastRequestTime.get(key);
      if (lastRequest && now - lastRequest > windowSize) {
        // console.log('Last request was too long ago, resetting count to 0');
        // If the request is older than the window, reset the count to 0
        this.bucket.set(key, 0);
      } else {
        // console.log('Draining bucket');
        // Otherwise, drain the bucket by removing the required number of requests
        const remainingCount = Math.max(0, count - drainRate);
        // console.log('remainingCount', remainingCount);
        this.bucket.set(key, remainingCount);
      }
    }
  }

  private processRequests() {
    const { drainRate } = this.options;
    for (const [key, requests] of this.requestQueue.entries()) {
      const requestsToProcess = requests.slice(0, drainRate); // Get the first N requests
      requests.splice(0, drainRate); // Remove the processed requests from the queue

      console.log(`Processing requests from ${key}`, requestsToProcess);
      this.emit("processRequest", key, requestsToProcess);
    }
  }

  limit(key: string) {
    const now = Date.now();
    const { windowSize, maxRequests } = this.options;
    let success = false;
    let remaining = maxRequests;

    if (this.options.useQueue) {
      if (!this.requestQueue.has(key)) {
        this.requestQueue.set(key, []);
      }

      const requests = this.requestQueue.get(key) as number[];
      requests.push(now);

      // Remove expired requests from the queue
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      while (requests.length > 0 && now - requests[0] > windowSize) {
        requests.shift();
      }
      remaining = maxRequests - requests.length;
      success = remaining > 0;
    } else {
      const now = Date.now();
      const { maxRequests } = this.options;

      if (!this.bucket.has(key)) {
        this.bucket.set(key, 1);
        this.lastRequestTime.set(key, now);
        success = true;
      }
      const count = this.bucket.get(key) as number;
      if (count < maxRequests) {
        this.bucket.set(key, count + 1);
        this.lastRequestTime.set(key, now);
        success = true;
      }
      remaining = maxRequests - count;
    }

    return { success, remaining, limit: maxRequests };
  }
}

// type TokenBucketRateLimiterOptions = RateLimiterOptions;

// export class TokenBucketRateLimiter implements RateLimiter {
//   private tokens: Map<string, number>;
//   private options: TokenBucketRateLimiterOptions;

//   constructor(options: TokenBucketRateLimiterOptions) {
//     this.tokens = new Map();
//     this.options = options;
//   }

//   limit(key: string): boolean {
//     const { windowSize, maxRequests } = this.options;

//     if (!this.tokens.has(key)) {
//       this.tokens.set(key, maxRequests - 1);
//       setTimeout(() => this.tokens.delete(key), windowSize);
//       return true;
//     }

//     const tokensRemaining = this.tokens.get(key) as number;
//     if (tokensRemaining > 0) {
//       this.tokens.set(key, tokensRemaining - 1);
//       return true;
//     }

//     return false;
//   }
// }
