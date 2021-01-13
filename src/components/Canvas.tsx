import * as React from 'react';

const { useRef, useEffect } = React;

type Props = {
	draw: (ctx: CanvasRenderingContext2D) => void;
};

const Canvas = (props: Props) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');

		props.draw(context);
	}, [props.draw]);

	return <canvas width={1000} height={1000} ref={canvasRef} />;
};

export default Canvas;
