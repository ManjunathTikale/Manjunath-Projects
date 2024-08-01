import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import axios from 'axios'
import MovieCard from '../components/MovieCard';

const Home = () => {

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)

    useEffect(() => {

      const getMoviesList = async () => {
        const options = {
          method: 'GET',
          
          url: 'https://imdb-top-100-movies.p.rapidapi.com/',
          headers: {
            'X-RapidAPI-Key': 'a3a0c8a765mshf0872a243b610b9p16bd8ejsnea87832581ee', // Add your API key
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
          }
        };
        
        try {
          const response = await axios.request(options);
          console.log(response.data);
          setMovies(response.data?.data)
          
        } catch (error) {
          console.error(error);
          alert("Something went wrong.")
        } finally {
          setLoading(false)
        }
    }

      getMoviesList()
    }, [])

    console.log(movies)

    // useEffect(() => {
    //   console.log("Count useEffect call")
    // }, [count])


  return (
    <Container maxWidth="lg">
      { loading
        ?  
          // <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
          //  Alternate way
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        :
          <Grid 
            container 
            // gap={2}
          >
            
            {/* <Grid xs={12} sm={8} md={6} lg={4}>
              <Box bgcolor="gray" height={100}>xs=8</Box>
            </Grid>
            <Grid xs={12} sm={4} md={6} lg={4}>
              <Box bgcolor="red" height={100}>xs=4</Box>
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <Box bgcolor="yellow" height={100}>xs=4</Box>
            </Grid> */}

            {movies?.map((movie, index) => (
              <Grid xs={12} sm={6} md={3}>
                <MovieCard 
                  key={index}
                  movie={movie}
                />
              </Grid>
            ))}
          </Grid>
      }
    </Container>
  )
}

export default Home