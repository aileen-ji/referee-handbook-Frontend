import React, { useEffect, useState } from 'react'
import "./HomeNewsCard.css"
import moment from 'moment'

function HomeNewsCard(props) {
  //useState variable to set and display the time difference of the article
  const [time, setTime] = useState(null)


  // uses momentsJS to render the time depending on when the news was from
  function findTime(){
    let now = new Date()
    let then = new Date(props.time)

    const startTime = moment(then)
    const endTime = moment(now)

    // time difference between when article was published and now
    const diff = endTime.diff(startTime)
    const diffDuration = moment.duration(diff);


    // if diffDuration is less than 60 minutes, has 0 for hours/days/months/years, display minutes
    if(diffDuration.minutes() < 60 && diffDuration.hours() == 0 && diffDuration.days() == 0 && diffDuration.months() == 0 && diffDuration.years() == 0){
      setTime(diffDuration.minutes()+" minutes ago")
    }
    // if diffDuration is less than 24 hours, has 0 for days/months/years, display hours
    else if(diffDuration.hours() < 24 && diffDuration.days() == 0 && diffDuration.months() == 0 && diffDuration.years() == 0){
      setTime(diffDuration.hours() +" hours ago")
    }
    // if diffDuration is 1 day, has 0 for /months/years, display 1 day
    else if(diffDuration.days() == 1 && diffDuration.months() == 0 && diffDuration.years() == 0){
      setTime(diffDuration.days() + " day ago")
    }
    // if diffDuration is more than a day, render date
    else{
      setTime(then.toDateString())
    }
  }

  // calculates time difference on load
  useEffect(()=>{
    findTime()
  }, [])

  return (
    <div className='home-news-card'>
      <a href={props.url} target="_blank">
        <div className='card-grid'>
          <img src={props.imageUrl} className="news-img"></img>
        <h3 className='news-time'>{time}</h3>
        <p className='news-title'>{props.title}</p>
        </div>
        
      </a>
      
    </div>
  )
}

export default HomeNewsCard