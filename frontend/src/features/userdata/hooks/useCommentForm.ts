import {useForm} from "@mantine/form";

export const useCommentForm = () => {
    return useForm({
        mode: 'uncontrolled',
        initialValues: {
            text: '',
            rating: 0
        },
        validate:{}
    });
}