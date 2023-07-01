import { HTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils/utils';

const LgHeadingVariants = cva("text-black dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter", {
    variants: {
        size: {
            default: 'text-4xl md:text-5xl lg:text-6xl',
            lg: 'text-5xl md:text-6xl lg:text-7xl',
            sm: 'text-2xl md:text-3xl lg:text-4xl',
        }
    },
    defaultVariants: {
        size: 'default',
    }
})

interface LgHeadingProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof LgHeadingVariants> {
}

const LgHeading = forwardRef<HTMLHeadingElement, LgHeadingProps>(({
    className, size, children, ...props
}, ref) => {
    return <h1 ref={ref} {...props} className={cn(LgHeadingVariants({size, className}))}>
        {children}
    </h1>
})

LgHeading.displayName = 'LargeHeading'

export default LgHeading