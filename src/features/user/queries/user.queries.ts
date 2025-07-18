import { gql } from "@apollo/client";

export const GET_USER = gql`
  query {
    user{
      id
      uuid
      email
      identities {
        uuid
        provider
      }
      notification_channels {
        id
        user_uuid
        channel
        client_identifier
        verified
      }
    }
  }
`;

export const GET_USER_DASHBOARD = gql`
  query {
    user{
      notification_channels {
        id
        user_uuid
        channel
        client_identifier
        verified
      }
      tracked_items {
        
      }
    }
  }
`;