import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const ApiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class CowinDashboard extends Component {
  state = {
    urlStatus: ApiStatusConstant.initial,
    covidData: {},
  }

  componentDidMount() {
    this.getFetchData()
  }

  getFetchData = async () => {
    this.setState({urlStatus: ApiStatusConstant.inProgress})
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'

    const requestUrl = await fetch(covidVaccinationDataApiUrl)

    if (requestUrl.ok === true) {
      const responseData = await requestUrl.json()
      console.log(responseData)
      const formattedData = {
        last7DaysVaccination: responseData.last_7_days_vaccination.map(
          data => ({
            doseOne: data.dose_1,
            doseTwo: data.dose_2,
            vaccineDate: data.vaccine_date,
          }),
        ),
        vaccinationByAge: responseData.vaccination_by_age.map(data => ({
          age: data.age,
          count: data.count,
        })),
        vaccinationByGender: responseData.vaccination_by_gender.map(data => ({
          count: data.count,
          gender: data.gender,
        })),
      }
      this.setState({
        covidData: formattedData,
        urlStatus: ApiStatusConstant.success,
      })
    } else {
      this.setState({urlStatus: ApiStatusConstant.failure})
    }
  }

  renderSpinnerView = () => (
    <div testid="loader" className="spinner">
      <Loader type="Oval" height={50} width={50} color="white" />
    </div>
  )

  renderSuccessView = () => {
    const {covidData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = covidData
    return (
      <>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="error-img"
      />
      <h1 className="error-heading">Something went wrong</h1>
    </div>
  )

  renderConditionComponents = () => {
    const {urlStatus} = this.state
    let showResults = null

    switch (urlStatus) {
      case ApiStatusConstant.success:
        showResults = this.renderSuccessView()
        break
      case ApiStatusConstant.failure:
        showResults = this.renderFailureView()
        break
      case ApiStatusConstant.inProgress:
        showResults = this.renderSpinnerView()
        break

      default:
        showResults = null
        break
    }
    return showResults
  }

  render() {
    return (
      <nav className="navbar-container">
        <div className="navbar-head-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            className="dashboard-logo"
            alt="website logo"
          />
          <p className="dashboard-logo-title">Co-WIN</p>
        </div>
        <h1 className="dashboard-heading">CoWIN Vaccination in India</h1>
        {/* {this.renderConditionComponents()} */}
      </nav>
    )
  }
}

export default CowinDashboard
