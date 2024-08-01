import { 
    Container, Box, Card, Typography, TextField, 
    Button, 
    Avatar
  } from '@mui/material';
  import React, { useContext, useEffect, useState, useRef } from 'react'
  import { useLocation, useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import AuthContext from '../context/AuthContext';
import { Category } from '@mui/icons-material';
  
  
  const AddScheme = () => {
    const navigate = useNavigate()
    const fileRef = useRef(null)

    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [youtubelink, setYoutubelink] = useState('')
    const [uploadedFile, setUploadedFile] = useState(null)
    const [image, setImage] = useState(null)
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
      formData.append("category", category)
      formData.append("title", title)
      formData.append("description", description)
      formData.append("youtubelink", youtubelink)
      formData.append("content", content)
      formData.append("contentlink", contentlink)
      formData.append("other1", other1)
      formData.append("other2", other2)
 
      // Send Backend API
      try {
        const res = await axios.post("/api/schemes", formData, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        if(res.data?.success) {
            setCategory("")
            setTitle("")
            setDescription("")
            setYoutubelink("")
            setContent("")
            setContentLink("")
            setOther1("")
            setOther2("")
          

            setUploadedFile(null)
            setImage(null)
            alert("Scheme added successfully.")
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
          <Box bgcolor="primary.main">
            <Typography
              py={2} 
              align="center" 
              fontWeight="bold"
              variant="h5"
              color="#FFF"
            >
                Add Scheme
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
            {/* <Box display="flex" justifyContent="center" gap={2}>
              <Avatar src={uploadedFile} variant="square" />
              <input 
                type="file"
                ref={fileRef}
                style={{ display: "none" }}
                onChange={uploadFileHandler}
              />
              <Button variant='contained' onClick={ () => fileRef.current.click() }>
                Upload Image
              </Button>
            </Box> */}
            <TextField 
              label="Category"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              fullWidth 
            />
            <TextField 
              label="Title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth 
            />
             <TextField 
              label="Description"
              placeholder="Some description about the scheme...."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth 
            />
            <TextField 
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
           
            <TextField 
              label="Content"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              fullWidth 
            /> 
            <TextField 
              label="Content link"
              placeholder="Content link"
              value={contentlink}
              onChange={(e) => setContentLink(e.target.value)}
              required
              fullWidth 
            />
            <TextField 
              label="Other 1"
              placeholder="Other 2"
              value={other1}
              onChange={(e) => setOther1(e.target.value)}
              required
              fullWidth 
            />
            <TextField 
              label="Other 2"
              placeholder="Other 2"
              value={other2}
              onChange={(e) => setOther2(e.target.value)}
              required
              fullWidth 
            />
        
            <Button type="submit" variant="contained" size="large" >
              Add Scheme
            </Button>
          </Box>
        </Card>
      </Container>
    )
  }
  
  export default AddScheme
  