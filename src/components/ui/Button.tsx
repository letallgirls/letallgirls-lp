import type { AnchorHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'primary-on-blue' | 'primary-on-dark'

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-scheme1-button text-scheme1-button-text',
  secondary: 'bg-scheme1-secondary text-scheme1-secondary-text',
  'primary-on-blue': 'bg-blue-button text-blue-button-text',
  'primary-on-dark': 'bg-dark-button text-dark-button-text',
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
