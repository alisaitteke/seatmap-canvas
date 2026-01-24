# Background Images

Add background images to enhance visualization.

## Global Background

```javascript
const config = {
  background_image: "assets/stadium.jpg",
  background_opacity: 0.3,
  background_fit: "cover"
};
```

## Block-Level Background

```javascript
{
  blocks: [{
    id: "vip-section",
    background_image: "assets/vip-lounge.jpg",
    background_opacity: 0.6,
    background_fit: "cover",
    seats: [...]
  }]
}
```

See [Configuration](/docs/api/configuration) for all background options.
