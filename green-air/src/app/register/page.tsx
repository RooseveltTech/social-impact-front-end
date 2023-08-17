"use client";
import Link from 'next/link'
import { useState } from 'react'

import { UserInfo, UserServiceConfiguration } from 'AppTypes';
import { Button } from '../../components/button';
import { Sidebar } from '../../components/sidebar';
import { PersonalInfo } from '../../components/personalInfo';
import { PasswordCardInfo } from '../../components/passwordCardInfo';
import { ThankYou } from '../../components/thankYou';


export default function Page() {
    const [step, setStep] = useState(1);
    const [matchPassword, setMatchPassword] = useState(false);
	const [showRequired, setShowRequiredFields] = useState(false);
    const [showKey, setShowKeyFields] = useState<any>();
    const [showValue, setShowValueFields] = useState<any>();
    const [showStatusCode, setShowStatusCode] = useState<any>();


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

    function isValidEmail(email: any): boolean {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(email);
        }
  
	const nextStep = (onGoingStep?: number) => {
		if (step === 3) return;

		if (step === 1 || (onGoingStep && onGoingStep !== 1 && step === 1)) {
            
			if (
				step == 1
			) {
                
                if (
                    !userServiceConfiguration.userInfo.firstName ||
                    !userServiceConfiguration.userInfo.lastName ||
                    !userServiceConfiguration.userInfo.email 
                ){
                    setShowRequiredFields(true);
                    return;
                }else if(
                    isValidEmail(userServiceConfiguration.userInfo.email) === false
                ){
                    setShowRequiredFields(true);
                    return;
                }
				
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

   
    const handleSubmit = async () => {
        // Stop the form from submitting and refreshing the page.
        // event.preventDefault()
                
        if (!userServiceConfiguration.userInfo.password){
                        setShowRequiredFields(true);
                        return;
                    }
        
        const { headers } = await import("next/headers");
        const ip = headers().get("x-forwarded-for");
     
        // Get data from the form.
        const data = {
            first_name: userServiceConfiguration.userInfo.firstName,
            last_name: userServiceConfiguration.userInfo.lastName,
            email: userServiceConfiguration.userInfo.email,
            street: userServiceConfiguration.userInfo.street,
            phone_number: userServiceConfiguration.userInfo.phoneNumber,
            country: userServiceConfiguration.userInfo.countryName,
            city: userServiceConfiguration.userInfo.city,
            country_code: userServiceConfiguration.userInfo.countryCode,
            password: userServiceConfiguration.userInfo.password,
            confirm_password: userServiceConfiguration.userInfo.confirmPassword,
            ip_address: ip
        }
     
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)
     
        // API endpoint where we send form data.
        const endpoint = 'https://backendgreenair.azurewebsites.net/auth/register/'
        
        // Form the request for sending data to the server.
        const options = {
          // The method is POST because we are sending data.
          method: 'POST',
          // Tell the server we're sending JSON.
          headers: {
            'Content-Type': 'application/json',
          },
          // Body of the request is the JSON data we created above.
          body: JSONdata,
        }
     
        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)
        const error_field = response.json().then(function(result) {
            const keys = Object.keys(result);
            setShowKeyFields(keys)
            const values = Object.values(result); 
            setShowValueFields(values);
            setShowStatusCode(response.status)
          
            if (response.status === 201) {
                nextStep();
            }else if (response.status=== 400){
                
                setShowRequiredFields(true);
                return;

            }
                 
        });
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
             
			<Sidebar currentStep={step} handleNextStep={nextStep} />
			<div className="px-4 relative bg-neutral-magnolia  lg:bg-transparent lg:flex lg:flex-col lg:w-full ">
				<form onSubmit={handleSubmit} className="bg-neutral-alabaster px-6 py-9 rounded-[0.625rem] -translate-y-[4.5rem] flex w-full grow [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary-marine-blue [&_h3]:font-medium [&_h3]:text-primary-marine-blue lg:bg-transparent lg:translate-y-0 ">
					{step === 1 && (
						<PersonalInfo
							userInfo={userServiceConfiguration.userInfo}
							updateUserInfo={updateUserInfo}
							showRequired={showRequired}
						/>
					)}
					{step === 2 && (
						<PasswordCardInfo
                            userInfo={userServiceConfiguration.userInfo}
                            updateUserInfo={updateUserInfo}
                            showRequired={showRequired}
                            matchPassword={matchPassword}
						/>
					)}
					
					{step === 3 && <ThankYou />}
				</form>
				{step < 3 && (
                    
					<menu className="flex justify-between p-4 mt-auto">
                        
                       <Button  
                            onClick={goBack}
                            type={'ghost'}>
                              {'Back'}
                            </Button>
                     

						<li>{
                             step === 2 ? 
                             <Button
								onClick={() => handleSubmit()}
								type={'primary'}
							>
								{'Submit'}
							</Button>
                            : (
                            <Button
								onClick={() => nextStep()}
								type={'secondary'}
							>
								{'Next Step'}
							</Button>
                            )
                            }
						</li>
					</menu>
				)}
			</div>
            
		</main>
      
        </div>

	);
}
