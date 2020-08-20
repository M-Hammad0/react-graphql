import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router";
import { CircularProgress } from "@material-ui/core";

interface DetailsI {
  id: string;
  mission_name: string;
  launch_date_local: string;
  launch_success: boolean;
  details: string,
  links: {
    flickr_images: Array<String>;
    article_link: Object;
  };
}

interface DetialsData {
  launches: DetailsI[];
}

interface DetailsVars {
  slug: string;
}

export const GET_LAUNCH_DETAILS = gql`
  query getLaunchDetails($slug: String!) {
    launches(find: { mission_name: $slug }) {
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
  const { mission } = useParams();
  const { loading, data, error } = useQuery<DetialsData, DetailsVars>(
    GET_LAUNCH_DETAILS,
    {
      variables: {
        slug: mission,
      },
    }
  );

  if (error) return <p>{error}</p>;
  if (!data && loading) return <CircularProgress />;

  return (
    <div>
      <h1 data-testid="launch-detail">
        {data?.launches.map((i) => (
          <div key={i.id}>
          <h3>{i.mission_name}</h3>
          <p>{i.details}</p>
          {/* <img style={{width: "50%"}} src={i.links.flickr_images[0].toString()} alt="" /> */}
          {i.links.flickr_images ? i.links.flickr_images.map((img,idx) => (
            <img key={idx} style={{width: "20%"}} src={img.toString()} alt="" />
          )): null}
          </div>
        ))}
      </h1>
    </div>
  );
}
export default Details;
