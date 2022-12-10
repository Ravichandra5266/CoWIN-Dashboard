import {
  BarChart,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="container">
      <h1 className="card-heading">Vaccination Coverage</h1>
      <ResponsiveContainer className="bar-container">
        <BarChart data={last7DaysVaccination}>
          <XAxis dataKey="vaccineDate" tick={{stroke: 'white'}} />
          <YAxis tickFormatter={DataFormatter} tick={{stroke: 'white'}} />
          <Legend iconType="circle" iconSize="20" />
          <Tooltip />
          <Bar dataKey="doseOne" name="Dose 1" fill="#2d87bb" />
          <Bar dataKey="doseTwo" name="Dose 2" fill="#f54394" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
