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
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from 'react-router-dom';
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
import { HiHome, HiOutlineDocumentAdd, HiOutlineTemplate, HiUpload } from "react-icons/hi";
import { MdOutlineVideoLibrary, MdAddBox, MdOutlineCloudDownload } from "react-icons/md";
import { HiChevronLeft, HiChevronRight, HiDownload } from "react-icons/hi";
import { BiImages, BiImageAdd, BiVideoPlus } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { TbMoodKid, TbMoodCrazyHappy, TbTemplate } from "react-icons/tb";
import { Navigate, NavLink } from "react-router-dom";
import useToggle from "../use-toggle";
import { set_toggle_drawer } from '../redux/features/drawer-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UploadMediaModal from '../models/upload-media-modal';



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
    const [hideDrawer, setHideDrawer] = React.useState(false);

    const [locationOpen, setLocationOpen] = React.useState(false);
    const [showReportingOptions, toggleReportingOptions] = useToggle(false);
    const [showLoadOptions, setShowLoadOptions] = React.useState(false);
    const [showCarrierOptions, setShowCarrierOptions] = React.useState(false);
    const [showCreateOwnOptions, setShowCreateOwnOptions] = React.useState(false);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const [selectedUploadOption, setSelectedUploadOption] = React.useState('');




    const location = useLocation();

    const userInfo = useSelector((state) => state.user.user_info);

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            setHideDrawer(true);
            // handleDrawerClose();
        } else {
            setHideDrawer(false);
        }
    }, [location.pathname])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedUploadOption(value);
    };

    const theme = useTheme();

    const dispatch = useDispatch();

    const navigate = useNavigate();

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
        dispatch(set_toggle_drawer(drawerOpen))
    };

    const onClickSettingOption = (optionName) => {
        if (optionName === "Profile") {
            handleProfileClick();
        } else if (optionName === "Logout") {
            handleLogoutClick();
        }
    }

    const handleUploadMedia = () => {
        handleClickOpen();
    }

    const handleProfileClick = () => {
        navigate('/profile')
    }

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        localStorage.setItem("isLoggedIn", 'false');
        navigate('/login')
    }

    const handleCreateYourOwnClick = () => {
        setShowCreateOwnOptions(state => !state)
    }

    return (
        <>
            <UploadMediaModal
                selectedUploadOption={selectedUploadOption}
                open={open}
                onClose={handleClose}
            />
            <Box sx={{ display: "flex" }}>
                {
                    hideDrawer ? null :
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

                                    <Box sx={{ marginRight: 40, flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', marginLeft: 8, minWidth: 'fit-content' }}>
                                        <Button
                                            key={'gohome'}
                                            onClick={handleCloseNavMenu}
                                            sx={{
                                                my: 2, color: 'white', display: 'block',
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
                                                my: 2, color: 'white', display: 'block',
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
                                                my: 2, color: 'white', display: 'block',
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
                                                my: 2, color: 'white', display: 'block',
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

                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Tooltip title="Upload Media">
                                                <Button
                                                    key={'upload'}
                                                    onClick={handleUploadMedia}
                                                    sx={{
                                                        my: 2, color: 'black', display: 'block', backgroundColor: '#fed800',
                                                        textTransform: 'unset',
                                                        ':hover': {
                                                            bgcolor: '#fed800d1',
                                                        },
                                                    }}
                                                >
                                                    <span className='flex flex-row'><HiUpload className='text-lg text-black mr-1 mt-[3px]' /> Upload Media</span>
                                                </Button>
                                            </Tooltip>
                                        </Box>
                                        <Box sx={{ flexGrow: 0, marginLeft: 4 }}>
                                            <Tooltip title="Open settings">
                                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                    <Avatar alt="Remy Sharp" src={userInfo?.url} />
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
                                                        <Typography onClick={() => onClickSettingOption(setting)} textAlign="center">{setting}</Typography>
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </Box>
                                    </Box>

                                </Toolbar>
                            </Container>
                        </AppBar>
                }
                {
                    hideDrawer ? null :
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
                                <>
                                    <NavLink exact to="#">
                                        <ListItem
                                            component={NavLink}
                                            to="#"
                                            key={"createyourown"}
                                            title="Create your own"
                                            onClick={handleCreateYourOwnClick}
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
                                            {showCreateOwnOptions ? <MdExpandLess /> : <MdExpandMore />}
                                        </ListItem>
                                    </NavLink>
                                    <Collapse in={showCreateOwnOptions} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <NavLink to="/create/newimage">
                                                <ListItem
                                                    component={NavLink}
                                                    to="/create/newimage"                                                    
                                                    key={"createOwnTemplate"}
                                                    title="Create Image Template"
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
                                                        primary={"Create Image Template"}
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

                                <>
                                    <NavLink exact to="#">
                                        <ListItem
                                            component={NavLink}
                                            to="#"
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
                                                    to="/create/newimage"
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
                                        <NavLink exact to="/images/vegetarian">
                                            <ListItem
                                                component={NavLink}
                                                to="/images/vegetarian"
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
                                        <NavLink to={"#"}>
                                            <ListItem
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
                                                        drawerOpen ? { minWidth: "25px", marginLeft: "1em" } : {}
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
                                                key={"mytemplates"}
                                                title="My Templates"
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
                                                    <TbTemplate className="text-my-blue text-xl" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={"My Templates"}
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


                                        <NavLink to="/mydashboard/mydownloads">
                                            <ListItem
                                                component={NavLink}
                                                to="/mydashboard/mydownloads"
                                                button
                                                key={"mydownloads"}
                                                title="My Downloads"
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
                                                    <MdOutlineCloudDownload className="text-my-blue text-xl" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={"My Downloads"}
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
                }

            </Box>
        </>


    )
}

export default Navbar