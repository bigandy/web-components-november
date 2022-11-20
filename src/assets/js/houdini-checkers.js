class CheckerboardPainter {
  static get inputProperties() {
    return ["--color-1", "--color-2", "--square-dimension"];
  }

  paint(ctx, geom, properties) {
    let colors = ["red", "blue"];
    if (properties.get("--color-1").length > 0) {
      colors[0] = properties.get("--color-1");
    }
    if (properties.get("--color-2").length > 0) {
      colors[1] = properties.get("--color-2");
    }

    const size =
      properties.get("--square-dimension").length > 0
        ? Math.max(properties.get("--square-dimension"), 5)
        : 32;

    for (let y = 0; y < geom.height / size; y++) {
      for (let x = 0; x < geom.width / size; x++) {
        const color = colors[(x + y) % colors.length];
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(x * size, y * size, size, size);
        ctx.fill();
      }
    }
  }
}

// Register our class under a specific name
registerPaint("checkers", CheckerboardPainter);
