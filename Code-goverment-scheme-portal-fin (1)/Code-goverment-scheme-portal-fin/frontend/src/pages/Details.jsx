import { Box, Button, Container, Grid, Typography, Rating, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import YoutubeIcon from '@mui/icons-material/YouTube';
import { styled } from '@mui/system';


// import dotenv from 'dotenv'
// dotenv.config()
const CustomButton = styled(Button)({
    backgroundColor: '#1F497D',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#02144D',
      color: '#fff  '
    },
  });
const Details = () => {
    const params = useParams()
    const { id } = params

    const [details, setDetails] = useState(null)
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getDetails = async () => {
        const options = {
            method: 'GET',
            url: `/api/details/get-details/${id}`,
          headers: {
            'X-RapidAPI-Key': 'a3a0c8a765mshf0872a243b610b9p16bd8ejsnea87832581ee', // Add your API key
            'X-RapidAPI-Host': 'imdb-top-100-details.p.rapidapi.com'
          }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              if(response.data?.success) {
                  setDetails(response.data?.data)
              } else  {
                alert(response.data?.message)
              }
          } catch (error) {
              console.error(error);
              alert(error?.response?.data?.message)
          } finally {
            setLoading(false)
          }
    }

    getDetails()
  }, [id])

  return (
    <Container sx={{ mt: 2 }} maxWidth="lg"  style={{ backgroundColor: 'RGB(255,252,204,0.9)',paddingBottom: '40px',paddingTop: '20px', borderRadius: '40px 0px 40px 0px' }}>
        {loading
            ?
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box>
            :
                <Grid container>
                    <Grid xs={12} md={3} pt={3}>
                        <Box px={4}>
                            <img 
                                style={{
                                    height: 360,
                                    width: "100%",
                                    borderRadius: 10
                                }}
                                src={details?.image}
                            />
                        </Box>
                    </Grid>
                    <Grid xs={12} md={6} pt={2} >
                        <Box 
                            px={4} 
                            height={300}
                            display="flex" 
                            flexDirection="column" 
                            justifyContent="space-between"
                            
                        >
                            <Typography variant='h4' color="black">
                                {details?.title}
                            </Typography>
                            <Typography variant='h5' color="black">
                                {details?.directors}
                            </Typography>
                            <Typography variant='body1' color="black">
                            {details?.description}
                            </Typography>
                            <CustomButton style={{}}
                                variant='contained' 
                                startIcon={<YoutubeIcon style={{ fontSize: 36 }} />}
                                onClick={() => window.open(details?.trailer)}
                            >
                                Watch YouTube Link
                            </CustomButton>
                        </Box>
                    </Grid>
                    <Grid xs={12} md={3} pt={3}>
                        <Box px={4}>
                            
                            {/* Genre */}
                            <Box my={3}>
                                <Typography variant="h5" fontWeight="bold" color="black">Content</Typography>
                                <Typography variant='body1' color="black">
                                {details?.genre}
                                </Typography>
                               
                            </Box>

                            {/* Directors */}
                            <Box my={3}>
                                <Typography variant="h5" fontWeight="bold" color="black">Content Link</Typography>
                                <Typography variant='body1' color="black">
                                {details?.writers}
                                </Typography>
                               
                            </Box>
                            

                            {/* Writers */}
                            <Box my={3}>
                                <Typography variant="h5" fontWeight="bold" color="black">year</Typography>
                                <Typography variant='body1' color="black">
                                {details?.extra}
                                </Typography>
                           
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
        }
    </Container>
  )
}

export default Details