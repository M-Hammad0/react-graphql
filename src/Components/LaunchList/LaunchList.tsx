import React from "react";
import { useQuery, gql } from "@apollo/client";
import Loading from "../Loading/Loading";
import { Waypoint } from "react-waypoint";
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from 'react-bootstrap/Card'
import '../../App.css'

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
  query launches($limit: Int!, $offset: Int!) {
    launches(limit: $limit, offset: $offset) {
      id
      launch_date_local
      launch_success
      mission_name
    }
  }
`;



function LaunchList() {
  const { loading,data, fetchMore, networkStatus, error} = useQuery<LaunchListData, LaunchListVars>(
    GET_LAUNCH_INFO,
    {
      variables: {
        offset: 0,
        limit: 20,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  if(error) return <p style={{color: "#fff"}}>error loading data</p>
  if (!data?.launches && loading) return <Loading />
  return (
    <div>
      <h1 style={{margin: "7% 0"}}>SpaceX Launches</h1>
      <div>
        {data?.launches.map((launched,i) => (
            <div key={i}>
              
              
              <Card style={{margin: "5% 0",borderRight: "50 solid red"}} bg="dark" body>
                <Link style={{color: "#fff"}} to={`${launched.mission_name}`}>
                <h3>LAUNCH: {launched.mission_name}<div style={{width: "25px",height: "25px",borderRadius:"28px",float: "right",backgroundColor: launched.launch_success ? "green" : "red"}}></div></h3>
                <p>Date: {launched.launch_date_local}</p>
                
                </Link>
                </Card>
          
              
              {i === data.launches.length - 3 && (
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
      <div>
        <div style={{margin: "10px auto", width:"20%"}}>
      {networkStatus === 3 && <CircularProgress />}
      </div>
      </div>
    </div>
  );
}

export default LaunchList;
