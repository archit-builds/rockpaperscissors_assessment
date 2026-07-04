/**
 * Simulates a real network boundary on top of local JSON fixtures.
 * Every mock endpoint routes through here so the rest of the app has to
 * deal with real async state (loading / error) instead of importing
 * JSON directly into components.
 */
export function withLatency<T>(data: T, opts?: { minMs?: number; maxMs?: number; failRate?: number }): Promise<T> {
  const minMs = opts?.minMs ?? 300;
  const maxMs = opts?.maxMs ?? 800;
  const failRate = opts?.failRate ?? 0.05;
  const delay = minMs + Math.random() * (maxMs - minMs);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failRate) {
        reject(new Error('Network request failed. Please try again.'));
      } else {
        resolve(structuredClone(data));
      }
    }, delay);
  });
}
