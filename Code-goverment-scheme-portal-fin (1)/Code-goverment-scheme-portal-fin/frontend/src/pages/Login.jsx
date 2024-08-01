import { 
  Container, Box, Card, Typography, TextField, 
  Button 
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import PasswordField from '../components/PasswordField';
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
    color: '#000  '
  },
});

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user, login } = useContext(AuthContext)

  useEffect(() => {
    if(user) {
      navigate("/dashboard")
    }
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    console.log({email})
    console.log({password})

    // Send Backend API
    try {
      const res = await axios.post("/api/users/login", {
        email,
        password
      })
      if(res.data?.success) {
        login(res.data?.data)
        //setUser(res.data?.data)
        localStorage.setItem("user", JSON.stringify(res.data?.data))
        setEmail('')
        setPassword('')
        navigate('/dashboard')
      } else  {
        alert("Something went wrong!")
      }
    } catch (err) {
      // console.error(err.response.data)
      alert(err.response.data.message)
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
          height: 400,
          width: 450,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
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
              Login Form
          </Typography>
        </Box>
        <Box 
          component="form"
          onSubmit={onSubmitHandler}
          display="flex" 
          flexDirection="column" 
          gap={4} 
          mt={6} 
          px={4}
        >
          <CustomStyledTextField 
            label="Email"
            type="email"
            placeholder="johndoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth 
          />
          <PasswordField password={password} setPassword={setPassword} />
          <CustomButton type="submit" variant="contained" size="large" >
            Login
          </CustomButton>
        </Box>
      </Card>
    </Container>
  )
}

export default Login
