import clsx from 'clsx';
import { FormEvent } from 'react';
import { Input } from './input';
import { Option } from './option';
import { UserInfo } from 'AppTypes';
import { COUNTRIES } from "./country";
import { SelectMenuOption } from "./types";

interface PersonalInfoProps {
	userInfo: UserInfo;
	updateUserInfo: (userInfo: UserInfo) => void;
	showRequired: boolean;
    matchPassword: boolean;
}

export const PasswordCardInfo = ({
	userInfo,
	updateUserInfo,
	showRequired,
    matchPassword,
}: PersonalInfoProps) => {
	const handlePersonalInfo = (
		event: FormEvent<HTMLInputElement>,
		key: keyof UserInfo
	) => {
		const updatedUserInfo = { ...userInfo };
		updatedUserInfo[key] = event.currentTarget.value;
		updateUserInfo(updatedUserInfo);
	};
	const handleCountry = (
		event: FormEvent<HTMLSelectElement>,
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
            

             <div className="flex flex-col font-medium">
                <span className="inline-flex justify-between">
                    <label
                        htmlFor="Country"
                        className="text-sm text-primary-marine-blue "

                    >
                        Country
                    </label> 
                </span>
                <select
                
                className={clsx(
					'border border-neutral-light-gray rounded px-4 py-2 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue',
					
						!event &&
						'ring-1 ring-primary-starberry-red'
				)}
                onChange={(e: FormEvent<HTMLSelectElement>) =>
					handleCountry(e, 'countryName')
				}
                >
                {COUNTRIES.map((country) => {
                return <option value={country.name}>{country.name} 
                        
                </option>
                })}
             </select>
            </div>
			<Input
				label="City"
				showRequired={showRequired && !userInfo.city}
				value={userInfo.city}
				onChange={(e: FormEvent<HTMLInputElement>) =>
					handlePersonalInfo(e, 'city')
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