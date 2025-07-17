import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { API_URL } from '@/config/api/routes';
import { getAuthStoreState } from '@/stores/auth';

const httpLink = new HttpLink({
    uri: `${API_URL}/graphql`,
});

const authLink = new ApolloLink((operation, forward) => {
    const token = getAuthStoreState().access_token;
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        },
    });
    return forward(operation);
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default apolloClient;