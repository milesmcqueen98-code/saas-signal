export const logger = {
  error(message: string, detail?: Error): void {
    if (detail) {
      console.error(message, detail.message);
      return;
    }
    console.error(message);
  }
};
