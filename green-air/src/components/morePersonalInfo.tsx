import { FormEvent } from 'react';
import { Input } from './input';
import { UserInfo } from 'AppTypes';

interface PersonalInfoProps {
	userInfo: UserInfo;
	updateUserInfo: (userInfo: UserInfo) => void;
	showRequired: boolean;
}

export const MorePersonalInfo = ({
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
				label="Phone Number"
				placeholder="8168187776"
				showRequired={showRequired && !userInfo.phoneNumber}
				value={userInfo.phoneNumber}
				onChange={(e: FormEvent<HTMLInputElement>) =>
					handlePersonalInfo(e, 'phoneNumber')
				}
			/>

            <Input
				label="City"
				placeholder="e.g. Punjab"
				showRequired={showRequired && !userInfo.city}
				value={userInfo.city}
				onChange={(e: FormEvent<HTMLInputElement>) =>
					handlePersonalInfo(e, 'city')
				}
			/>

			<Input
				label="Street"
				// type="email"
				placeholder="2, Lagos Street"
				showRequired={
					showRequired && !userInfo.street
				}
				value={userInfo.street}
				onChange={(e: FormEvent<HTMLInputElement>) =>
					handlePersonalInfo(e, 'street')
				}
			/>

			<Input
				label="Country"
				// type="email"
				placeholder="Nigeria"
				showRequired={
					showRequired && !userInfo.countryName
				}
				value={userInfo.countryName}
				onChange={(e: FormEvent<HTMLInputElement>) =>
					handlePersonalInfo(e, 'countryName')
				}
			/>

		</section>
	);
};