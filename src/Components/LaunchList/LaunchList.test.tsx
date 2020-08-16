import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import LaunchList, { GET_LAUNCH_INFO } from "./LaunchList";

const mocks = [
  {
    request: {
      query: GET_LAUNCH_INFO,
      variables: {
        offset: 0,
        limit: 10,
      },
    },
    result: {
      data: {
        launches: [
          {
            id: "13",
            launch_date_local: "2014-01-06T14:06:00-04:00",
            launch_success: true,
            mission_name: "Thaicom 6",
          },
        ],
      },
    },
  },
];

afterEach(cleanup);

it("should render component without error", () => {
  const { asFragment } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LaunchList />
    </MockedProvider>
  );
  expect(asFragment).toMatchSnapshot();
});


it("should render launch list", async () => {
  const { findByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LaunchList />
    </MockedProvider>
  );
  const foo = await findByText("Thaicom 6");
  expect(foo).toBeInTheDocument();
});
