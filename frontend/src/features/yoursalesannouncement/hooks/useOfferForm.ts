import {useForm} from "@mantine/form";

export const useOfferForm = () => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {

        },

        validate: {

        },
    });
    return form;
}