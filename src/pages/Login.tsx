import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Card, CardContent, FormControlLabel, Checkbox, Link } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Link as RouterLink,useNavigate  } from 'react-router-dom';

type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();
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

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField 
              label="Email Address" 
              fullWidth 
              margin="normal" 
              {...register('email')} 
            />

            <TextField 
              label="Password" 
              type="password" 
              fullWidth 
              margin="normal" 
              {...register('password')} 
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
