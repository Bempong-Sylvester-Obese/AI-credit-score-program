import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button-variants';
import { hoverScale } from '@/lib/animations';

interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'onAnimationStart'>,
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
	if (asChild) {
		return (
			<Slot
				data-slot="button"
				className={cn(buttonVariants({ variant, size, className }))}
				{...props}
			/>
		);
	}

	if (animated) {
		return (
			<motion.button
				data-slot="button"
				className={cn(buttonVariants({ variant, size, className }))}
				whileHover={hoverScale}
				whileTap={{ scale: 0.95 }}
				transition={{ duration: 0.2 }}
				{...(props as HTMLMotionProps<'button'>)}
			/>
		);
	}

	return (
		<button
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button };