import { currentYear } from '@/app/common/constants'

type PayoutType = {
  title: string
  amount: number
  status: string
  date: string
}

export const PayoutList: PayoutType[] = [
  {
    title: 'Successful payout #102356',
    amount: 3999,
    status: 'Paid',
    date: '18/1/' + currentYear,
  },
  {
    title: 'Successful payout #102589',
    amount: 4875,
    status: 'Paid',
    date: '12/1/' + currentYear,
  },
  {
    title: 'Successful payout #108645',
    amount: 1800,
    status: 'Cancelled',
    date: '22/1/' + currentYear,
  },
  {
    title: 'Successful payout #108645',
    amount: 6800,
    status: 'Paid',
    date: '28/1/' + currentYear,
  },
  {
    title: 'Successful payout #108645',
    amount: 3576,
    status: 'Pending',
    date: '12/1/' + currentYear,
  },
]
