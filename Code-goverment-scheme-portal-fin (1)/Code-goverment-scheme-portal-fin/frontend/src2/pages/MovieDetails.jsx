import { Box, Button, Container, Grid, Typography, Rating, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import YoutubeIcon from '@mui/icons-material/YouTube';

// import dotenv from 'dotenv'
// dotenv.config()

const MovieDetails = () => {
    const params = useParams()
    const { id } = params

    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMovieDetails = async () => {
        const options = {
            method: 'GET',
            url: `/api/movies/get-details/${id}`,
          headers: {
            'X-RapidAPI-Key': 'a3a0c8a765mshf0872a243b610b9p16bd8ejsnea87832581ee', // Add your API key
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
          }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              if(response.data?.success) {
                  setMovie(response.data?.data)
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

    getMovieDetails()
  }, [id])

  return (
    <Container sx={{ mt: 2 }} maxWidth="lg">
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
                                src={movie?.image}
                            />
                        </Box>
                    </Grid>
                    <Grid xs={12} md={6} pt={3}>
                        <Box 
                            px={4} 
                            height={300}
                            display="flex" 
                            flexDirection="column" 
                            justifyContent="space-between"
                        >
                            <Typography variant='h4' color="white">
                                {movie?.title}
                            </Typography>
                            <Typography variant='body1' color="white">
                            {movie?.description}
                            </Typography>
                            <Button 
                                variant='contained' 
                                startIcon={<YoutubeIcon style={{ fontSize: 36 }} />}
                                onClick={() => window.open(movie?.trailer)}
                            >
                                Watch Trailer
                            </Button>
                        </Box>
                    </Grid>
                    <Grid xs={12} md={3} pt={3}>
                        <Box px={4}>
                            <Rating 
                                name="half-rating" 
                                value={movie?.rating}
                                size="medium"
                                precision={0.1}
                                max={10}
                                readonly  
                            />

                            {/* Genre */}
                            <Box my={3}>
                                <Typography variant="h5" fontWeight="bold" color="white">GENRE</Typography>
                                {movie?.genre?.map((item, index) => (
                                    <Typography 
                                        key={index}
                                        variant="body1" 
                                        color="white"
                                    >
                                        {item}
                                    </Typography>
                                ))}
                            </Box>

                            {/* Directors */}
                            <Box my={3}>
                                <Typography variant="h5" fontWeight="bold" color="white">DIRECTORS</Typography>
                                {movie?.directors?.map((item, index) => (
                                    <Typography 
                                        key={index}
                                        variant="body1" 
                                        color="white"
                                    >
                                        {item}
                                    </Typography>
                                ))}
                            </Box>
                            

                            {/* Writers */}
                            <Box my={3}>
                                <Typography variant="h5" fontWeight="bold" color="white">WRITERS</Typography>
                                {movie?.writers?.map((item, index) => (
                                    <Typography 
                                        key={index}
                                        variant="body1" 
                                        color="white"
                                    >
                                        {item}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
        }
    </Container>
  )
}

export default MovieDetails