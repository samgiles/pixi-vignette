# Vignette Filter for Pixi.js

![Vignette effect](/docs/vignette.png)

## Usage

```JS
var vignetteFilter = new VignetteFilter({
	size: 0.5,
	amount: 0.5,
	focalPointX: 0.5,
	focalPointY: 0.5
});

/** Assuming container is a Pixi Container */
container.filters.push(vignetteFilter);
```

# License

MIT
