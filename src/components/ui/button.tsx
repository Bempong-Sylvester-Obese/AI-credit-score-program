import * as React from 'react';
import { motion } from 'framer-motion';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button-variants';
import { hoverScale } from '@/lib/animations';

interface ButtonProps extends React.ComponentProps<'button'>,
	VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	animated?: boolean;
}

function Button({
	className,
	variant,
	size,
	asChild = false,
	animated = true,
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot : animated ? motion.button : 'button';
	
	const motionProps = animated && !asChild ? {
		whileHover: hoverScale,
		whileTap: { scale: 0.95 },
		transition: { duration: 0.2 }
	} : {};

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...motionProps}
			{...props}
		/>
	);
}

export { Button };