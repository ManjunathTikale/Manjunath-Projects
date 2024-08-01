import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React, { useState } from 'react'

const PasswordField = ({ title="Password", password, setPassword }) => {

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl variant="outlined" fullWidth>
    <InputLabel htmlFor="outlined-adornment-password">{title}</InputLabel>
    <OutlinedInput
      id="outlined-adornment-password"
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
      label="Password"
      inputProps={{
        minLength: 6
      }}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </FormControl>
  )
}

export default PasswordField