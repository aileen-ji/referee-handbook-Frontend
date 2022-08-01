import React from 'react'
import ReactMarkdown from 'react-markdown'

import "./UserCreatedCoursePage.css"

import LearningSubBanner from '../LearningSubBanner/LearningSubBanner'
import { CenterFocusStrong } from '@mui/icons-material'

function UserCreatedCoursePage() {

    let currentSport = JSON.parse(localStorage.getItem("current_course"))

    let currentCourse = JSON.parse(localStorage.getItem("current_user_course"))


    //Regular expressions for video code section (dependent on inclusion of ampersand)
    const containsVideoCode = /watch\?v\=(.*)/
    const containsAmpersand = /watch\?v\=(.*)\&/

    /* tests 
        1. does the url contain ATLEAST the video code
        2. does the url contain ATLEAST the video code AND the ampersand
    */
    const acceptableFormat = containsVideoCode.test(currentCourse.course_tutorial_video_url)
    const acceptableAmpersand = containsAmpersand.test(currentCourse.course_tutorial_video_url)
    
    //Sets out video code to the appropriate value based on the inclusion of the ampersand
    let videoCode = acceptableFormat ? currentCourse.course_tutorial_video_url.match(containsVideoCode)[1] : null  //no ampersand
    videoCode = acceptableAmpersand ? currentCourse.course_tutorial_video_url.match(containsAmpersand)[1] : videoCode   //ampersand
    
    
    const ourUrl = "https://www.youtube.com/embed/" + videoCode;

    //regular expression to extract timespan 
    const condensedDate = currentCourse.created_at.match(/^(.*)T/)[1]


    return (
        <div className='user-create-course'>
            
            {/* Conditionally render Learning sub banner if the current course is stored locally (purpose: user persistance) */}
            <div className='sub-banner'>
                { currentCourse ? <LearningSubBanner courseName={currentSport.sport_name} showButtons="true"/> : null} 
            </div>

            <div className='user-content'>
                {/* Render chunk of user created course content  */}
                <div className='main-user-content'>

                    {/* Title and date */}
                    <span className='course-information'>
                        <h3 className='cb-title'>{currentCourse.course_title}</h3>
                        <h3 className='cb-username'>Created by {currentCourse.username}</h3>
                        <h3 className='cb-date'>Created on {condensedDate}</h3>
                    </span>

                    {/* Line separator */}
                    <span className='line-break'>
                        <hr style={{
                            height: 1.5,
                            borderColor : '#000000'
                        }}/>
                    </span>

                    {/* Course content descriptions, both short and long */}
                    <section className='short-description'>
                        <p>{currentCourse.course_short_description}</p>
                    </section>
                    <section className='long-description'>
                        <ReactMarkdown>{currentCourse.course_content}</ReactMarkdown>
                    </section>
                </div>

                {/* Renders youtube video onto the screen IF it contains a video code */}
                <div className='video-container'>
                    {acceptableFormat ? <iframe
                        src={ourUrl}
                        width="750"
                        height="400"
                        allowFullScreen
                    /> : <h2>Please input an appropriate youtube link</h2>}
                </div>
                
                {/* Renders tips and tricks section  */}
                <div className='tips-and-tricks'>

                    {/* Title  */}
                    <h2 className='tips-and-tricks-title'>{'Tips & Tricks'}</h2>

                    {/* Line separator */}
                    <span className='line-break'>
                        <hr style={{
                            height: 1.5,
                            borderColor : '#000000'
                        }}/>
                    </span>
                    
                    {/* Tips and tricks text section */}
                    <div className='tips-and-tricks-text'>
                        <ReactMarkdown>{currentCourse.course_tips_tricks}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCreatedCoursePage