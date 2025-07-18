import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { API_URL } from '@/config/api/routes';
import { getAuthStoreState } from '@/stores/auth';
import { isTokenExpired } from '@/lib/token';

const httpLink = new HttpLink({
    uri: `${API_URL}/graphql`,
});

const authLink = new ApolloLink((operation, forward) => {
    const authState = getAuthStoreState();

    if (authState?.expires_in && isTokenExpired(authState.expires_in)) {
        authState.logout();
        return forward(operation);
    }

    if (authState.access_token) {
        operation.setContext({
            headers: {
                authorization: `Bearer ${authState.access_token}`,
            },
        });
    }

    return forward(operation);
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default apolloClient;