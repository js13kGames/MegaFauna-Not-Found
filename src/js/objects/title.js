import {tileSizePx} from "../constants";

let { init, Sprite, SpriteSheet } = kontra;
import { draw, getTextLength, getPositions } from '../classes/font';
import {getTimeSince} from "../helper";

let fireSprite = new Image();
fireSprite.src = 'public/assets/fire2.png';

export const Title = (setLevel) => {
	const titleInterface = {};
	let clickableRectangles = [];

	let pageNumber = 0;
	const GAME_START = 99;

	let { canvas, context } = init('title');
	let renderStoryStartTime = 0;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const FireSpriteSheet = () => {
		const image = fireSprite;
		const frameWidth = 16;
		const frameHeight = 16;
		const totalFrameCount = 45;
		const frameRate = 20;
		let currentFrame = 0;

		let spriteSheetInterface = {};
		spriteSheetInterface.update = () => {
			currentFrame = (currentFrame + 1) % totalFrameCount;
		};
		spriteSheetInterface.render = (x, y, width, height) => {
			context.drawImage(image, currentFrame * frameWidth, 0, frameWidth, frameHeight, x, y, width, height);
		};

		return spriteSheetInterface;
	};

	const fireSprites = [];

	(function() {
		for (let i = 0; i < 200; i++) {
			fireSprites.push({
				x: 0,
				y: 0,
				spriteSheet: FireSpriteSheet()
			});
		}
	})();

	const renderPlay = () => {
		const gameLine = "PLAY";
		let fontSize = 8;
		let totalWidth = getTextLength(gameLine, fontSize) + 60;
		let startX = (canvas.width - totalWidth) / 2.0;
		const startY = (0.8 * canvas.height);
		draw(canvas, context, gameLine, fontSize, startX + 60, startY);

		let x = startX;
		let y = startY;
		context.fillStyle = "white";
		context.beginPath();
		context.moveTo(x, y);
		x += 40;
		y += 20;
		context.lineTo(x, y);
		x -= 40;
		y += 20;
		context.lineTo(x, y);
		context.fill();

		// Create the button.
		clickableRectangles.push([
			{x: startX, y: startY},
			{x: startX + 60 + getTextLength(gameLine, fontSize), y: startY + 80},
			() => { pageNumber = 1; renderStoryStartTime = new Date(); }
			]
		);
	};

	const renderTitle = () => {
	    let startY = 0.2 * canvas.height;
		const gameLine1 = "MEGA FAUNA";
		let gameLine1FontSize = 20;
		let startX1 = (canvas.width - getTextLength(gameLine1, gameLine1FontSize)) / 2.0;
		let blocks = getPositions(canvas, context, gameLine1, gameLine1FontSize, startX1, startY);
		for (let i = 0; i < blocks.length; i++) {
			fireSprites[i].x = blocks[i].x;
			fireSprites[i].y = blocks[i].y;
			fireSprites[i].spriteSheet.update();
			fireSprites[i].spriteSheet.render(fireSprites[i].x, fireSprites[i].y, gameLine1FontSize, gameLine1FontSize);
		}

		const gameLine2 = "NOT FOUND!";
		let gameLine2FontSize = 12;
		let startX2 = (canvas.width - getTextLength(gameLine2, gameLine2FontSize)) / 2.0;

		draw(canvas, context, gameLine2, gameLine2FontSize, startX2,startY + (6 * gameLine1FontSize));
	};

	const renderStory = () => {
		const story = [
			"This is 40,000 BC.",
			"",
			"Australia has been untouched for millennia by Humans.         ",
			"A new species called 'Homo Sapiens' has landed on this continent.        ",
			"They have almost immediately started threatening the existence of the",
			"ecosystem. They are driving the previously thriving megafauna,",
			"one that survived multiple ice ages, to extinction. Homo Sapiens",
			"are the only animals known to control an element of nature, Fire.            ",
			"",
			"This has become a bane to the local fauna.",
			"",
			"",
			"As the king of the forest, you have a responsibility to kill these",
			"aliens before they burn down the forests beyond repair!"
		]

		context.fillStyle = "white";
		context.font = '20px Courier New';
		let x = 20, y = 100;
		let remLength = (getTimeSince(renderStoryStartTime) / 80);
		for (let i = 0; i < story.length; i++) {
			if (remLength <= 0) continue;
			context.fillText(story[i].substring(0, remLength), x, y);
			y += 22;
			remLength -= story[i].length;
		}
	};

	const renderNext = () => {
	    const text = "NEXT";
        let fontSize = 5;
        const textLength = getTextLength(text, fontSize);
        let x = canvas.width - (2 * textLength);
        let y = canvas.height - (10 * fontSize);
        draw(canvas, context, text, fontSize, x, y);

        clickableRectangles.push([
                {x, y},
                {x: x + textLength + 25, y: y + 26},
                () => { pageNumber = 2; }
            ]
        );

        context.beginPath();
        context.lineWidth = 5;
        x += (textLength + 10);
        context.moveTo(x, y);
        x += 15;
        y += 13;
        context.lineTo(x, y);
        x -= 15;
        y += 13;
        context.lineTo(x, y);
        context.strokeStyle = "white";
        context.stroke();
    };

    const renderSkip = () => {
        const text = "SKIP";
        let fontSize = 5;
        const textLength = getTextLength(text, fontSize);
        let x = canvas.width - (4 * textLength);
        let y = canvas.height - (10 * fontSize);
        draw(canvas, context, text, fontSize, x, y);

        clickableRectangles.push([
                {x, y},
                {x: x + textLength + 25, y: y + 26},
                () => { renderStoryStartTime = 0; }
            ]
        );
    };

    const renderControls = () => {
        const text = "CONTROLS";
        let fontSize = 15;
        const textLength = getTextLength(text, fontSize);
        let x = (canvas.width - textLength) / 2;
        let y = 50;
        draw(canvas, context, text, fontSize, x, y);

        const controls = [
            "W - Move Up",
            "A - Move Left",
            "S - Move Down",
            "D - Move Right",
            "K - Kill Sapiens in range",
            "Space - Extinguish Fire",
			"",
			"Don't walk into Fire!"
        ];
        context.font = '30px Courier New';
        y = 250;
        x = 80;
        for (let i = 0; i < controls.length; i++) {
            context.fillText(controls[i], x, y);
            y += 33;
        }
    };

    const renderStart = () => {
        const text = "START LEVEL 1";
        let fontSize = 5;
        const textLength = getTextLength(text, fontSize);
        let x = canvas.width - textLength - 50;
        let y = canvas.height - (10 * fontSize);
        draw(canvas, context, text, fontSize, x, y);

        clickableRectangles.push([
                {x, y},
                {x: x + textLength + 50, y: y + 30},
                () => { pageNumber = GAME_START; setLevel(1); }
            ]
        );

        context.beginPath();
        context.lineWidth = 5;
        x += (textLength + 15);
        context.moveTo(x, y);
        x += 15;
        y += 13;
        context.lineTo(x, y);
        x -= 15;
        y += 13;
        context.lineTo(x, y);
        context.strokeStyle = "white";
        context.stroke();
    };

    canvas.addEventListener('mousemove', e => {
		let isCursorPointer = false;
		clickableRectangles.forEach((rect) => {
			if ((rect[0].x <= e.offsetX) && (rect[0].y <= e.offsetY)
				&& (rect[1].x >= e.offsetX) && (rect[1].y >= e.offsetY)) {
				isCursorPointer = true;
			}
		});

		if (isCursorPointer) {
			document.getElementById("title").style.cursor = "pointer";
		} else {
			document.getElementById("title").style.cursor = "default";
		}
	});

	canvas.addEventListener("click", e => {
		let handler;
		clickableRectangles.forEach((rect) => {
			console.log(rect);
			if ((rect[0].x <= e.offsetX) && (rect[0].y <= e.offsetY)
				&& (rect[1].x >= e.offsetX) && (rect[1].y >= e.offsetY)) {
				handler = rect[2];
			}
		});

		if (handler) handler();
	});

	titleInterface.update = () => {};

	titleInterface.render = () => {
	    if (pageNumber !== GAME_START) {
            clickableRectangles = [];
            context.fillStyle = 'black';
            context.fillRect(0, 0, canvas.width, canvas.height);
            if (pageNumber === 0) {
                renderTitle();
                renderPlay();
            } else if (pageNumber === 1) {
                renderStory();
                if (renderStoryStartTime !== 0) {
                    renderSkip();
                }
                renderNext();
            } else if (pageNumber === 2) {
                renderControls();
                renderStart();
            }
        }
	};

	return titleInterface;
};
