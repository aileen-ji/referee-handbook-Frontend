import React from 'react'
import './CreateCourseForm.css'
import { useState } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import apiClient from '../../services/apiClient';

import MarkdownModal from '../MarkdownModal/MarkdownModal';
import MarkdownPreviewModal from '../MarkdownPreviewModal/MarkdownPreviewModal';

export default function CreateCourseForm() {



    const sportName = useParams();



    //global var
    let emptyCourseForm = {sportName: sportName.sportsName}


    //state variables
    const [courseForm, setCourseForm] = useState(emptyCourseForm)
    const [difficulty, setDifficulty] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [previewIsOpen, setPreviewIsOpen] = useState(false)
    const [tipsIsOpen, setTipsIsOpen] = useState(false)


    //handlers for opening and closing our markdown help modal
    function openModal (event) {
        event.preventDefault()
        setIsOpen(true)
    }

    function closeModal (event) {
        setIsOpen(false)
    }

    //handlers for opening and closing our Long description preview modal
    function openPreviewModal (event) {
        event.preventDefault()
        setPreviewIsOpen(true)
    }

    function closePreviewModal (event) {
        setPreviewIsOpen(false)
    }

    //handlers for opening and closing our Tips and Tricks preview modal
    function openTipsPreviewModal (event) {
        event.preventDefault()
        setTipsIsOpen(true)
    }

    function closeTipsPreviewModal (event) {
        setTipsIsOpen(false)
    }


    //handlers for form components
    function handleOnInputChange (evt) {
        setCourseForm((form) => ({ ...form, [evt.target.name]: evt.target.value }))
    }

    function handleDropdownChange (evt)  {
        setDifficulty(evt.target.value)
        setCourseForm((form) => ({ ...form, ["difficulty"]: evt.target.value }))
    }



    //create onsubmit handler to call apiClient and post new user created course 
    const handleOnSubmitCourseForm = async () => {
        setError(null)
        const {data, error} = await apiClient.createUserCourse(courseForm, sportName.sportsName)
        if (error) {
          setError(error)
        }
        if(data){
            navigate(`/learning/${sportName}`)
          // navigate to the newly created user course
          // reset frontend form data
        }
      }

    

  return (
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1.25, width: '70vw' },
    }}
    noValidate
    autoComplete="off">
        <div className="create-course-form">
            <div className="create-course-title-container">
                <h1 className="create-course-title"><em>Create a New Course</em></h1>
            </div>
            <div className="create-course-form-container">
                <div className="input-container">
                    <TextField
                    className="input-field"
                    label="Course Name"
                    type="text"
                    name="courseName"
                    value = {courseForm.courseName}
                    onChange = {handleOnInputChange}
                    sx={{backgroundColor : 'white'}}
                    variant="filled"
                    />
                </div>
                <div className="input-container">
                    <TextField
                    className="input-field"
                    label="Short Description"
                    type="text"
                    name="shortDescription"
                    multiline={true}
                    rows={2}
                    value = {courseForm.shortDescription}
                    onChange = {handleOnInputChange}
                    sx={{backgroundColor : 'white'}}
                    variant="filled"
                    />
                </div>

                {/* Open and close modal buttons */}
                <div className='open-modals'>
                    <p className='modal-button' onClick={openModal}><u>Markdown cheat-sheet</u></p>
                    <p className='modal-button' onClick={openPreviewModal}><u>Preview Markdown</u></p>
                </div>
                
                <div className='main-content-input'>

                    {/* render components for modals */}
                    <MarkdownModal open={isOpen} onClose={closeModal}/>
                    <MarkdownPreviewModal content={courseForm.detailedDescription} open={previewIsOpen} onClose={closePreviewModal} />
                    
                    <div className="input-container">
                        <TextField
                        className="input-field"
                        label="Detailed Description"
                        type="text"
                        name="detailedDescription"
                        multiline={true}
                        rows={4}
                        value = {courseForm.detailedDescription}
                        onChange = {handleOnInputChange}
                        sx={{backgroundColor : 'white'}}
                        variant="filled"
                        />
                    </div>
                </div>
                <div className ="medias">
                    <div className="media-input-container">
                        <TextField
                            className="tutorial-video-input-field"
                            label="Tutorial Video URL"
                            type="text"
                            name="tutorialVideoURL"
                            value = {courseForm.tutorialVideoURL}
                            onChange = {handleOnInputChange}
                            sx={{backgroundColor : 'white'}}
                            variant="filled"
                            />
                            <TextField
                            className="cover-image-input-field"
                            label="Cover Image URL"
                            type="text"
                            name="coverImageURL"
                            value = {courseForm.coverImageURL}
                            onChange = {handleOnInputChange}
                            sx={{backgroundColor : 'white'}}
                            variant="filled"
                            />
                        <FormControl variant="filled" sx={{ m: 1, height: "6.5ch", minWidth: "15ch", width: "100ch", textAlign:"left", backgroundColor: "whitesmoke", color: "whitesmoke"}}>
                            <InputLabel>DIFFICULTY</InputLabel>
                            <Select
                            value={difficulty}
                            onChange={handleDropdownChange}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Beginner"}>Beginner</MenuItem>
                            <MenuItem value={"High School"}>High School</MenuItem>
                            <MenuItem value={"Collegiate"}>Collegiate</MenuItem>
                            <MenuItem value={"Amateur"}>Amateur</MenuItem>
                            <MenuItem value={"Professional"}>Professional</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                {/* Open and close modal buttons */}
                <div className='open-modals'>
                    <p className='modal-button' onClick={openTipsPreviewModal}><u>Preview Markdown</u></p>
                </div>

                {/* render components for modals */}
                <MarkdownPreviewModal content={courseForm.tipsAndTricks} open={tipsIsOpen} onClose={closeTipsPreviewModal} />

                <div className="input-container">
                    <TextField
                    className="input-field"
                    label="Tips and Tricks"
                    type="text"
                    name="tipsAndTricks"
                    multiline={true}
                    rows={3}
                    value = {courseForm.tipsAndTricks}
                    onChange = {handleOnInputChange}
                    sx={{backgroundColor : 'white'}}
                    variant="filled"
                    />
                </div>
            </div>
            <div className="submit-course-btn-container">
                <Button className="create-course-btn" onClick={handleOnSubmitCourseForm} variant="contained" size="large" endIcon={<CreateIcon/>}  shrink="false" sx={{ color: 'black', padding: "14px 110px", fontSize: '17px', backgroundColor: 'whitesmoke', ':hover' :{ bgcolor: 'gray', color: 'white'} }} > CREATE</Button>
            </div>
            {error? <p className ="course-submit-error">{error}</p>: null}
        </div>
    </Box>
  )
}

