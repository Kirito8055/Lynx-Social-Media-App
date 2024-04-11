import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:  1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        {/* <img src="lynxlogo.png" alt="Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }}  /> */}
        <Typography fontWeight="Bold" fontSize="32px" color="primary">
          LYNX
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <div style={{ textAlign: "center" }}>
          <Typography
            fontWeight="500"
            fontSize="25px"
            variant="h5"
            sx={{ mb: "2rem" }}
          >
            Welcome to Lynx : Your Social Oasis! 🌟 #JoinTheRoar
          </Typography>
        </div>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
