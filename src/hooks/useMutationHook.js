import { useMutation } from '@tanstack/react-query';

export const useMutationHook = (Callback) => {
    const mutation = useMutation({
        mutationFn: Callback
    })
    return mutation;
}