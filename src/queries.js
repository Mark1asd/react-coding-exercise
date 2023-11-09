import { gql } from '@apollo/client';

export const LAUNCHES_QUERY = gql`
  query Launches($find: LaunchFind, $order: String, $sort: String) {
    launches(find: $find, order: $order, sort: $sort) {
      id
      mission_name
      rocket {
        rocket_type
        rocket_name
      }
      launch_date_utc
    }
  }
`;

