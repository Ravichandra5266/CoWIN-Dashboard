import {ResponsiveContainer, PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props
  return (
    <div className="container">
      <h1 className="card-heading">Vaccination by age</h1>
      <ResponsiveContainer>
        <PieChart width={1000} height={300}>
          <Pie
            cx="50%"
            cy="50%"
            data={vaccinationByAge}
            startAngle={0}
            endAngle={360}
            innerRadius="0"
            outerRadius="80%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#f54394" />
            <Cell name="45-60" fill="#5a8dee" />
            <Cell name="Above 60" fill="#2cc6c6" />
          </Pie>
          <Legend iconType="star" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationByAge
