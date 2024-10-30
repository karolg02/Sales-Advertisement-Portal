import {Button, Center, Container, NumberInput, Paper, Stack, Text, TextInput} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";
import {Register} from "./api/register.ts";

type RegisterTypes = {
    name: string,
    surename: string,
    email: string,
    password: string,
    number: number,
}

export const RegisterPage = () => {
    const navigate = useNavigate();
    const form = useForm<RegisterTypes>({
        initialValues: {
            name: '',
            surename: '',
            email: '',
            password: '',
            number: 0,
        },
    });

    const handleLoginButton = () =>{
        navigate('/login');
    }

    const handleSubmit =  async (data: RegisterTypes) =>{
        try{
            await Register(data.name,data.surename,data.email,data.password,data.number);
        } catch (error) {
            console.error("Nie udało się zarejestrować", error);
        }
    }

    return (
        <div
            style={{
                backgroundColor: 'rgb(236,236,236)'
            }}
        >
            <Container
                size="xs"
            >
                <Center style={{minHeight: '100vh'}}>
                    <Paper shadow="xl" radius="md" p="xl" withBorder>
                        <Text
                            size="xl"
                            fw={900}
                            variant="gradient"
                            gradient={{from: 'red', to: 'green', deg: 30}}
                            mb="lg"
                            style={{textAlign: 'center'}}
                        >
                            Witaj w panelu rejestracji YourTodo!
                        </Text>
                        <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
                            <Stack style={{minWidth: "20vW"}}>
                                <TextInput
                                    required
                                    label="Imię"
                                    placeholder="Imię"
                                    {...form.getInputProps('name')}
                                />
                                <TextInput
                                    required
                                    label="Nazwisko"
                                    placeholder="Nazwisko"
                                    {...form.getInputProps('surename')}
                                />
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
                                <NumberInput
                                    required
                                    type='tel'
                                    label="number"
                                    placeholder="+48"
                                    {...form.getInputProps('number')}
                                />
                                <Button
                                    variant="gradient"
                                    gradient={{from: 'red', to: 'green', deg: 90}}
                                    type="submit"
                                    fullWidth
                                >
                                    Zarejestruj się
                                </Button>
                                <Stack align="center">
                                    <Text>Masz konto?</Text>
                                    <Text>Kliknij przycisk poniżej, aby się zalogować!</Text>
                                </Stack>
                                <Button
                                    variant="gradient"
                                    gradient={{from: 'blue', to: 'green', deg: 270}}
                                    onClick={() => handleLoginButton()}
                                    fullWidth
                                >
                                    Zaloguj się
                                </Button>
                            </Stack>
                        </form>
                        <Notifications style={{position: 'fixed', bottom: 0, right: 0}}/>
                    </Paper>
                </Center>
            </Container>
        </div>
    )
}