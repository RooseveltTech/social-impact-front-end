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
    const [matchPassword, setMatchPassword] = useState(false);
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
                console.log("step 1");
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
                }else if(
                    isValidEmail(userServiceConfiguration.userInfo.email) === true
                ){
                    // const res:any = fetch(`https://f021-102-67-1-25.ngrok-free.app/auth/email/?email=${userServiceConfiguration.userInfo.email}`, {
                    //     method: "GET",
                    //     headers: {
                    //     "content-type": "application/json",
                    //     },
                    // })
                    // if (res.status===400){
                    //     setShowRequiredFields(true);
                    //     return;
                    // }
                    
                
                }
				
            }
            // else{
            //     console.log("step 2");
            //     if (!userServiceConfiguration.userInfo.password ||
            //         !userServiceConfiguration.userInfo.confirmPassword){
            //             setShowRequiredFields(true);
            //             return;
            //         }else if(userServiceConfiguration.userInfo.password!==userServiceConfiguration.userInfo.confirmPassword){
            //             setMatchPassword(true);
            //         }
            // }
        }
		// if (step === 2 ) {
		// 	if (
        //         !userServiceConfiguration.userInfo.password ||
		// 		!userServiceConfiguration.userInfo.confirmPassword
                
        //     ) {
        //         setShowRequiredFields(true);
        //         console.log("step 2");
        //         return;
        //     }else if(userServiceConfiguration.userInfo.password!==userServiceConfiguration.userInfo.confirmPassword){
        //         setShowRequiredFields(true);
        //         setMatchPassword(true);
        //     }
		// }
		// else {
        //     console.log(step, "step")
		// 	if (
		// 		!userServiceConfiguration.userInfo.password ||
		// 		!userServiceConfiguration.userInfo.confirmPassword ||
		// 		!userServiceConfiguration.userInfo.countryName 
		// 	) {
		// 		setShowRequiredFields(true);
		// 		return;
		// 	}
        //     if(userServiceConfiguration.userInfo.password!==userServiceConfiguration.userInfo.confirmPassword){
        //         setMatchPassword(true);
        //         console.log(true, "hrllo")
        //         return;
        //     }
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
    const handleSubmit = async () => {
        // Stop the form from submitting and refreshing the page.
        // event.preventDefault()
        

        // console.log("Password does not match", 
        //         userServiceConfiguration.userInfo.phoneNumber,
		// 		userServiceConfiguration.userInfo.city,
		// 		userServiceConfiguration.userInfo.street,
		// 		userServiceConfiguration.userInfo.countryName 
        //     )
                
        if (!userServiceConfiguration.userInfo.password){
                        setShowRequiredFields(true);
                        return;
                    }
            
     
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
        const error_field = response.json().then(function(result) {
            const keys = Object.keys(result);
            const values = Object.values(result); 
            // console.log(keys);
            return(
            // alert(result)
                // <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                //  <svg className="flex-shrink-0 inline w-4 h-4 mr-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                //     <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                // </svg>
                // <span className="sr-only">Danger</span>
                // <div>
                // <span className="font-medium">Ensure that these requirements are met:</span>
                // <ul className="mt-1.5 ml-4 list-disc list-inside">
            <>
            {keys.map((key:any, index:any) => (
                        //   <li key={index}>
                        //     <strong>{key}:</strong> {JSON.stringify(values[index])}
                        //   </li>
                        alert(key+ " " + values[index])
       

))}
            </>
            // </ul>
            // </div>
            // </div>
            // alert(keys)
            
            );
            
        });
    

     
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        if (response.status === 201) {
            nextStep();
        }else if (response.status=== 400){
            // setShowRequiredFields(true);
            // return (
            //     <div>
            //       <h2>JSON Keys and Values</h2>
            //       <ul>
            //         {keys.map((key, index) => (
            //           <li key={index}>
            //             <strong>{key}:</strong> {JSON.stringify(values[index])}
            //           </li>
            //         ))}
            //       </ul>
            //     </div>
            //   );
            // console.log(error_field)
            // {keys.map((key, index) => (
            //     // <li key={index}>
            //       alert(key)
            //     // {/* </li> */}
            //   ))}
            
            // <span classNameName="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{error_field}</span>
            // return;

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
                            matchPassword={matchPassword}
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
                             <Button
								onClick={() => handleSubmit()}
								type={'secondary'}
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
	);
}
