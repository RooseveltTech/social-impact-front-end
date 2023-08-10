import { FormEvent } from 'react';
import { Input } from './input';
import { UserInfo } from 'AppTypes';

interface PersonalInfoProps {
	userInfo: UserInfo;
	updateUserInfo: (userInfo: UserInfo) => void;
	showRequired: boolean;
}

export const PersonalInfo = ({
	userInfo,
	updateUserInfo,
	showRequired,
}: PersonalInfoProps) => {
	const handlePersonalInfo = (
		event: FormEvent<HTMLInputElement>,
		key: keyof UserInfo
	) => {
		const updatedUserInfo = { ...userInfo };
		updatedUserInfo[key] = event.currentTarget.value;
		updateUserInfo(updatedUserInfo);
	};

	return (
		<section className="flex flex-col gap-4 w-full">
			<h2>Personal info</h2>
			<p>Please provide the following details.</p>

			<Input
				label="First Name"
				placeholder="e.g. Manvi"
				showRequired={showRequired && !userInfo.firstName}
				value={userInfo.firstName}
				onChange={(e: FormEvent<HTMLInputElement>) =>
					handlePersonalInfo(e, 'firstName')
				}
			/>

            <Input
				label="Last Name"
				placeholder="e.g. Abandy"
				showRequired={showRequired && !userInfo.lastName}
				value={userInfo.lastName}
				onChange={(e: FormEvent<HTMLInputElement>) =>
					handlePersonalInfo(e, 'lastName')
				}
			/>

			<Input
				label="Email Address"
				placeholder="e.g. manviabandy@studentambassadors.com"
				showRequired={showRequired && !userInfo.email}
				value={userInfo.email}
				onChange={(e: FormEvent<HTMLInputElement>) =>
					handlePersonalInfo(e, 'email')
				}
			/>

		</section>
	);
};