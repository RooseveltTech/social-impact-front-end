"use client";
import Link from 'next/link'
import { useState } from 'react'

import { UserInfo, UserServiceConfiguration } from 'AppTypes';
import { Button } from '../../components/button';
import { RegisterButton } from '../../components/buttons.component'
import { Sidebar } from '../../components/sidebar';
import { PersonalInfo } from '../../components/personalInfo';
// import { MorePersonalInfo } from '../../components/morePersonalInfo';
import { PasswordCardInfo } from '../../components/passwordCardInfo';
import { ThankYou } from '../../components/thankYou';

export default function Page() {
    const [step, setStep] = useState(1);
    // const [errors, setErrors] = useState({});
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
		if (step === 3) return;

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
		// if (step === 2 || (onGoingStep && onGoingStep !== 2 && step === 2)) {
		// 	if (
		// 		!userServiceConfiguration.userInfo.phoneNumber ||
		// 		!userServiceConfiguration.userInfo.city ||
		// 		!userServiceConfiguration.userInfo.street ||
		// 		!userServiceConfiguration.userInfo.countryName 
		// 	) {
		// 		setShowRequiredFields(true);
		// 		return;
		// 	}
		// }
		// if (step === 3 || (onGoingStep && onGoingStep !== 3 && step === 3)) {
		// 	if (
		// 		!userServiceConfiguration.userInfo.password ||
		// 		!userServiceConfiguration.userInfo.confirmPassword
		// 	) {
		// 		setShowRequiredFields(true);
		// 		return;
		// 	}
        //     else if (userServiceConfiguration.userInfo.password!==userServiceConfiguration.userInfo.confirmPassword){
        //         console.log("Password does not match", 
        //         userServiceConfiguration.userInfo.phoneNumber,
		// 		userServiceConfiguration.userInfo.city,
		// 		userServiceConfiguration.userInfo.street,
		// 		userServiceConfiguration.userInfo.countryName )
        //         setShowRequiredFields(true);
		// 		return;
        //     }
		// }
		setStep((step) => {
			if (onGoingStep) return onGoingStep;
			return step + 1;
		});
	};
    

	const goBack = () => {
		if (step === 1) return;
		setStep((step) => step - 1);
	};
    const handleSubmit = async (event: React.FormEvent) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
        // console.log("Password does not match", 
        //         userServiceConfiguration.userInfo.phoneNumber,
		// 		userServiceConfiguration.userInfo.city,
		// 		userServiceConfiguration.userInfo.street,
		// 		userServiceConfiguration.userInfo.countryName 
        //     )
                
     
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
            confirm_password: userServiceConfiguration.userInfo.confirmPassword
        }
     
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)
     
        // API endpoint where we send form data.
        const endpoint = "https://f021-102-67-1-25.ngrok-free.app/auth/register/"
        // console.log(base_url)
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
     
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        if (response.status === 201) {
            nextStep();
        }
        else{
            const result = await response.json()
            const keys = Object.keys(result);
            const values = Object.values(result);
            console.log(keys, values)
            
            {keys.map((key, index) => (
                alert(key + ": " +values[index])
            //     <div>
            
                
            //     <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            //     <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            //         <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            //             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
            //         </svg>
            //         <span className="sr-only">Error icon</span>
            //     </div>
            //     <div className="ml-3 text-sm font-normal">{key} YESS {index}</div>
            //     <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
            //         <span className="sr-only">Close</span>
            //         <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            //             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            //         </svg>
            //     </button>
            // </div>
            // </div>

              ))}
        }

      }
    return (
        
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
						/>
					)}
					
					{step === 3 && <ThankYou />}
				</form>
				{step < 3 && (
                    
					<menu className="flex justify-between p-4 mt-auto">
						<li>
							<Button type="ghost" onClick={goBack}>
								Go Back
							</Button>
						</li>
						<li>{
                             step === 2 ? 
                             <button onClick={handleSubmit} type="submit">Submit</button>: (
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
	);
}
