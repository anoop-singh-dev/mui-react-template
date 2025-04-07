import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Card, CardContent, FormControlLabel, Checkbox, Link } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// ✅ Define the form data type
type FormData = {
  email: string;
  password: string;
  rememberMe?: boolean; // optional to match Yup
};

// ✅ Define Yup validation schema
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  rememberMe: Yup.boolean(),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    login(data.email);
    navigate('/dashboard');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#F5F6FA">
      <Card sx={{ width: 380, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField 
              label="Email Address"
              fullWidth 
              margin="normal"
              {...register('email')} 
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField 
              label="Password" 
              type="password" 
              fullWidth 
              margin="normal" 
              {...register('password')} 
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <FormControlLabel 
                control={<Checkbox {...register('rememberMe')} />} 
                label="Keep me signed in" 
              />
              <Link href="#" underline="none">
                Forgot Password?
              </Link>
            </Box>

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>

            <Typography textAlign="center" mt={2}>
              Don't have an account? <Link component={RouterLink} to="/register">Sign Up</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
