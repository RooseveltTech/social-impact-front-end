import { FormEvent } from 'react';
import { Input } from './input';
import { UserInfo } from 'AppTypes';

interface PersonalInfoProps {
	userInfo: UserInfo;
	updateUserInfo: (userInfo: UserInfo) => void;
	showRequired: boolean;
}

export const LoginCard = ({
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
			<h2>Password</h2>
			<p>Please choose a secure password.</p>

			<Input
				label="Email"
				type="email"
				showRequired={showRequired && !userInfo.email}
				value={userInfo.email}
				onChange={(e: FormEvent<HTMLInputElement>) =>
					handlePersonalInfo(e, 'email')
				}
			/>

            <Input
				label="Password"
				type="password"
				showRequired={showRequired && !userInfo.password}
				value={userInfo.password}
				onChange={(e: FormEvent<HTMLInputElement>) =>
					handlePersonalInfo(e, 'password')
				}
			/>
		</section>
	);
};