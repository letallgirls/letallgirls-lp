// Standalone homepage-section link (mirrors the Lovable draft's flat "DIDI" nav
// item — points at the #didi section on the home page).
export const DIDI_LINK = { label: 'DIDI', href: '/#didi' }

export const NAV_GROUPS = [
  // Homepage-section anchors, in the order the sections appear on the page.
  {
    label: 'Our Impact',
    items: [
      { label: 'Proven Impact', href: '/#impact' },
      { label: 'Where We Work', href: '/#where-we-work' },
    ],
  },
  // Standalone pages.
  {
    label: 'About Us',
    items: [
      { label: 'Our Story', href: '/our-story' },
      { label: 'Team & Board', href: '/team' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export const HOW_TO_HELP_LINK = { label: 'How to Help', href: '/help' }
