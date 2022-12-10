import {ResponsiveContainer, PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props
  return (
    <div className="container">
      <h1 className="card-heading">Vaccination by gender</h1>
      <ResponsiveContainer>
        <PieChart width={1000} height={300}>
          <Pie
            cx="50%"
            cy="50%"
            data={vaccinationByGender}
            startAngle={180}
            endAngle={0}
            innerRadius="50%"
            outerRadius="80%"
            dataKey="count"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Others" fill="#2cc6c6" />
          </Pie>
          <Legend iconType="star" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationByGender
