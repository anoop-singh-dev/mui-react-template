import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Card, CardContent, Link, LinearProgress } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type FormData = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  password: string;
};

const Register = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [passwordStrength, setPasswordStrength] = useState(0);

  const onSubmit = (data: FormData) => {
    console.log("User Registered:", data);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const strength = password.length * 10;
    setPasswordStrength(strength > 100 ? 100 : strength);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#F5F6FA">
      <Card sx={{ width: 420, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
            Sign up
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" gap={2}>
              <TextField label="First Name" fullWidth {...register('firstName')} />
              <TextField label="Last Name" fullWidth {...register('lastName')} />
            </Box>

            <TextField label="Company" fullWidth margin="normal" {...register('company')} />
            <TextField label="Email Address" fullWidth margin="normal" {...register('email')} />
            
            <TextField 
              label="Password" 
              type="password" 
              fullWidth 
              margin="normal" 
              {...register('password')} 
              onChange={handlePasswordChange}
            />

            {/* Password Strength Indicator */}
            <Box mt={1} mb={1}>
              <LinearProgress variant="determinate" value={passwordStrength} sx={{ height: 5, borderRadius: 2 }} />
              <Typography variant="caption" color={passwordStrength < 50 ? "error" : "success"} display="block">
                {passwordStrength < 30 ? "Weak" : passwordStrength < 70 ? "Medium" : "Strong"}
              </Typography>
            </Box>

            <Typography variant="body2" color="textSecondary" textAlign="center" mt={1}>
              By signing up, you agree to our <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>.
            </Typography>

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Create Account
            </Button>

            <Typography textAlign="center" mt={2}>
              Already have an account? <Link component={RouterLink} to="/login">Login</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
