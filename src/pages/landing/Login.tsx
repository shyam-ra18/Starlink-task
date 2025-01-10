import { Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { GenerateLoginToken } from '../../utils/generateLoginToken';

interface LoginCredProps {
	username: string,
	password: string
}

export const Login = () => {

	const usernameRegex = /^[a-zA-Z0-9]+$/;
	const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]{8,}$/;

	const navigate = useNavigate();
	const [IsLoading, setIsLoading] = useState(false);

	const form = useForm({
		initialValues: {
			username: '',
			password: '',
		},

		validate: {
			username: (value) => {
				if (!value) return 'Username cannot be empty'
				if (!usernameRegex.test(value)) return 'Username must be alphanumeric with no special characters';
				if (value !== 'developer25') return 'Invalid Username';
				return null
			},
			password: (value) => {
				if (!value) return 'Password cannot be empty';
				if (!passwordRegex.test(value)) return 'Password must be at least 8 characters, contain letters, numbers, and a special character, and no spaces';
				if (value !== 'Password@2025') return 'Invalid Username';
				return null;
			},
		},
	});

	const handleSubmit = (values: LoginCredProps) => {
		try {
			setIsLoading(true);
			localStorage.setItem('uname', values.username);
			GenerateLoginToken();
			toast.success('Loggedin Successfull')
			setTimeout(() => {
				navigate('/dashboard');
			}, 1500);

		} catch (error: any) {
			toast.error(error.messages || 'Something went wrong')
		}
		finally {
			setIsLoading(false);
		}

	};

	return (
		<Container size={420} my={150}>
			<Title ta="center">Welcome back!</Title>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput
						label="UserName"
						placeholder="you@mantine.dev"
						{...form.getInputProps('username')}
					/>

					<PasswordInput
						label="Password"
						placeholder="Your password"
						mt="md"
						{...form.getInputProps('password')}
					/>

					<Button fullWidth mt="xl" type="submit" disabled={IsLoading}>
						{IsLoading ? 'Loading...' : 'Sign in'}
					</Button>
				</form>
			</Paper>
		</Container>
	);
};
