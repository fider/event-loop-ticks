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