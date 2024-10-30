import {FC} from 'react';
import {useForm} from "@mantine/form";
import {Button, Paper, Stack, TextInput,Text, Container, Center} from "@mantine/core";
import {loginErrorNotification} from "./notifications.ts";
import {login} from "./api/login.ts";
import {useNavigate} from "react-router-dom";
import {Notifications} from "@mantine/notifications";

type LoginFormType = { // do formularza
    email: string,
    password: string,
}

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const form = useForm<LoginFormType>({
        initialValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmit = async (data: LoginFormType) => {
        try {
            await login(data.email, data.password);
            navigate('/offers');
        } catch (error) {
            console.error("Error during login:", error);
            loginErrorNotification();
        }
    };

    const handleRegister = ()=>{
        try{
            navigate('/register');
        } catch (error) {
            console.error("Error during login:", error);
            loginErrorNotification();
        }
    }


    return (
        <div
            style={{
                backgroundColor: 'rgb(236,236,236)'}}
        >
            <Container
                size="xs"
            >
                <Center style={{ minHeight: '100vh'}}>
                    <Paper shadow="xl" radius="md" p="xl" withBorder>
                        <Text
                            size="xl"
                            fw={900}
                            variant="gradient"
                            gradient={{ from: 'blue', to: 'green', deg: 90 }}
                            mb="lg"
                            style={{ textAlign: 'center' }}
                        >
                            YourSaleAnnouncement
                        </Text>
                        <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
                            <Stack style={{minWidth: "20vW"}}>
                                <TextInput
                                    required
                                    label="Email"
                                    placeholder="Enter your email"
                                    {...form.getInputProps('email')}
                                />
                                <TextInput
                                    required
                                    type='password'
                                    label="Password"
                                    placeholder="Enter your password"
                                    {...form.getInputProps('password')}
                                />
                                <Button
                                    variant="gradient"
                                    gradient={{ from: 'blue', to: 'green', deg: 90 }}
                                    type="submit"
                                    fullWidth
                                >
                                    Zaloguj się
                                </Button>
                                <Stack align="center">
                                    <Text>Nie masz konta?</Text>
                                    <Text>Kliknij przycisk poniżej!</Text>
                                </Stack>
                                <Button
                                    variant="gradient"
                                    gradient={{ from: 'red', to: 'green', deg: 270 }}
                                    onClick={() => handleRegister()}
                                    fullWidth
                                >
                                    Zarejestruj się
                                </Button>
                            </Stack>
                        </form>
                        <Notifications style={{ position: 'fixed', bottom: 0, right: 0 }} />
                    </Paper>
                </Center>
            </Container>
        </div>
    );
}