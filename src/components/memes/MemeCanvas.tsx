import * as React from 'react';
import { CanvasText } from './Types';

const { useRef, useEffect, useState } = React;

type Props = {
	templateImage: string;
	textCount: number;
	onClick: (x: number, y: number) => void;
	onTextMove: (textIndex: number, x: number, y: number) => void;
};

const MemeCanvas = (props: Props) => {
	const [texts, setTexts] = useState<CanvasText[]>([]);

	const canvasRef = useRef(null);

	const loadImage = async (): Promise<HTMLImageElement> => {
		return new Promise((resolve) => {
			const image: HTMLImageElement = new Image();
			image.src = props.templateImage;
			image.onload = () => {
				resolve(image);
			};
		});
	};

	const draw = async (ctx: CanvasRenderingContext2D) => {
		const image: HTMLImageElement = await loadImage();

		ctx.drawImage(image, 0, 0, Math.min(image.width, 1080), Math.min(image.height, 720));
	};

	useEffect(() => {
		const initialGap: number = 20;
		const newTexts: CanvasText[] = [];
		for (let i = 0; i < props.textCount; i++) {
			newTexts.push({ textIndex: i, x: i * initialGap, y: 10 });
		}
		setTexts(newTexts);

		const canvas: HTMLCanvasElement = canvasRef.current;
		const context: CanvasRenderingContext2D = canvas.getContext('2d');
		canvas.onclick = (event) => {
			const boundingBox = canvas.getBoundingClientRect();
			const x: number = event.clientX - boundingBox.x;
			const y: number = event.clientY - boundingBox.y;

			props.onClick(x, y);
		};

		draw(context);
	}, [draw]);

	return <canvas ref={canvasRef} width={1080} height={720} className="rounded" />;
};

export default MemeCanvas;
