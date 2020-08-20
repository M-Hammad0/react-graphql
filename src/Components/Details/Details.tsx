import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router";
import { CircularProgress } from "@material-ui/core";


interface DetailsI {
  id: string;
  mission_name: string;
  launch_date_local: string;
  launch_success: boolean;
  links: {
    flickr_images: Array<String>;
    article_link: Object;
  };
}

interface DetialsData {
  launches: DetailsI[];
}

interface DetailsVars {
  slug: string
}

export const GET_LAUNCH_DETAILS = gql`
query getLaunchDetails($slug: String!){
        launches(find: {mission_name: $slug}){
          id
          mission_name
          launch_success
          details
          links {
            article_link
            flickr_images
          }
        }
  }
`;

function Details() {
  const {mission} = useParams()
  const { loading,data,error } = useQuery<DetialsData, DetailsVars>(GET_LAUNCH_DETAILS,{
    variables: {
      slug: mission
    }
  });

  if(error) return <p>{error}</p>
  if(!data && loading) return <CircularProgress />

  return (
    <div>
      <h1>show plz</h1>
      <h1 data-testid="launch-detail" >{data?.launches.map(i => (<p key={i.id}>{i.mission_name}</p>))}</h1>
    </div>
  );
}
export default Details;
