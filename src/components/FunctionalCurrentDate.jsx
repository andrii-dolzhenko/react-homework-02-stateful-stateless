import { useEffect, useState } from 'react'

function FunctionalCurrentDate() {
  const [currentDate, setCurrentDate] = useState(() => new Date())

  useEffect(() => {
    const dateTimer = window.setInterval(() => {
      setCurrentDate(new Date())
    }, 60_000)

    return () => {
      window.clearInterval(dateTimer)
    }
  }, [])

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

export default FunctionalCurrentDate
