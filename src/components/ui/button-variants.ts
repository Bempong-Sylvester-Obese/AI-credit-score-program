import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer w-fit !p-[1.4rem] rounded-full uppercase",
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg',
				primary: 'bg-gradient-to-r from-[#00B512] to-[#29ad8d] text-white !p-8 shadow-lg hover:shadow-xl hover:from-[#00B512]/90 hover:to-[#29ad8d]/90 transition-all duration-300',
				destructive:
					'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border bg-transparent text-white hover:text-[#E2FF54] hover:border-[#E2FF54] transition-all ease-in-out duration-500 hover:bg-white/5',
				'outline-secondary':
					'border text-[#000] bg-transparent border-[#00B512] font-bold !p-8 btn-secondary hover:border-[#001027] hover:bg-[#00B512]/10 transition-all ease-in-out duration-500',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg',
				ghost:
					'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);