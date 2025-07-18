import { useQuery } from '@tanstack/react-query';
import apolloClient from "@/config/graphql/apollo";

export function useApolloQuery(query: any, options: any = {}) {

    return useQuery({
        queryKey: [query.loc.source.body, options.variables],
        queryFn: async () => {
            const { data, errors } = await apolloClient.query({
                query,
                variables: options.variables,
            });
            if (errors) {
                throw new Error(errors.map((e: any) => e.message).join(', '));
            }
            return data;
        },
        ...options,
    });
}