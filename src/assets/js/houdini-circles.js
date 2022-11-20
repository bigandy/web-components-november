class CirclePainter {
  static get inputProperties() {
    return ["--color-1", "--color-2", "--square-dimension"];
  }

  paint(ctx, geom, properties) {
    // let colors = ["black", "gold"];
    // if (properties.get("--color-1").length > 0) {
    //   colors[0] = properties.get("--color-1");
    // }
    // if (properties.get("--color-2").length > 0) {
    //   colors[1] = properties.get("--color-2");
    // }

    const { width, height } = geom;

    let x = 0;
    let y = 0;

    const drawCircle = (x, y, size, color = "red") => {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();
    };

    const init = () => {
      for (let j = 0; j <= 100; j++) {
        draw();
      }
    };

    function draw() {
      x =
        x <= width
          ? x + Math.cos(Math.random()) * (width / 10)
          : Math.random() * 100;
      y =
        y <= height
          ? y + Math.tan(Math.random()) * (width / 10)
          : Math.random() * 100;

      const color = `hsl(${Math.floor(x)}, 100%, 50%, ${
        Math.random() * 1
      })`;
      drawCircle(
        x,
        y,
        Math.random() * (Math.random() * 100),
        color
      );
    }

    init();
  }
}

// Register our class under a specific name
registerPaint("circles", CirclePainter);
