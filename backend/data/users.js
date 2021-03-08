import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Reet Priye',
    email: 'reetpriye@gmail.com',
    password: bcrypt.hashSync('Reet@1234', 10),
    trips: [
      {
        tripName: 'Digha Trip',
        totalExpense: 540,
        membersData: [
          { name: 'Raj Singh' },
          { name: 'Manish Kumar' },
          { name: 'Ankit Kumar' },
          { name: 'Reet Priye' },
          { name: 'Ashish Kumar' }
        ]
      },
      {
        tripName: 'Goa Trip',
        totalExpense: 9999,
        membersData: [{ name: 'Raj Singh' }, { name: 'Sonali Kumari' }]
      }
    ]
  },
  {
    name: 'Raj Singh',
    email: 'rajsingh@gmail.com',
    password: bcrypt.hashSync('Raj@1234', 10),
    trips: [
      {
        tripName: 'Gangtok Trip',
        membersData: [{ name: 'Raj Singh' }]
      }
    ]
  }
]

export default users
