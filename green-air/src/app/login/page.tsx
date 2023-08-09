"use client";

import Link from 'next/link'
import { useState } from 'react'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { signIn } from "next-auth/react";
import { UserInfo, UserServiceConfiguration } from 'AppTypes';
import { Button } from '../../components/button';
import { LoginSidebar } from '../../components/loginSidebar';
import { LoginCard } from '../../components/loginCard';



export default function Page() {
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

			},

		});

	const updateUserInfo = (userInfo: UserInfo) => {
		setUserServiceConfiguration({ ...userServiceConfiguration, userInfo });
	};
    return (
		<main className="h-screen flex flex-col text-neutral-cool-gray w-full lg:mx-auto lg:max-w-[58.75rem] lg:mt-20 lg:flex-row grow lg:p-4 lg:rounded-lg lg:bg-white lg:h-[33.75rem] lg:shadow">
			<LoginSidebar  />
			<div className="px-4 relative bg-neutral-magnolia  lg:bg-transparent lg:flex lg:flex-col lg:w-full ">
				<form className="bg-neutral-alabaster px-6 py-9 rounded-[0.625rem] -translate-y-[4.5rem] flex w-full grow [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary-marine-blue [&_h3]:font-medium [&_h3]:text-primary-marine-blue lg:bg-transparent lg:translate-y-0 ">
                
                    <LoginCard
                        userInfo={userServiceConfiguration.userInfo}
                        updateUserInfo={updateUserInfo}
                        showRequired={showRequired}
                    />
					
					
				</form>
				
					<menu className="flex justify-between p-4 mt-auto">
						<li>
							
						</li>
						<li>
							<Button
                                onClick={() => signIn('credentials', 
                                    { 
                                        email: userServiceConfiguration.userInfo.email,
                                        password: userServiceConfiguration.userInfo.password,
                                        redirect: true,
                                        callbackUrl: '/home',
                                     })}
							  
								type={'primary'}
							>
                                Login
							</Button>
						</li>
					</menu>
				
			</div>
		</main>
	);
}
