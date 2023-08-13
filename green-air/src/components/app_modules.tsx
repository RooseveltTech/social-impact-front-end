
interface ButtonProps {
	// type?: 'primary' | 'secondary' | 'ghost';
	// size?: 'sm' | 'md' | 'lg';
	children: React.ReactNode;
	// className?: string;
	onClick?: () => void;
}

export const PostOnForum = ({
	// type = 'primary',
	children,
	// size = 'md',
	// className,
	onClick,
}: ButtonProps) => {
	return (
		<button
            type="submit"
			onClick={onClick}
			className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
		>
			{children}
            
		</button>
    )
};


