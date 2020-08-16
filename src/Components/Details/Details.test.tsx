import React from 'react'
import { render, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Details, { GET_LAUNCH_DETAILS } from './Details';

const mocks = [
      {
        request: {
          query: GET_LAUNCH_DETAILS,
          variables: {
                slug: "CRS-7"
          },
        },
        result: {
            data: {
              launches: [
                {
                  id: "24",
                  details: "Launch performance was nominal until an overpressure incident in the second-stage LOX tank, leading to vehicle breakup at T+150 seconds. The Dragon capsule survived the explosion but was lost upon splashdown because its software did not contain provisions for parachute deployment on launch vehicle failure.",
                  launch_success: false,
                  mission_nam: "CRS-7",
                  link: {
                    article_link: "https://spaceflightnow.com/2015/06/28/falcon-9-rocket-destroyed-in-launch-mishap/",
                    flickr_images: [
                      "https://farm1.staticflickr.com/344/19045370790_f20f29cd8d_o.jpg",
                      "https://farm1.staticflickr.com/287/18999110808_6e153fed64_o.jpg"
                    ]
                  }
                }
              ]
            }
          }
      },
    ];

afterEach(cleanup);

it('should render component',() => {
      const {asFragment} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
      <Details />
      </MockedProvider>)
      expect(asFragment).toMatchSnapshot();
})

it('should render launch details',async () => {
      const {findByTestId,findByText} = render(
            <MockedProvider mocks={mocks} addTypename={false}>
            <Details />
            </MockedProvider>)
            const missionName = await findByText("CRS-7")
            expect(missionName).toBeInTheDocument();
})