import * as React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { SteamLinkResponse } from '../../api/types';
import { linkSteamAccount } from '../../api/api';

const LinkSteamAccount = () => {
	const linkAccount = async (
		profileLink: string,
		authCode: string,
		sharingCode: string,
	) => {
		const response: SteamLinkResponse = await linkSteamAccount(
			profileLink,
			authCode,
			sharingCode,
		);
	};

	return (
		<div className="flex w-full items-center justify-center">
			<Formik
				initialValues={{
					profileLink: '',
					authCode: '',
					sharingCode: '',
				}}
				validate={(values) => {
					const errors: any = {};

					if (!values.authCode) {
						errors.authCode = 'Required';
					}

					if (!values.profileLink) {
						errors.profileLink = 'Required';
					}

					if (!values.sharingCode) {
						errors.sharingCode = 'Required';
					}

					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					linkAccount(
						values.profileLink,
						values.authCode,
						values.sharingCode,
					);
					setSubmitting(false);
				}}
			>
				{({ isSubmitting }) => (
					<Form className="grid grid-col-1 gap-2 w-2/4">
						<label
							className="text-xl text-gray-200"
							htmlFor="profileLink"
						>
							Profile link
						</label>
						<Field
							type="text"
							name="profileLink"
							className="p-1 rounded"
						/>
						<ErrorMessage
							name="profileLink"
							component="div"
							className="text-red-500 text-lg"
						/>
						<label
							className="text-xl text-gray-200"
							htmlFor="authCode"
						>
							Authentication code
							<span className="text-sm gray-500 ml-4">
								You can create your authentication code
								<a
									className="ml-1 text-purple-400 font-bold"
									target="_blank"
									href="https://help.steampowered.com/en/wizard/HelpWithGameIssue/?appid=730&issueid=128"
								>
									here
								</a>
							</span>
						</label>
						<Field
							type="text"
							name="authCode"
							className="p-1 rounded"
						/>
						<ErrorMessage
							name="authCode"
							component="div"
							className="text-red-500 text-lg"
						/>
						<label
							className="text-xl text-gray-200"
							htmlFor="sharingCode"
						>
							Match token
							<span className="text-sm gray-500 ml-4">
								You can get your most recent match token from
								the same page
								<a
									className="ml-1 text-purple-400 font-bold"
									target="_blank"
									href="https://help.steampowered.com/en/wizard/HelpWithGameIssue/?appid=730&issueid=128"
								>
									(here)
								</a>
							</span>
						</label>
						<Field
							type="text"
							name="sharingCode"
							className="p-1 rounded"
						/>
						<ErrorMessage
							name="sharingCode"
							component="div"
							className="text-red-500 text-lg"
						/>
						<button
							type="submit"
							disabled={isSubmitting}
							className="bg-discord px-8 py-2 rounded text-gray-200 w-32"
						>
							Save
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default LinkSteamAccount;
