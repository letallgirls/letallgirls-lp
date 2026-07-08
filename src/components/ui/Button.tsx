import type { AnchorHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'on-dark'

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-brave-primary text-cloud-light',
  secondary: 'bg-brave-light text-brave-primary',
  // for use on dark or saturated/gradient surfaces — flips to a light pill for contrast
  'on-dark': 'bg-cloud-light text-night',
}

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold text-center transition-transform duration-200 ease-[var(--ease-out-slow)] hover:-translate-y-1 active:translate-y-0 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}
