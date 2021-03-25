import moment from 'moment'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const generatePDF = (transactions, expenseData) => {
  const doc = new jsPDF()

  let membersDetails = ''
  expenseData.membersData.map(m =>
    m.amount >= 0
      ? (membersDetails += `${m.name} will receive ${Math.abs(
          m.amount.toFixed(2)
        )}\n`)
      : (membersDetails += `${m.name} needs to pay ${Math.abs(
          m.amount.toFixed(2)
        )}\n`)
  )

  let membersName = ''
  expenseData.membersData.map(m => (membersName += `${m.name}\n`))

  const tableColumn = [
    'Date',
    'Description',
    'Total Amount',
    'Payers',
    'Excludes'
  ]
  const tableRows = []

  transactions.forEach(transaction => {
    let payersDetails = ''
    let excludesDetails = ''
    transaction.payers.forEach(
      payer => (payersDetails += `${payer.name} ${payer.amount}\n`)
    )
    transaction.excludes.forEach(
      exclude => (excludesDetails += `${exclude.name}\n`)
    )
    const transactionsDetails = [
      moment(transaction.createdAt).format('MMM Do YY'),
      transaction.description,
      transaction.totalAmount,
      payersDetails,
      excludesDetails
    ]

    tableRows.push(transactionsDetails)
  })

  const startDate = moment(transactions[0].createdAt).format('MM-DD-YYYY')
  const endDate = moment(
    transactions[transactions.length - 1].createdAt
  ).format('MM-DD-YYYY')

  doc.setFontSize(20)
  doc.setTextColor(0, 0, 255)
  doc.setFont('helvetica', 'bold')
  doc.text(
    `${expenseData.expenseName.toUpperCase()}`,
    100,
    15,
    null,
    null,
    'center'
  )

  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  doc.text(`Total expense: ${expenseData.totalExpense}`, 14, 25)

  doc.setTextColor(100)
  doc.setFont('times', 'italic')
  doc.text(`${membersDetails}`, 195, 25, null, null, 'right')

  const yMargin = expenseData.membersData.length * 5 + 40 - 5

  doc.line(14, yMargin - 8, 195, yMargin - 8)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.text(`All Transactions(${startDate} to ${endDate})`, 14, yMargin)

  doc.autoTable(tableColumn, tableRows, { startY: yMargin + 5 })

  // Save pdf
  const date = Date().split(' ')
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  doc.save(`report_${dateStr}.pdf`)
}

export default generatePDF
