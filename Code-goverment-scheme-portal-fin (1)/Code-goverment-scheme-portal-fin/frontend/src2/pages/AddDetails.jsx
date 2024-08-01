import { 
    Container, Box, Card, Typography, TextField, 
    Button, 
    Avatar
  } from '@mui/material';
  import React, { useContext, useEffect, useState, useRef } from 'react'
  import { useLocation, useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import AuthContext from '../context/AuthContext';
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
    const [year, setYear] = useState('')
    const [category, setCategory] = useState('')
    const [youtubelink, setYoutubelink] = useState('')
    const [content, setContent] = useState('')
    const [contentlink, setContentLink] = useState('')
    const [other1, setOther1] = useState('')
    const [other2, setOther2] = useState('')
   

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
      formData.append("title", title)
      formData.append("description", description)
      formData.append("year", year)
      formData.append("category", category)
      formData.append("youtubelink", youtubelink)
      formData.append("content", content)
      formData.append("contentlink", contentlink)
      formData.append("other1", other1)
      formData.append("other2", other2)


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
            setYear("")
            setCategory("")
            setYoutubelink("")
            setContent("")
            setContentLink("")
            setOther1("")
            setOther2("")
            // setTrailer("")
            // setRating("")
            // setGenre("")
            // setWriters("")
            // setDirectors("")
            // setExtra("")

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
                Add Details
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
           
            <CustomStyledTextField 
              label="Category"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              fullWidth 
            />
            <CustomStyledTextField 
              label="Title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth 
            />
             <CustomStyledTextField 
              label="Description"
              placeholder="Some description about the scheme...."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth 
            />
            
             <CustomStyledTextField 
              label="Year"
              placeholder="Some Year about the scheme...."
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              fullWidth 
            />

            <CustomStyledTextField 
              label="YoutTube link"
              placeholder="YoutTube link"
              value={youtubelink}
              onChange={(e) => setYoutubelink(e.target.value)}
              required
              fullWidth 
            />
            <Box display="flex" justifyContent="center" gap={2}>
              <Avatar src={uploadedFile} variant="square" />
              <input 
                type="file"
                ref={fileRef}
                style={{ display: "none" }}
                onChange={uploadFileHandler}
              />
              <Button variant='contained'
              sx={{ 
                width: '400px',
                backgroundColor: '#fff',
                color: '#000',
             }}
              onClick={ () => fileRef.current.click() }>
                Upload Image
              </Button>
            </Box>
           
            <CustomStyledTextField 
              label="Content"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              fullWidth 
            /> 
            <CustomStyledTextField 
              label="Content link"
              placeholder="Content link"
              value={contentlink}
              onChange={(e) => setContentLink(e.target.value)}
              required
              fullWidth 
            />
            <CustomStyledTextField 
              label="Other 1"
              placeholder="Other 2"
              value={other1}
              onChange={(e) => setOther1(e.target.value)}
              required
              fullWidth 
            />
            <CustomStyledTextField 
              label="Other 2"
              placeholder="Other 2"
              value={other2}
              onChange={(e) => setOther2(e.target.value)}
              required
              fullWidth 
            />
        
            <CustomButton type="submit" variant="contained" size="large" >
              Add Details
            </CustomButton>
          </Box>
        </Card>
      </Container>
    )
  }
  
  export default AddDetails
  