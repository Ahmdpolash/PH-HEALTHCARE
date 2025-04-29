import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import assets from "@/assets";
import { drawerItems } from "@/utils/generateDrawerItems";
import { UserRole } from "@/types";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <Box>
      <Stack
        sx={{
          py: 1,
          mt: 1,
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
        component={Link}
        href="/"
      >
        <Image src={assets.svgs.logo} width={40} height={40} alt="logo" />
        <Typography
          variant="h6"
          component="h1"
          sx={{
            cursor: "pointer",
          }}
        >
          PH Health Care
        </Typography>
      </Stack>
      <List>
        {drawerItems("admin" as UserRole).map((item, index) => (
          <SidebarItem  item={item} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
