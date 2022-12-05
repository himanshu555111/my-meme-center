import * as React from 'react';
import { useEffect } from 'react';
import companyLogo from '../assets/mymemcenterlogo.png';
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";

import {
    Avatar,
    Box,
    Collapse,
    // CssBaseline,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import { 
    FaAddressBook,
    FaSearchLocation,
    FaCrown,
    FaBox,
} from "react-icons/fa";

import { 
    MdExpandLess,
    MdExpandMore,    
} from "react-icons/md";
import { HiHome, HiOutlineDocumentAdd, HiOutlineTemplate } from "react-icons/hi";

import { MdOutlineVideoLibrary, MdAddBox, MdAddLocationAlt } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { HiChevronLeft, HiChevronRight, HiTemplate } from "react-icons/hi";
import { BiImages, BiImageAdd, BiVideoPlus} from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { TbMoodKid, TbMoodCrazyHappy } from "react-icons/tb";



import { NavLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import useToggle from "../use-toggle";


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const drawerWidth = 200;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",

    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

function Navbar() {

    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const [adminOpen, setAdminOpen] = React.useState(false);

    const [showTemplateOptions, setShowTemplateOptions] = React.useState(false);
    const [locationOpen, setLocationOpen] = React.useState(false);
    const [showReportingOptions, toggleReportingOptions] = useToggle(false);
    const [showLoadOptions, setShowLoadOptions] = React.useState(false);
    const [showCarrierOptions, setShowCarrierOptions] = React.useState(false);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const theme = useTheme();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function handleAdminClick() {
        setAdminOpen(!adminOpen);
    }

    function handleLocationClick() {
        setLocationOpen((state) => !state);
    }

    const toggleLoadOptions = () => {
        setShowLoadOptions((state) => !state);
    };

    const handleCarrierClick = () => {
        setShowCarrierOptions((state) => !state);
    };

    useEffect(() => {
        window.addEventListener("resize", function (event) {
            const newWidth = window.innerWidth;
            if (newWidth < 768) {
                setDrawerOpen(false);
            }
        });
    })

    const handleDrawerClose = () => {
        setDrawerOpen(state => !state);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#263471" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <img src={companyLogo} width={110} height={80} alt="My Meme Center" />
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <MenuItem key={'Go Home'} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Go Home</Typography>
                                </MenuItem>
                                <MenuItem key={'Our Features'} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Our Features</Typography>
                                </MenuItem>
                                <MenuItem key={'Who we are'} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Who we are</Typography>
                                </MenuItem>
                                <MenuItem key={'Premium Membership'} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Premium Membership</Typography>
                                </MenuItem>

                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: 10 }}>
                            <Button
                                key={'gohome'}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2, color: 'white', display: 'block', marginLeft: 5,
                                    textTransform: 'unset',
                                    ':hover': {
                                        bgcolor: '#344698',
                                        color: 'white',
                                    },
                                }}
                            >
                                <span className='flex flex-row'><HiHome className='text-xl mr-2' />{'Go Home'}</span>

                            </Button>
                            <Button
                                key={'ourfeatures'}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2, color: 'white', display: 'block', marginLeft: 5,
                                    textTransform: 'unset',
                                    ':hover': {
                                        bgcolor: '#344698',
                                        color: 'white',
                                    },
                                }}
                            >
                                {'Our Features'}
                            </Button>
                            <Button
                                key={'whoweare'}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2, color: 'white', display: 'block', marginLeft: 5,
                                    textTransform: 'unset',
                                    ':hover': {
                                        bgcolor: '#344698',
                                        color: 'white',
                                    },
                                }}
                            >
                                {'Who we are'}
                            </Button>
                            <Button
                                key={'premium'}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2, color: 'white', display: 'block', marginLeft: 5,
                                    textTransform: 'unset',
                                    ':hover': {
                                        bgcolor: 'gold',
                                        color: 'black',                                      
                                        
                                    },
                                }}
                            >
                                <span className='flex flex-row'><FaCrown className='text-xl mr-2 text-my-golden' /> {'Premium Membership'}</span>
                            </Button>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer variant="permanent" anchor="left" open={drawerOpen}>
                <DrawerHeader
                    sx={{
                        marginTop: "5rem",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                    }}
                >

                    {
                        !drawerOpen ?
                            <IconButton onClick={handleDrawerClose}>
                                <HiChevronRight />
                            </IconButton> :
                            <IconButton onClick={handleDrawerClose}>
                                <HiChevronLeft />
                            </IconButton>
                    }

                </DrawerHeader>

                <List
                    sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                >
                    <NavLink exact to="#">
                        <ListItem
                            component={NavLink}
                            // to="/dashboard"
                            button
                            key={"createyourown"}
                            title="Create your own"
                            style={
                                drawerOpen ? { paddingTop: "11px", paddingBottom: "11px" } : {}
                            }
                        >
                            <ListItemIcon style={{ minWidth: "25px" }}>
                                <HiOutlineDocumentAdd className="text-my-blue text-xl" />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Create your own"}
                                sx={
                                    drawerOpen
                                        ? {
                                            "& .MuiTypography-root": {
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                            },
                                        }
                                        : null
                                }
                                style={drawerOpen ? {} : { visibility: " hidden" }}
                            />
                        </ListItem>
                    </NavLink>

                    <>
                        <NavLink exact to="#">
                            <ListItem
                                component={NavLink}
                                to="#"
                                button
                                key={"templates"}
                                onClick={handleCarrierClick}
                                title="Templates"
                                style={
                                    drawerOpen
                                        ? { paddingTop: "11px", paddingBottom: "11px" }
                                        : {}
                                }
                            >
                                <ListItemIcon style={{ minWidth: "25px" }}>
                                    <HiOutlineTemplate className="text-my-blue text-xl" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={"Templates"}
                                    sx={
                                        drawerOpen
                                            ? {
                                                "& .MuiTypography-root": {
                                                    fontSize: "12px",
                                                    fontWeight: "bold",
                                                },
                                            }
                                            : null
                                    }
                                    style={drawerOpen ? {} : { visibility: " hidden" }}
                                />
                                {showCarrierOptions ? <MdExpandLess /> : <MdExpandMore />}
                            </ListItem>
                        </NavLink>

                        <Collapse in={showCarrierOptions} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <NavLink to="#">
                                    <ListItem
                                        component={NavLink}
                                        to="#"
                                        button
                                        key={"imagesoftemplates"}
                                        title="Image Templates"
                                        style={
                                            drawerOpen
                                                ? { paddingTop: "11px", paddingBottom: "11px" }
                                                : {}
                                        }
                                    >
                                        <ListItemIcon
                                            style={
                                                drawerOpen
                                                    ? { minWidth: "25px", marginLeft: "1em" }
                                                    : {}
                                            }
                                        >
                                            <BiImageAdd className="text-my-blue text-xl" />
                                        </ListItemIcon>
                                        <ListItemText
                                            sx={
                                                drawerOpen
                                                    ? {
                                                        "& .MuiTypography-root": {
                                                            fontSize: "12px",
                                                            fontWeight: "bold",
                                                        },
                                                    }
                                                    : null
                                            }
                                            primary={"Image Templates"}
                                            style={drawerOpen ? {} : { visibility: " hidden" }}
                                        />
                                    </ListItem>
                                </NavLink>

                                <NavLink to="#">
                                    <ListItem
                                        component={NavLink}
                                        to="#"
                                        button
                                        key={"videotemplates"}
                                        title="Video Templates"
                                        style={
                                            drawerOpen
                                                ? { paddingTop: "11px", paddingBottom: "11px" }
                                                : {}
                                        }
                                    >
                                        <ListItemIcon
                                            style={
                                                drawerOpen
                                                    ? { minWidth: "25px", marginLeft: "1em" }
                                                    : {}
                                            }
                                        >
                                            <BiVideoPlus className="text-my-blue text-xl" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={"Video Templates"}
                                            sx={
                                                drawerOpen
                                                    ? {
                                                        "& .MuiTypography-root": {
                                                            fontSize: "12px",
                                                            fontWeight: "bold",
                                                        },
                                                    }
                                                    : null
                                            }
                                            style={drawerOpen ? {} : { visibility: " hidden" }}
                                        />
                                    </ListItem>
                                </NavLink>
                            </List>
                        </Collapse>
                    </>

                    <NavLink exact to="#">
                        <ListItem
                            component={NavLink}
                            to="#"
                            button
                            key={"images"}
                            onClick={toggleLoadOptions}
                            title="Images"
                            style={
                                drawerOpen ? { paddingTop: "11px", paddingBottom: "11px" } : {}
                            }
                        >
                            <ListItemIcon style={{ minWidth: "25px" }}>
                                <BiImages className="text-my-blue text-xl" />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Images"}
                                sx={
                                    drawerOpen
                                        ? {
                                            "& .MuiTypography-root": {
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                            },
                                        }
                                        : null
                                }
                                style={drawerOpen ? {} : { visibility: " hidden" }}
                            />
                            {showLoadOptions ? <MdExpandLess /> : <MdExpandMore />}
                        </ListItem>
                    </NavLink>

                    <Collapse in={showLoadOptions} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <NavLink exact to="#">
                                <ListItem
                                    component={NavLink}
                                    to="#"
                                    button
                                    key={"vegetarian"}
                                    title="Vegetarian"
                                    style={
                                        drawerOpen
                                            ? { paddingTop: "11px", paddingBottom: "11px" }
                                            : {}
                                    }
                                >
                                    <ListItemIcon
                                        style={
                                            drawerOpen ? { minWidth: "25px", marginLeft: "1em" } : {}
                                        }
                                    >
                                        <TbMoodKid className="text-my-blue text-xl" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={"Vegetarian"}
                                        sx={
                                            drawerOpen
                                                ? {
                                                    "& .MuiTypography-root": {
                                                        fontSize: "12px",
                                                        fontWeight: "bold",
                                                    },
                                                }
                                                : null
                                        }
                                        style={drawerOpen ? {} : { visibility: " hidden" }}
                                    />
                                </ListItem>
                            </NavLink>

                            <NavLink exact to="#">
                                <ListItem
                                    component={NavLink}
                                    to="#"
                                    button
                                    key={"nonvegetarian"}
                                    title="Non Vegetarian"
                                    style={
                                        drawerOpen
                                            ? { paddingTop: "11px", paddingBottom: "11px" }
                                            : {}
                                    }
                                >
                                    <ListItemIcon
                                        style={
                                            drawerOpen
                                                ? { minWidth: "25px", marginLeft: "1em" }
                                                : {}
                                        }
                                    >
                                        <TbMoodCrazyHappy className="text-my-blue text-xl" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={"Non Vegetarian"}
                                        sx={
                                            drawerOpen
                                                ? {
                                                    "& .MuiTypography-root": {
                                                        fontSize: "12px",
                                                        fontWeight: "bold",
                                                    },
                                                }
                                                : null
                                        }
                                        style={drawerOpen ? {} : { visibility: " hidden" }}
                                    />
                                </ListItem>
                            </NavLink>

                        </List>
                    </Collapse>
                    {(
                        <NavLink exact to="#">
                            <ListItem
                                component={NavLink}
                                to="#"
                                button
                                key={"videos"}
                                onClick={toggleReportingOptions}
                                title="Videos"
                                style={
                                    drawerOpen
                                        ? { paddingTop: "11px", paddingBottom: "11px" }
                                        : {}
                                }
                            >
                                <ListItemIcon style={{ minWidth: "25px" }}>
                                    <MdOutlineVideoLibrary className="text-my-blue text-xl" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={"Videos"}
                                    sx={
                                        drawerOpen
                                            ? {
                                                "& .MuiTypography-root": {
                                                    fontSize: "12px",
                                                    fontWeight: "bold",
                                                },
                                            }
                                            : null
                                    }
                                    style={drawerOpen ? {} : { visibility: " hidden" }}
                                />
                                {showReportingOptions ? <MdExpandLess /> : <MdExpandMore />}
                            </ListItem>
                        </NavLink>
                    )}
                    <Collapse in={showReportingOptions} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <NavLink to={"#"}>
                                <ListItem
                                    button
                                    key={"Load Reports"}
                                    title="Load Reports"
                                    style={
                                        drawerOpen
                                            ? { paddingTop: "11px", paddingBottom: "11px" }
                                            : {}
                                    }
                                >
                                    <ListItemIcon
                                        style={
                                            drawerOpen ? { minWidth: "25px", marginLeft: "1em" } : {}
                                        }
                                    >
                                        <FaBox className=" text-md" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={"Load Reports"}
                                        sx={
                                            drawerOpen
                                                ? {
                                                    "& .MuiTypography-root": {
                                                        fontSize: "12px",
                                                        fontWeight: "bold",
                                                    },
                                                }
                                                : null
                                        }
                                        style={drawerOpen ? {} : { visibility: " hidden" }}
                                    />
                                </ListItem>
                            </NavLink>
                        </List>
                    </Collapse>

                    <NavLink exact to="#">
                        <ListItem
                            component={NavLink}
                            to="#"
                            button
                            key={"mydashboard"}
                            title="My Dashboard"
                            onClick={handleLocationClick}
                            style={
                                drawerOpen
                                    ? { paddingTop: "11px", paddingBottom: "11px" }
                                    : {}
                            }
                        >
                            <ListItemIcon style={{ minWidth: "25px" }}>
                                <RxDashboard className="text-my-blue text-xl" />
                            </ListItemIcon>
                            <ListItemText
                                primary={"My Dashboard"}
                                sx={
                                    drawerOpen
                                        ? {
                                            "& .MuiTypography-root": {
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                            },
                                        }
                                        : null
                                }
                                style={drawerOpen ? {} : { visibility: " hidden" }}
                            />
                            {locationOpen ? <MdExpandLess /> : <MdExpandMore />}
                        </ListItem>
                    </NavLink>

                    <Collapse in={locationOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <NavLink to="#">
                                <ListItem
                                    component={NavLink}
                                    to="#"
                                    button
                                    key={"ViewLocation"}
                                    title="ViewLocation"
                                    style={
                                        drawerOpen
                                            ? { paddingTop: "11px", paddingBottom: "11px" }
                                            : {}
                                    }
                                >
                                    <ListItemIcon
                                        style={
                                            drawerOpen
                                                ? { minWidth: "25px", marginLeft: "1em" }
                                                : {}
                                        }
                                    >
                                        <BsFillEyeFill />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={"View Location"}
                                        sx={
                                            drawerOpen
                                                ? {
                                                    "& .MuiTypography-root": {
                                                        fontSize: "12px",
                                                        fontWeight: "bold",
                                                    },
                                                }
                                                : null
                                        }
                                        style={drawerOpen ? {} : { visibility: " hidden" }}
                                    />
                                </ListItem>
                            </NavLink>


                            <NavLink to="#">
                                <ListItem
                                    component={NavLink}
                                    to="#"
                                    button
                                    key={"AddLocation"}
                                    title="AddLocation"
                                    style={
                                        drawerOpen
                                            ? { paddingTop: "11px", paddingBottom: "11px" }
                                            : {}
                                    }
                                >
                                    <ListItemIcon
                                        style={
                                            drawerOpen
                                                ? { minWidth: "25px", marginLeft: "1em" }
                                                : {}
                                        }
                                    >
                                        <MdAddLocationAlt />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={"Add Location"}
                                        sx={
                                            drawerOpen
                                                ? {
                                                    "& .MuiTypography-root": {
                                                        fontSize: "12px",
                                                        fontWeight: "bold",
                                                    },
                                                }
                                                : null
                                        }
                                        style={drawerOpen ? {} : { visibility: " hidden" }}
                                    />
                                </ListItem>
                            </NavLink>

                        </List>
                    </Collapse>


                </List>
            </Drawer>
        </Box>

    )
}

export default Navbar