"use client";
import Link from 'next/link'
import { useState } from 'react'

import { UserInfo, UserServiceConfiguration } from 'AppTypes';
import { Button } from '../../components/button';
import { Sidebar } from '../../components/sidebar';
import { PersonalInfo } from '../../components/personalInfo';
import { MorePersonalInfo } from '../../components/morePersonalInfo';
import { PasswordCardInfo } from '../../components/passwordCardInfo';
import { ThankYou } from '../../components/thankYou';


export default function Page() {
    const [step, setStep] = useState(1);
	const [showRequired, setShowRequiredFields] = useState(false);

	const [userServiceConfiguration, setUserServiceConfiguration] =
		useState<UserServiceConfiguration>({
			userInfo: {
				firstName: '',
				lastName: '',
				email: '',
                street: '',
                phoneNumber: '',
                countryName: '',
                city: '',
                countryCode: '',
                password: '',
                confirmPassword: '',
			}

		});

	const updateUserInfo = (userInfo: UserInfo) => {
		setUserServiceConfiguration({ ...userServiceConfiguration, userInfo });
	};


	const nextStep = (onGoingStep?: number) => {
		if (step === 4) return;
		if (step === 1 || (onGoingStep && onGoingStep !== 1 && step === 1)) {
			if (
				!userServiceConfiguration.userInfo.firstName ||
				!userServiceConfiguration.userInfo.lastName ||
				!userServiceConfiguration.userInfo.email.includes('@')
			) {
				setShowRequiredFields(true);
				return;
			}
		}
		setStep((step) => {
			if (onGoingStep) return onGoingStep;
			return step + 1;
		});
	};

	const goBack = () => {
		if (step === 1) return;
		setStep((step) => step - 1);
	};
    return (
		<main className="h-screen flex flex-col text-neutral-cool-gray w-full lg:mx-auto lg:max-w-[58.75rem] lg:mt-20 lg:flex-row grow lg:p-4 lg:rounded-lg lg:bg-white lg:h-[33.75rem] lg:shadow">
			<Sidebar currentStep={step} handleNextStep={nextStep} />
			<div className="px-4 relative bg-neutral-magnolia  lg:bg-transparent lg:flex lg:flex-col lg:w-full ">
				<form className="bg-neutral-alabaster px-6 py-9 rounded-[0.625rem] -translate-y-[4.5rem] flex w-full grow [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary-marine-blue [&_h3]:font-medium [&_h3]:text-primary-marine-blue lg:bg-transparent lg:translate-y-0 ">
					{step === 1 && (
						<PersonalInfo
							userInfo={userServiceConfiguration.userInfo}
							updateUserInfo={updateUserInfo}
							showRequired={showRequired}
						/>
					)}
					{step === 2 && (
						<MorePersonalInfo
                        userInfo={userServiceConfiguration.userInfo}
                        updateUserInfo={updateUserInfo}
                        showRequired={showRequired}
                    />
					)}
					{step === 3 && (
						<PasswordCardInfo
                            userInfo={userServiceConfiguration.userInfo}
                            updateUserInfo={updateUserInfo}
                            showRequired={showRequired}
						/>
					)}
					
					{step === 4 && <ThankYou />}
				</form>
				{step < 4 && (
					<menu className="flex justify-between p-4 mt-auto">
						<li>
							<Button type="ghost" onClick={goBack}>
								Go Back
							</Button>
						</li>
						<li>
							<Button
								onClick={() => nextStep()}
								type={step !== 3 ? 'secondary' : 'primary'}
							>
								{step !== 3 ? 'Next Step' : 'Confirm'}
							</Button>
						</li>
					</menu>
				)}
			</div>
		</main>
	);
}
