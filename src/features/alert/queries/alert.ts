import { gql } from "@apollo/client";

export const GET_USER_ALERTS = gql`
  query GetUserAlerts(
    $page: Int
    $limit: Int
    $order_by: String
    $sentiment: String
    $platform_type: PlatformType
    $account_identifier: String
    $severity: String
    $popularity: String
    $tickers: [String!]
  ) {
    user {
      user_alerts(
        page: $page
        limit: $limit
        order_by: $order_by
        sentiment: $sentiment
        platform_type: $platform_type
        account_identifier: $account_identifier
        severity: $severity
        popularity: $popularity
        tickers: $tickers
      ) {
        data {
          id
          notification_channels
          created_at
          alert {
            title
            description
            platform_type
            tickers
            sentiment
            severity
            popularity
            post_ids
            account_identifier
            account_name
            screen_name
            created_at
          }
        }
        pagination {
          total
          page
          limit
          hasMore
        }
      }
      tracked_items {
        uuid
        item_identifier
      }
      media_subscriptions {
        uuid
        account_identifier
        screen_name
      }
    }
  }
`;
