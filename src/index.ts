if (process.env.NODE_ENV === 'production') {
  console.warn('Please do not use event-loop-ticks module in production due to increased CPU utilization. Library is for educational purposes only.');
}

let _tickNum = 0;

const onTick = () => {
  _tickNum++;
  // If  `onTick`  will call  `process.nextTick`  directly without  `setImmediate`
  // wrapper, Node will execute  `onTick()`  in infinite recusive loop.
  // The  `.unref()`  is required to terminate process in case of no other pending tasks.
  setImmediate(() => process.nextTick(onTick)).unref();
};

process.nextTick(onTick);

/**
 * @returns JS event loop tick number starting from 0.
 */
export function tickNum() {
  return _tickNum;
}
