import clsx from 'clsx';
import { FormEvent } from 'react';
import { isBreakOrContinueStatement } from 'typescript';

interface InputProps {
	label: string;
	value: string | undefined;
	placeholder?: string;
	type?: string;
	required?: boolean;
	showRequired?: boolean;
    matchPassword?: boolean;
	onChange: (e: FormEvent<HTMLInputElement>) => void;
}

type EmailExist = {
    exist: boolean;
 
}



export const Input = ({
	label,
	value,
	type = 'text',
	placeholder = 'Enter a value',
	onChange,
	showRequired = false,
	required = true,
    matchPassword = false,
}: InputProps) => {
    const email = value
    function isValidEmail(email: any): boolean {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }
    const isValid = isValidEmail(email)===true;
   
	return (
		<div className="flex flex-col font-medium">
			<span className="inline-flex justify-between">
				<label
					htmlFor={label}
					className="text-sm text-primary-marine-blue "
				>
					{label}
				</label>    
                <>
        
                    {
                        label==="First Name" ? (
                            required && showRequired ? 
                            <p className="text-primary-starberry-red leading-3">
                                This field is required
                            </p> : ""
                    ):(
                        label==="Last Name" ? (
                            required && showRequired ? 
                            <p className="text-primary-starberry-red leading-3">
                                This field is required
                            </p> : ""
                    ):(
                        label==="Email Address" ? (
                            required && showRequired ? 
                                <p className="text-primary-starberry-red leading-3">
                                    This field is required
                                </p>
                                :
                                ( !isValid && email &&
                                    <p className="text-primary-starberry-red leading-3">
                                        Incorrect Email format
                                    </p> 
                                    
                                   
                                )          
                    ):(
                        label==="City" ? (
                            required && showRequired ? 
                            <p className="text-primary-starberry-red leading-3">
                                This field is required
                            </p> : ""
                    ):(
                        label==="Password" ? (
                            required && showRequired ? 
                            <p className="text-primary-starberry-red leading-3">
                                This field is required
                            </p> : ""
                        ):""
                    ))))}
                </>  
			</span>
			<input
				type={type}
				id={label}
				value={value}
				className={clsx(
					'border border-neutral-light-gray rounded px-4 py-2 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue',
					showRequired &&
						required &&
						!value &&
						'ring-1 ring-primary-starberry-red'
				)}
				placeholder={placeholder}
				onChange={(e: FormEvent<HTMLInputElement>) => onChange(e)}
			/>
		</div>
	);
};