# Custom Parsers

Create custom data parsers for different data formats.

## Parser Interface

```typescript
import { ParserBase } from '@alisaitteke/seatmap-canvas';

class CustomParser extends ParserBase {
  parse(data: any) {
    // Transform your data format to Seatmap format
    return {
      blocks: [
        // ... transformed data
      ]
    };
  }
}
```

## Register Parser

```javascript
seatmap.addParser('custom-format', CustomParser);
```

For more details, see the source code for [Pretix Parser](https://github.com/alisaitteke/seatmap-canvas/tree/master/src/lib/converters/pretix).
