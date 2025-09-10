import { currentYear } from '@/app/common/constants'

type PaymentMethodType = {
  image: string
  number?: number
}

type BillingType = {
  date: string
  title: string
  payment_method: PaymentMethodType
  status: string
  total: number
}

export const BillingHistory: BillingType[] = [
  {
    date: '4/2/' + currentYear,
    title: 'Sketch from A to Z: for app designer',
    payment_method: {
      image: 'assets/images/client/mastercard.svg',
      number: 4568,
    },
    status: 'Paid',
    total: 350,
  },
  {
    date: '10/1/' + currentYear,
    title: 'Create a Design System in Figma',
    payment_method: {
      image: 'assets/images/client/mastercard.svg',
      number: 2588,
    },
    status: 'Paid',
    total: 242,
  },
  {
    date: '21/1/' + currentYear,
    title: 'The Complete Web Development in python',
    payment_method: {
      image: 'assets/images/client/paypal.svg',
    },
    status: 'Pending',
    total: 576,
  },
  {
    date: '18/1/' + currentYear,
    title: 'Deep Learning with React-Native',
    payment_method: {
      image: 'assets/images/client/mastercard.svg',
      number: 2588,
    },
    status: 'Cancel',
    total: 425,
  },
]
