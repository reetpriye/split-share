import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Reet Priye',
    email: 'reetpriye@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    trips: [
      {
        tripName: 'Digha Trip',
        totalExpense: 2434,
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
        membersData: [{ name: 'Raj Singh' }, { name: 'Sonali Kumari' }]
      }
    ]
  },
  {
    name: 'Raj Singh',
    email: 'rajsingh@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    trips: [
      {
        tripName: 'Gangtok Trip',
        membersData: [{ name: 'Raj Singh' }]
      }
    ]
  }
]

export default users
