import { getLocationAPI } from "../api/location";

import styles from "./location.module.scss";

import LocationPageTemplate from "./template";

const LocationAllPage = async () => {
  const { data } = await getLocationAPI();

  return (
    <>
      <LocationPageTemplate data={data} name="ALL" />
    </>
  );
};

export default LocationAllPage;
