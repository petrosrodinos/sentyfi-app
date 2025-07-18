import { gql } from "@apollo/client";

export const GET_USER = gql`
  query {
  user {
    counts{
      tracked_items_count
      media_subscriptions_count
      notification_channels_count
    }
    user_alerts{
      uuid
      alert{
        title
      }
    }
    notification_channels(enabled: true) {
      uuid
      client_identifier
      enabled
    }
    tracked_items {
      uuid
      item_identifier
    }
    media_subscriptions{
      uuid
    }
  }
}
`;
