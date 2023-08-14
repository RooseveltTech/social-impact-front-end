"use client";

import Link from 'next/link'
import { useState } from 'react'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { signIn } from "next-auth/react";
import { UserInfo, UserServiceConfiguration } from 'AppTypes';
import { Button } from '../../components/button';
import { LoginSidebar } from '../../components/loginSidebar';
import { LoginCard } from '../../components/loginCard';
import { useRouter } from 'next/router'


export default function Page() {
	const [showRequired, setShowRequiredFields] = useState(false);
    const [showKey, setShowKeyFields] = useState<any>();
    const [showValue, setShowValueFields] = useState<any>();
    const [showStatusCode, setShowStatusCode] = useState<any>();
    const router = useRouter()
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
    function showError(){
        console.log("I am here")
    }
    return (
        <div className="login-register items-center w-full flex flex-col text-neutral-cool-gray w-full lg:mx-auto lg:mt-20 grow lg:p-4 lg:rounded-lg lg:shadow">
             {showStatusCode === 400 ? showKey?.map((showKeys:string, index:number) => {
                return(
                    <>
                    <div key={index} id={`toast-warning`} className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                            </svg>
                        </div>
                        <div className="ml-3 text-sm font-normal">{showKeys}: {showValue[index]}</div>
                    </div>
                    </>
                )
            }) : null} 
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
                                        redirect: false,
                                        callbackUrl: '/',
                                     }).then((response:any) => {
                                        // stuff is { error: "CredentialsSignin", status: 200, ok: true, url: null } at this point
                                        console.log('stuff in', response.status);
                                        response.status === 200 ? 
                                        router.push("/home"): 
                                        response.status === 400 ?
                                        showError():
                                        null
                                        
                                    })}
							  
								type={'primary'}
							>
                                Login
							</Button>
						</li>
					</menu>
				
			</div>
		</main>
        </div>
	);
}
