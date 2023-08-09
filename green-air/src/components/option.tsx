import clsx from 'clsx';
import { FormEvent,  } from 'react';
import { useState } from "react";

import { COUNTRIES } from "./country";
import { SelectMenuOption } from "./types";


interface InputProps {
	label: string;
	value: string | undefined;
	onChange: (e: FormEvent<HTMLSelectElement>) => void;
}
export const Option = ({
	label,
	value,
	onChange,
}: InputProps) => {
    // const ref = useRef<HTMLDivElement>(null);
    
    // getCountry(() => {
    //         return COUNTRIES.map((country) => {
    //           return <option value={country.name}>{country.name} 
    //                  </option>;
    //         });
          
    //   }, [ref]);
    
  
	return (
		<div className="flex flex-col font-medium">
			<span className="inline-flex justify-between">
				<label
					htmlFor={label}
					className="text-sm text-primary-marine-blue "
				>
					{label}
				</label>      
				
			</span>

            <div>
       
            {/* <select
                className={clsx(
					'border border-neutral-light-gray rounded px-4 py-2 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue',
					showRequired &&
						required &&
						!value &&
						'ring-1 ring-primary-starberry-red'
				)}
                value={selectedCountry}
                onChange={(e: FormEvent<HTMLInputElement>) => onChange(e)}
            >
                {!!countryArr?.length &&
                countryArr.map(({ label, value }) => (
                    <option key={value} value={value}>
                    {label}
                    </option>
                ))}
            </select> */}
            </div>
			<select
				id={label}
				value={value}
				className={clsx(
					'border border-neutral-light-gray rounded px-4 py-2 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue',
					
						!value &&
						'ring-1 ring-primary-starberry-red'
				)}
                onChange={(e: FormEvent<HTMLSelectElement>) => onChange(e)}
				>
                {COUNTRIES.map((country) => {
                return <option value={country.name}>{country.name} 
                        </option>
                })}

            </select>
             {/* <select
             id={label}
             className={clsx(
                'border border-neutral-light-gray rounded px-4 py-2 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue',

            )}
             >
               
             </select> */}
		</div>
	);
};