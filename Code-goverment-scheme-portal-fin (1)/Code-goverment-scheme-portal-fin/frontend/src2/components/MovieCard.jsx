import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()
  return (
    <Card 
      sx={{ my: 4, mx: 4, py: 0, backgroundColor: "#242526", height: 446, cursor: "pointer" }}
      onClick={() => navigate(`/movies/${movie?._id}`)}
    >
      <CardMedia
        component="img"
        sx={{ height: 320 }}
        image={movie?.image}
        title={movie?.title}
        loading="lazy"
      />
      <CardContent >
        <Typography variant="body2" color="white" gutterBottom >
          Title: {movie?.title}
        </Typography>
        <Typography variant="body2" color="white" gutterBottom>
            Year: {movie?.year}
        </Typography>
        <Rating 
          name="half-rating" 
          // defaultValue={Number(movie?.rating)/2} 
          defaultValue={parseFloat(movie?.rating)}
          size="small"
          precision={0.1}
          max={10}
          readonly  
        />
      </CardContent>
    </Card>
  );
}

export default MovieCard



