import { gql } from "@apollo/client";

export const GET_USERS = gql`
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