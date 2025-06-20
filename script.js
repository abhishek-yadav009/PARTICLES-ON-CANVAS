 window.onload = function () {
      const canvas = document.querySelector('canvas');
      const ctx = canvas.getContext('2d');

      // Set canvas size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const color = '#00FFFF'; // Bright cyan
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.3;

      const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
      const dots = [];

      // Create dots
      for (let i = 0; i < 300; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: -0.5 + Math.random(),
          vy: -0.5 + Math.random(),
          radius: Math.random() * 2
        });
      }

      // Update mouse position
      window.onmousemove = e => {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
      };

      // Draw and animate
      function draw() {
        // Fill background black
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = color;

        // Draw each dot
        dots.forEach(dot => {
          dot.x += dot.vx;
          dot.y += dot.vy;

          if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
          if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw connecting lines
        for (let i = 0; i < dots.length; i++) {
          for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              const mx = dots[i].x - mouse.x;
              const my = dots[i].y - mouse.y;
              const mdistance = Math.sqrt(mx * mx + my * my);

              if (mdistance < 150) {
                ctx.beginPath();
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.stroke();
              }
            }
          }
        }

        requestAnimationFrame(draw);
      }

      draw();

      // Make canvas responsive
      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    };