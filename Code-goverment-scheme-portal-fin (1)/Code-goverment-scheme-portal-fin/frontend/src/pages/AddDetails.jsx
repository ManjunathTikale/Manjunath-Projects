import { 
    Container, Box, Card, Typography, TextField, 
    Button, 
    Avatar
  } from '@mui/material';
  import React, { useContext, useEffect, useState, useRef } from 'react'
  import { useLocation, useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import AuthContext from '../context/AuthContext';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';

import { styled } from '@mui/system';

  
  const CustomStyledTextField = styled(TextField)({
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1976D2', 
    },
  });
  // PasswordField
  
  const CustomButton = styled(Button)({
    backgroundColor: '#FFCC01',
    color: '#000',
    '&:hover': {
      backgroundColor: '#02144D',
      color: '#fff  '
    },
  });

  const AddDetails = () => {
    const navigate = useNavigate()
    const fileRef = useRef(null)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [uploadedFile, setUploadedFile] = useState(null)
    const [image, setImage] = useState(null)
    
    const [rating, setRating] = useState('')
    const [year, setYear] = useState('')
    const [trailer, setTrailer] = useState('')
    const [genre, setGenre] = useState('')
    const [writers, setWriters] = useState('')
    const [directors, setDirectors] = useState('')
    const [extra, setExtra] = useState('')

    const { user } = useContext(AuthContext)
  
    useEffect(() => {
      if(!user) {
        navigate("/login")
      }
    }, [user])

    const uploadFileHandler = (e) => {
      e.preventDefault()

      const file = e.target.files[0]

      if (file) {
        const reader = new FileReader()
        
        reader.onload = () => {
          setUploadedFile(reader.result)
        }
        
        reader.readAsDataURL(file)
        setImage(file)

      }
    }
  
    const onSubmitHandler = async (e) => {
      e.preventDefault()

      const formData = new FormData()

      formData.append("image", image)
      formData.append("trailer", trailer)
      formData.append("title", title)
      formData.append("description", description)
      formData.append("rating", rating) 
      formData.append("year", year)
      formData.append("genre", genre)
      formData.append("writers", writers)
      formData.append("directors", directors)
      formData.append("extra", extra)

      // Send Backend API
      try {
        const res = await axios.post("/api/details", formData, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        if(res.data?.success) {
            setTitle("")
            setDescription("")
            setTrailer("")
            setRating("")
            setYear("")
            setGenre("")
            setWriters("")
            setDirectors("")
            setExtra("")

            setUploadedFile(null)
            setImage(null)
            alert("details added successfully.")
        } else  {
          alert("Something went wrong!")
        }
      } catch (err) {
        console.error(err)
        alert(err.response?.data?.message)
      }    
  
    }
  
    return (
      <Container 
        sx={{ 
          paddingTop: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }} 
        maxWidth="sm"
      >
        <Card
          sx={{
            width: 450,
            mb: 6,
            pb: 3
          }}
        >
          <Box bgcolor="#FFCC01">
            <Typography
              py={2} 
              align="center" 
              fontWeight="bold"
              variant="h5"
              color="#000"
            >
                Add Goverment Scheme Details
            </Typography>
          </Box>
          <Box 
            component="form"
            onSubmit={onSubmitHandler}
            display="flex" 
            flexDirection="column" 
            gap={2.5} 
            mt={6} 
            px={4}
          >
            <Box display="flex" justifyContent="center" gap={2}>
              <Avatar src={uploadedFile} variant="square" />
              <input 
                type="file"
                ref={fileRef}
                style={{ display: "none" }}
                onChange={uploadFileHandler}
              />
              <CustomButton variant='contained' style={{width: "400px"}} onClick={ () => fileRef.current.click() }>
                Upload Image
              </CustomButton>
            </Box>
            <CustomStyledTextField 
              label="Scheme Category"
              placeholder="Scheme Category"
              value={directors}
              onChange={(e) => setDirectors(e.target.value)}
              fullWidth 
            />
            <CustomStyledTextField 
              label="Scheme Title"
              placeholder="Scheme Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth 
            />
             <BaseTextareaAutosize 
              label="Description"
              placeholder="description detail...."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth 
              style={{
                height: 60,
                '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#31586C', 
                },
              }}
            />
             <CustomStyledTextField 
              label="Contact Number"
              placeholder="8888888888"
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              fullWidth 
            />
            <CustomStyledTextField 
              label="Year"
              placeholder="2022"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              fullWidth 
            />
            <CustomStyledTextField 
              label="YouTube Link"
              placeholder="www.youtube.com"
              value={trailer}
              onChange={(e) => setTrailer(e.target.value)}
              required
              fullWidth 
            />
            <CustomStyledTextField 
              label="Content"
              placeholder="Content"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              fullWidth 
            />
            <CustomStyledTextField 
              label="Content Link"
              placeholder="Content Link"
              value={writers}
              onChange={(e) => setWriters(e.target.value)}
              fullWidth 
            />
           
            <CustomStyledTextField 
              label="Other"
              placeholder="Other"
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              fullWidth 
            />
            <CustomButton type="submit" variant="contained" size="large" >
              Submit Details
            </CustomButton>
          </Box>
        </Card>



        
      </Container>
      
    )
  }
  
  export default AddDetails
  