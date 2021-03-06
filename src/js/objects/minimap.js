export const MiniMap = (numTiles) => {
	let miniMapInterface = {};
	let startX = window.innerWidth - 11 - (2 * numTiles);
	let startY = 12;

	const canvas = document.getElementById('shadow');
	const context = canvas.getContext('2d');

	let drawBoundingBox = () => {
		let startX = window.innerWidth - 12 - (2 * numTiles);
		let startY = 11;
		context.strokeRect(startX, startY, 2*numTiles + 2, 2*numTiles + 2);
	}

	let drawLionBlip = (lionPosition) => {
		let x = startX + (lionPosition.x * 2);
		let y = startY + (lionPosition.y * 2);
		context.fillStyle = "red";
		context.fillRect(x - 1, y - 1, 4, 4); 
	}

	let drawFireBlips = (map) => {
		for (let i = 0; i < numTiles; i++) {
			for (let j = 0; j < numTiles; j++) {
				if (map[i][j] === 1) {
					context.fillStyle = "#FFA500";
					context.fillRect(startX + (2 * i), startY + (2 * j), 2, 2);
				} else if (map[i][j] === 2) {
					context.fillStyle = "#8B4513";
					context.fillRect(startX + (2 * i), startY + (2 * j), 2, 2);
				} else {
					context.fillStyle = "#ACFB9A";
					context.fillRect(startX + (2 * i), startY + (2 * j), 2, 2);
				}
			}
		}
	}

	let drawLevel = (level) => {
		context.fillStyle = "yellow";
		context.font = "15px arial";
		context.fillText("Level " + level, startX, startY + (2 * numTiles) + 20);
	};

	let drawGreenCover = (greenCover) => {
		context.fillStyle = "yellow";
		context.font = "15px arial";
		context.fillText("Green Cover left: " + greenCover + "%", startX, startY + (2 * numTiles) + 40);
	
		let sX = canvas.width - 30;
		let sY = canvas.height - 60;

		let gc = greenCover / 100;
		context.fillStyle = '#3cb043';
		context.beginPath();
    	context.moveTo(sX + 10, sY + 0);
    	context.lineTo(sX + 2, sY + 10);
    	context.lineTo(sX + 18, sY + 10);
    	context.fill();
    	context.beginPath();
    	context.moveTo(sX + 2, sY + 10);
    	context.lineTo(sX + 18, sY + 10);
    	context.lineTo(sX + 10, sY + 20);
    	context.fill();

    	context.fillStyle = 'white';
    	context.fillRect(sX - 214, sY, 204, 20);
    	context.fillStyle = '#3cb043';
    	context.fillRect(sX - 212, sY + 2, 200 *  gc, 16);
    	context.fillStyle = '#FF2400';
    	context.fillRect(sX - 212 + (200 * 0.25) + 2, sY + 2, 2, 16);
    	context.fillStyle = 'black';
    	context.fillRect(sX - 212 + (200 * gc), sY + 2, 200 *  (1 - gc), 16);
	};

	let drawAliveHumans = (numHumansAlive) => {
		context.fillStyle = "yellow";
		context.font = "15px arial";
		context.fillText("Humans alive: " + numHumansAlive, startX, startY + (2 * numTiles) + 60);
	};

	let drawHealthBar = (health) => {
		// Draw the cross sign
		context.fillStyle = 'white';
		context.fillRect(10, canvas.height - 25, 20, 10);
		context.fillRect(15, canvas.height - 30, 10, 20);

		// Draw the health bar
		context.fillRect(40, canvas.height - 30, 204, 20);
		context.fillStyle = 'red';
		context.fillRect(42, canvas.height - 28, 200 * health, 16);
		context.fillStyle = 'black';
		context.fillRect(42 + (200 * health), canvas.height - 28, 200 * (1 - health), 16);
	};

	let drawStaminaBar = (stamina) => {
		let startX = canvas.width - 30;
		let startY = canvas.height - 30;

		// Draw the energy icon
		context.fillStyle = '#ffc40c';
		context.beginPath();
    	context.moveTo(startX + 10, startY + 0);
    	context.lineTo(startX + 0, startY + 10);
    	context.lineTo(startX + 10, startY + 10);
    	context.fill();
    	context.beginPath();
    	context.moveTo(startX + 6, startY + 10);
    	context.lineTo(startX + 16, startY + 10);
    	context.lineTo(startX + 6, startY + 20);
    	context.fill();

    	context.fillStyle = 'white';
    	context.fillRect(startX - 214, startY, 204, 20);
    	context.fillStyle = '#ffc40c';
    	context.fillRect(startX - 212, startY + 2, 200 *  stamina, 16);
    	context.fillStyle = 'black';
    	context.fillRect(startX - 212 + (200 * stamina), startY + 2, 200 *  (1 - stamina), 16);
	};

	miniMapInterface.render = (level, lionPosition, map, greenCover, numHumansAlive, health, stamina) => {
		context.globalCompositeOperation = 'source-over';
		drawBoundingBox();
		drawFireBlips(map);
		drawLionBlip(lionPosition);
		drawLevel(level);
		drawGreenCover(greenCover);
		drawAliveHumans(numHumansAlive);
		drawHealthBar(health);
		drawStaminaBar(stamina);
	}

	return miniMapInterface; 
};
