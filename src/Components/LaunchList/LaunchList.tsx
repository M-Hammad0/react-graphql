import React from "react";
import { useQuery, gql } from "@apollo/client";
import Loading from "../Loading/Loading";
import { Waypoint } from "react-waypoint";

interface LaunchListI {
  id: string,
  launch_date_local: string;
  launch_success: boolean;
  mission_name: string;
}

interface LaunchListData {
  launches: LaunchListI[];
}

interface LaunchListVars {
  offset: number;
  limit: number;
}

export const GET_LAUNCH_INFO = gql`
  query Launches($limit: Int!, $offset: Int!) {
    launches(limit: $limit, offset: $offset) {
      id
      launch_date_local
      launch_success
      mission_name
    }
  }
`;

function LaunchList() {
  const { loading,data, fetchMore, networkStatus} = useQuery<LaunchListData, LaunchListVars>(
    GET_LAUNCH_INFO,
    {
      variables: {
        offset: 0,
        limit: 10,
      },
      notifyOnNetworkStatusChange: true,
    },
  );
  if (!data?.launches && loading) return <Loading />
  return (
    <div>
      <h3>Launches</h3>
      <div>
        {data?.launches.map((launched, i) => (
            <div key={i}>
              <p
                className="box"
                style={{ color: launched.launch_success ? "green" : "red" }}
              >
                {launched.mission_name}
              </p>
              {i === data.launches.length - 5 && (
                <Waypoint onEnter={() =>
                  fetchMore({
                    variables: {
                      offset: data?.launches.length,
                    },
                    updateQuery: (prev: any, {fetchMoreResult} ) => {
                      if(!fetchMoreResult) return prev;
                      return {
                        ...prev,
                        launches: [...prev.launches,...fetchMoreResult.launches]
                      }
                    },
                  })

                } />
              )}
            </div>
          ))}
      </div>
      {networkStatus === 3 && <h1>loading...</h1>}
    </div>
  );
}

export default LaunchList;
