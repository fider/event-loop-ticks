# About

Packge will tell current number of executed event loop tick.

Numeration starts from 0.

For educational purposes only, do not use on production due to increased CPU usage.

TS:
```typescript
import { tickNum } from 'event-loop-ticks';
console.log(tickNum());
```

JS:
```javascript
const { tickNum } = require('event-loop-ticks');
console.log(tickNum());
```

# Caveats

It is useful only to check if part of code were executed in the same or other tick.

Library is constantly 'spinning' in event lopp, so waiting for long timeout will cause `tickNum()` to return big values.
