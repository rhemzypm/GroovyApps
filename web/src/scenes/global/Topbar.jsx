import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Switch } from "@mui/material";
import { styled } from "@mui/system";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const StyledSwitch = styled(Switch)`
    /* Customize the switch track */
    .MuiSwitch-track {
      background-color: ${({ theme }) =>
        theme.palette.mode === "dark" ? "#bdbdbd" : "#757575"};
    }

    /* Customize the switch thumb */
    .MuiSwitch-thumb {
      background-color: ${({ theme }) =>
        theme.palette.mode === "dark" ? "#424242" : "#fff"};
    }
  `;

  const StyledLightIcon = styled(LightModeOutlinedIcon)`
    /* Customize the light mode icon */
    color: ${({ theme }) =>
      theme.palette.mode === "dark" ? "#bdbdbd" : "#ff9800"};
    background-color: ${({ theme }) =>
      theme.palette.mode === "dark" ? "#fff" : "#bdbdbd"};
    border-radius: 50%;
    padding: 2px;
  `;

  const StyledDarkIcon = styled(DarkModeOutlinedIcon)`
    /* Customize the dark mode icon */
    color: ${({ theme }) =>
      theme.palette.mode === "dark" ? "#424242" : "#424242"};
    background-color: ${({ theme }) =>
      theme.palette.mode === "dark" ? "#fff" : "#757575"};
    border-radius: 50%;
    padding: 2px;
  `;

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
