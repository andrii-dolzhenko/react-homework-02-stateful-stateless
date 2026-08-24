import { Component } from 'react'

class ClassCurrentDate extends Component {
  state = {
    currentDate: new Date(),
  }

  componentDidMount() {
    this.dateTimer = window.setInterval(() => {
      this.setState({ currentDate: new Date() })
    }, 60_000)
  }

  componentWillUnmount() {
    window.clearInterval(this.dateTimer)
  }

  render() {
    const { currentDate } = this.state
    const readableDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(currentDate)
    const dateTime = [
      currentDate.getFullYear(),
      String(currentDate.getMonth() + 1).padStart(2, '0'),
      String(currentDate.getDate()).padStart(2, '0'),
    ].join('-')

    return (
      <time className="app-header__date" dateTime={dateTime}>
        {readableDate}
      </time>
    )
  }
}

export default ClassCurrentDate
