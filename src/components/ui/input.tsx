import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
	animated?: boolean;
}

function Input({ className, type, animated = true, ...props }: InputProps) {
	const Component = animated ? motion.input : 'input';
	
	const motionProps = animated ? {
		whileFocus: { scale: 1.02 },
		transition: { duration: 0.2 }
	} : {};

	return (
		<Component
			type={type}
			data-slot="input"
			className={cn(
				'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 border-b-2 bg-transparent px-3 py-1 text-base shadow-xs outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-200 ease-in-out',
				'focus-visible:placeholder:text-black focus-visible:border-black focus-visible:border-[#00B512]',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				className
			)}
			{...motionProps}
			{...props}
		/>
	);
}

export { Input };