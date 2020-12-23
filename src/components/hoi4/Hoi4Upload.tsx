import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { postHoi4Game } from '../../api/api';
import { Hoi4Save } from '../../api/types';

const { useCallback, useState } = React;

type Props = {
	responseCallback: (game: Hoi4Save) => void;
};

const Hoi4Upload = (props: Props) => {
	const [processing, setProcessing] = useState<boolean>(false);

	const onDrop = useCallback((acceptedFiles) => {
		const reader = new FileReader();
		reader.readAsArrayBuffer(acceptedFiles[0]);

		reader.onabort = () => window.alert('file reading was aborted!');
		reader.onerror = () => window.alert('file reading failed!');
		reader.onload = async () => {
			const binary = reader.result;
			const formData = new FormData();
			formData.set('hoi4', new Blob([binary]));

			const response: object = await postHoi4Game(formData);
			if (response['error']) {
				window.alert('process not working');
				return;
			}

			props.responseCallback(response['game']);
		};
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: '.hoi4',
		maxFiles: 1,
		maxSize: 1024 * 1024 * 100,
	});

	if (processing) {
		return <div className="">Processing...</div>;
	}

	return (
		<div
			{...getRootProps()}
			className="p-32 bg-gray-800 rounded text-gray-200 text-3xl"
		>
			<input {...getInputProps()} />
			{isDragActive ? (
				<span>Drop the files here...</span>
			) : (
				<span>
					Drag 'n' drop some files here, or click to select files
				</span>
			)}
		</div>
	);
};

export default Hoi4Upload;
