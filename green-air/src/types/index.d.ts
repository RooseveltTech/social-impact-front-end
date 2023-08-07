declare module 'AppTypes' {
	export interface UserServiceConfiguration {
		userInfo: UserInfo;
        
	}


	export interface UserInfo {
		firstName: string;
		lastName: string;
		email: string;
        phoneNumber: string;
        city: string;
        street: string;
        countryCode: string;
        countryName: string;
        password: string;
        confirmPassword: string;

	}

}