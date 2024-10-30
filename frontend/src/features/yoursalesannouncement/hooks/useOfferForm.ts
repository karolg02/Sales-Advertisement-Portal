import {useForm} from "@mantine/form";

export const useOfferForm = () => {
    return useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            description: '',
            image: '',
            category: '',
            price: 0,
            amount: 0,
            city: '',
        },

        validate: {},
    });
}