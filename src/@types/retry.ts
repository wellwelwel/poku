export type RetryConfig = {
  attempts: number;
  delay?: number;
};

export type RetryContext = {
  attempts: number;
  currentAttempt: number;
  delay: number;
  failed: boolean;
};
