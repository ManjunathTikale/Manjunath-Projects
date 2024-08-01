import React, { useContext, useEffect, useState } from 'react';
import { Box, CircularProgress, Container,  Grid, IconButton, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person'; // Added PersonIcon

import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { styled } from '@mui/system';

const CustomButton = styled(Button)({
  backgroundColor: '#FEE699', // Change color on hover
  color: '#000', // Text color
  borderRadius: '30px', // Border radius
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Shadow
  '&:hover': {
    backgroundColor: '#F47378', // Change color on hover
  },
});


const AnimatedTypography = styled(Typography)({
  py: 2,
  align: 'center',
  fontWeight: 'bold',
  fontSize: '2.5rem',
  color: '#FFF',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1) rotateX(10deg)',
  },
});



const Home1 = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      navigate("/home1");
    } else {
      getDetailsList();
    }
  }, [user]);

  const getDetailsList = async () => {
    try {
      const response = await axios.get("/api/details/get-user-details", {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      setDetails(response.data?.data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const deleteDetail = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/details/delete-details/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`
        }
      });
      getDetailsList();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container sx={{ mt: 2 }} maxWidth="lg">
              
      <AnimatedTypography>
        Goverment Scheme Details
      </AnimatedTypography>

      <Grid          
          >
            
            <Grid xs={12} sm={8} md={6} lg={4}>
      {loading
        ?
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
        :
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {details.map((detail, index) => (
            <Box
              key={detail._id}
              sx={{
                maxWidth: 300,
                border: '1px solid #ccc',
                borderRadius: 8,
                padding: 2,
                margin: 2,
                backgroundColor: '#fff', // Set background color
                transition: 'background-color 0.3s', // Add hover effect
                '&:hover': {
                  backgroundColor: '#FFCCA9', // Change background color on hover
                },
              }}
            >
              <Box display="flex" alignItems="center">
                <PersonIcon /> {/* Added PersonIcon */}
                <Typography variant="h6" sx={{ ml: 1 }}>{detail.directors}</Typography> {/* Added name */}
              </Box>
              <img src={detail.image} alt={detail.name} style={{ maxWidth: '100%', marginTop: '8px' }} />  {/* Added photo */}
              <Typography variant="body2" mt={1}>{detail.description}</Typography> {/* Added description */}
              <Box display="flex" justifyContent="flex-end" mt={2} gap={2}> 

                <IconButton
                  sx={{ background: "#E74753", padding: 0.5, borderRadius: 3 }}
                  onClick={() => navigate(`/details/${detail._id}`)}
                >

                  <VisibilityIcon sx={{ color: "#FFF" }} />
                </IconButton>
                <IconButton
                  sx={{ background: "#E74753", padding: 0.5, borderRadius: 3 }}
                  onClick={() => navigate(`/edit-detail/${detail._id}`)}
                >
                  <EditIcon sx={{ color: "#FFF" }} />
                </IconButton>
                <IconButton
                  sx={{ background: "#E74753", padding: 0.5, borderRadius: 3 }}
                  onClick={() => deleteDetail(detail._id)}
                >
                  <DeleteIcon sx={{ color: "#FFF" }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      }
        </Grid>
        </Grid>

    </Container>
  );
}

export default Home1;
