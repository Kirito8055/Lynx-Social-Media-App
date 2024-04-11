import { Typography, useTheme, Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const navigateToWebsite = () => {
    window.open("https://www.nykaa.com/?root=logo", "_blank");
  };

  const navigateToWebsiteanime = () => {
    window.open("https://www.crunchyroll.com/", "_blank");
  };
  // useEffect(()=>{window.location.href='https://kaido.to/home'},[])

  return (
    <>
      <WidgetWrapper style={{ cursor: "pointer" }} onClick={navigateToWebsite}>
        <FlexBetween>
          <Typography color={dark} variant="h5" fontWeight="500">
            Sponsored
          </Typography>
          <Typography color={medium}>Create Ad</Typography>
        </FlexBetween>
        <img
          width="100%"
          height="auto"
          alt="advert"
          src="http://localhost:4013/assets/info4.jpeg"
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        />
        <FlexBetween>
          <Typography color={main}>MikaCosmetics</Typography>
          <Typography color={medium}>mikacosmetics.com</Typography>
        </FlexBetween>
        <Typography color={medium} m="0.5rem 0">
          Your pathway to stunning and immaculate beauty and made sure your skin
          is exfoliating skin and shining like light.
        </Typography>
      </WidgetWrapper>

      <Box m="2rem 0" />

      <WidgetWrapper
        style={{ cursor: "pointer" }}
        onClick={navigateToWebsiteanime}
      >
        <FlexBetween>
          <Typography color={dark} variant="h5" fontWeight="500">
            Sponsored
          </Typography>
          <Typography color={medium}>Create Ad</Typography>
        </FlexBetween>
        <img
          width="100%"
          height="auto"
          alt="advertisement"
          src="http://localhost:4013/assets/drstone.jpg"
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        />
        <FlexBetween>
          <Typography color={main}>Crunchyroll</Typography>
          <Typography color={medium}>crunchyroll.com</Typography>
        </FlexBetween>
        <Typography color={medium} m="0.5rem 0">
          Discover a world reborn in Dr. Stone Season 3. Join Senku-chan's
          scientific journey now
        </Typography>
      </WidgetWrapper>
    </>
  );
};

export default AdvertWidget;
