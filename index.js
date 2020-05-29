window.onload = function() {
	let canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = 1000,
		height = canvas.height = 600,
		fl = 6500,
		points = [],
		needsUpdate = true,
		centerZ = 1500;

    context.translate(width / 2, height / 2);

        // верхнее основание
        points[0] = { x: 20, y: -100, z: 0 };
        points[1] = { x:  60, y: -100, z: -50 };
        points[2] = { x:  120, y: -100, z: -50 };
        points[3] = { x: 160, y: -100, z: 0 };
        points[4] = { x: 120, y: -100, z: 50 };
        points[5] = { x:  60, y: -100, z: 50 };
        
        //нижнее основание
        points[6] = { x: 120, y: 10, z: -30 };
        points[7] = { x: 90, y: 10, z: 20 };
        points[8] = { x: 60, y: 10, z: -30 };


    function resetPoints() {
        // верхнее основание
        points[0] = { x: 20, y: -100, z: 0 };
        points[1] = { x:  60, y: -100, z: -50 };
        points[2] = { x:  120, y: -100, z: -50 };
        points[3] = { x: 160, y: -100, z: 0 };
        points[4] = { x: 120, y: -100, z: 50 };
        points[5] = { x:  60, y: -100, z: 50 };
        
        //нижнее основание
        points[6] = { x: 120, y: 10, z: -30 };
        points[7] = { x: 90, y: 10, z: 20 };
        points[8] = { x: 60, y: 10, z: -30 };
    }

	function project() {
		for(let i = 0; i < points.length; i++) {
			let p = points[i],
                scale = fl / (fl + p.z + centerZ);
        
			p.sx = p.x * scale;
			p.sy = p.y * scale;
        }
    }

	function drawLine() {
		let p = points[arguments[0]];
		context.moveTo(p.sx, p.sy);

		for(let i = 1; i < arguments.length; i++) {
			p = points[arguments[i]];
			context.lineTo(p.sx, p.sy);
		}
	}

	function translateModel(x, y, z) {
		for(let i = 0; i < points.length; i++) {
			points[i].x += x;
			points[i].y += y;
			points[i].z += z;
		}
		needsUpdate = true;
	}

	function rotateX(angle) {
		let cos = Math.cos(angle),
			sin = Math.sin(angle);

		for(let i = 0; i < points.length; i++) {
			let p = points[i],
				y = p.y * cos - p.z * sin,
				z = p.z * cos + p.y * sin;
			p.y = y;
			p.z = z;
		}
		needsUpdate = true;
	}

	function rotateY(angle) {
		let cos = Math.cos(angle),
			sin = Math.sin(angle);

		for(let i = 0; i < points.length; i++) {
			let p = points[i],
				x = p.x * cos - p.z * sin,
				z = p.z * cos + p.x * sin;
			p.x = x;
			p.z = z;
		}
		needsUpdate = true;
	}

	function rotateZ(angle) {
		let cos = Math.cos(angle),
			sin = Math.sin(angle);

		for(let i = 0; i < points.length; i++) {
			let p = points[i],
				x = p.x * cos - p.y * sin,
				y = p.y * cos + p.x * sin;
			p.x = x;
			p.y = y;
		}
		needsUpdate = true;
	}

	document.body.addEventListener("keydown", function(event) {
		switch(event.keyCode) {
			case 37: // left
				if(event.ctrlKey) {
                    rotateY(0.05);
				}
				else {
					translateModel(-20, 0, 0);
				}
				break;
			case 39: // right
				if(event.ctrlKey) {
                    rotateY(-0.05);
				}
				else {
					translateModel(20, 0, 0);
				}
				break;
			case 38: // up
				if(event.shiftKey) {
					translateModel(0, 0, 20);
				}
				else if(event.ctrlKey) {
                    rotateX(0.05);
				}
				else {
					translateModel(0, -20, 0);
				}
				break;
			case 40: // down
				if(event.shiftKey) {
					translateModel(0, 0, -20);
				}
				else if(event.ctrlKey) {
                    rotateX(-0.05);
				}
				else {
					translateModel(0, 20, 0);
				}
				break;
		}
    });
    
    this.document.querySelector('#btn').addEventListener('mousedown', () => {
        resetPoints();
        needsUpdate = true;
    });

	update();

	function update() {
		if(needsUpdate) {
			context.clearRect(-width / 2, -height / 2, width, height);
			project();
			
            context.beginPath();
            drawLine(0, 1, 2, 3, 4, 5, 0);
			drawLine(6, 7, 8, 6);
			drawLine(7, 5);
			drawLine(7, 4);
			drawLine(6, 3);
            drawLine(6, 2);
            drawLine(8, 0);
			drawLine(8, 1);
			context.stroke();
            needsUpdate = false;
		}
		requestAnimationFrame(update);
    }

};