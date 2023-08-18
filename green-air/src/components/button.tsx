import clsx from 'clsx';

interface ButtonProps {
	type?: 'primary' | 'secondary' | 'ghost' | 'loading';
	size?: 'sm' | 'md' | 'lg';
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
    disabled?: boolean;
    onSubmit?: () => void;
}

export const Button = ({
	type = 'primary',
	children,
	size = 'md',
	className,
	onClick,
    disabled,
    onSubmit,

}: ButtonProps) => {
	const typeClasses =
		type === 'primary'
			? 'bg-primary-purplish-blue text-white hover:opacity-70'
			: type === 'secondary'
			? 'bg-primary-marine-blue text-white hover:opacity-70'
			: type == 'ghost'
            ? 'bg-transparent text-neutral-cool-gray'
            : 'bg-primary-marine-blue text-white hover:opacity-70'
	const sizeClasses =
		size === 'sm'
			? 'text-sm p-0'
			: size === 'lg'
			? 'text-lg px-5 py-2 font-medium'
			: 'px-5 py-2 font-medium';
	return (
		<button
			onClick={onClick}
			className={clsx(`rounded `, typeClasses, sizeClasses, className)}
            disabled={disabled}
            onSubmit={onSubmit}
		>
			{children}
		</button>
	);
};