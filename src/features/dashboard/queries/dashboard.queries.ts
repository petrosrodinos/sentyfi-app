import { gql } from "@apollo/client";

export const GET_USER_DASHBOARD = gql`
  query {
    user {
      alerts(order_by:"desc",limit:5) {
          id
          notification_channels
          created_at
          alert {
            title
            sentiment
          	severity
            tickers
        }
      }
      tracked_items(enabled:true ) {
        item_identifier
        item_type
        meta
    
      }
      media_subscriptions(enabled:true ) {
        uuid
        account_identifier
        screen_name
      }
      notification_channels(enabled:true ) {
        channel
      }
      counts{
        user_alerts_count
      }
    }
  }
`;