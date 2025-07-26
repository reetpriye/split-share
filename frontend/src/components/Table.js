import './styles/Table.css'

const Table = () => {
  return (
    <table className='styled-table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Payer</th>
          <th>Exclude</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Dom</td>
          <td>6000</td>
          <td>Dom</td>
          <td>6000</td>
        </tr>
        <tr className='active-row'>
          <td>Melissa</td>
          <td>5150</td>
          <td>Melissa</td>
          <td>5150</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table
