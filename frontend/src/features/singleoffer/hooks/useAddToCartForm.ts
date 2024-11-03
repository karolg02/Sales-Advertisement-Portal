import {useForm} from "@mantine/form";

export const useAddToCartForm = () => {
    return useForm({
        mode: 'uncontrolled',
        initialValues: {
            amount: 1
        },

        validate: {},
    });
}