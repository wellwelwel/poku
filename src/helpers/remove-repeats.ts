export const removeConsecutiveRepeats = (
  arr: string[],
  specificItem: RegExp
): string[] => {
  const result: string[] = [];
  let consecutiveCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (specificItem.test(arr[i])) {
      consecutiveCount++;
      if (consecutiveCount <= 2) {
        result.push(arr[i]);
      }
    } else {
      consecutiveCount = 0;
      result.push(arr[i]);
    }

    // Check if the next item is different or we're at the end of the array
    if (i + 1 === arr.length || !specificItem.test(arr[i + 1])) {
      // If more than two consecutive, remove them from the result
      if (consecutiveCount > 2) {
        result.splice(-consecutiveCount);
      }
      consecutiveCount = 0; // Reset the counter for the next group
    }
  }

  return result;
};
