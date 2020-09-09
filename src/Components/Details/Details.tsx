import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router";
import { CircularProgress } from "@material-ui/core";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";

interface DetailsI {
  id: string;
  mission_name: string;
  launch_date_local: string;
  launch_success: boolean;
  details: string;
  launch_site: {
    site_name_long: string;
  };
  rocket: {
    rocket_name: string;
    rocket_type: string;
  };
  links: {
    article_link: string;
    flickr_images: Array<String>;
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
      launch_date_local
      details
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
        rocket_type
      }
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
      {console.log(data)}
      <Container style={{margin: "3% auto"}}>
        <Row style={{margin: "5% auto"}}>
          <Col>
            {data?.launches.length !== 0 ? data?.launches.map((i) => (
              <div key={i.mission_name}>
                <h3 data-testid="missionName">{i.mission_name}</h3>
                <p style={{margin: "5% 0"}}>{i.details}<a href={i.links.article_link ? i.links.article_link.toString(): ""}> read more</a></p>
                <Table  bordered hover variant="dark">
                  <tbody>
                    <tr>
                      <td>Launch</td>
                      <td style={{backgroundColor: i.launch_success ? "green" : "red"}}></td>
                    </tr>
                    <tr>
                      <td>Launch Date</td>
                      <td>{i.launch_date_local}</td>
                    </tr>
                    <tr>
                      <td>Launch Site</td>
                      <td>{i.launch_site.site_name_long}</td>
                    </tr>
                    <tr>
                      <td>Rocket Name</td>
                      <td>{i.rocket.rocket_name}</td>
                    </tr>
                    <tr>
                      <td>Rocket Type</td>
                      <td>{i.rocket.rocket_type}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )) : <h3>No data availabe</h3>}
          </Col>
          <Col style={{margin: "5% auto"}}  lg={6}>
            {data?.launches.map((img, i) => (
              <div key={i}>
                {img.links.flickr_images[0] ? (
                  <Image src={img.links.flickr_images[0].toString()} fluid />
                ) : <p>No images available</p>}
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Details;
