// Duration options configuration
export const DURATION_OPTIONS = [
  { value: 30, label: '30 minutes', icon: '⚡' },
  { value: 60, label: '1 hour', icon: '🚚' },
  { value: 120, label: '2 hours', icon: '⛰️' },
  { value: 180, label: '3 hours', icon: '☀️' },
] as const;

// Form field configuration
export const FORM_FIELDS = {
  personalInfo: {
    title: '1. Personal Information',
    fields: [
      {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'John Doe',
        icon: '👤',
        required: true,
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'john@example.com',
        icon: '✉️',
        required: true,
      },
      {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: '+353 1 784 5678',
        icon: '📞',
        required: true,
      },
    ],
  },
  preferences: {
    title: '2. Test Drive Preferences',
    fields: [
      {
        name: 'date',
        label: 'Preferred Date',
        type: 'date',
        icon: '📅',
        required: true,
      },
      {
        name: 'time',
        label: 'Preferred Time',
        type: 'time',
        icon: '⏰',
        required: true,
      },
    ],
  },
} as const;