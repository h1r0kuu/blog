import { ReactElement, useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container, Divider,
    IconButton, InputBase,
    Menu,
    MenuItem,
    Paper,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material"
import AdbIcon from "@mui/icons-material/Adb"
import MenuIcon from "@mui/icons-material/Menu"
import { HOME, LOGIN, PROFILE, REGISTRATION, SETTINGS, POST_CREATE, USER_FEED } from "../../constants/pathConstants"
import { Link, useNavigate } from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';

const Header = (): ReactElement => {
  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState('');


  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960)
  }, [])

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = (page: string) => {
    setAnchorElNav(null)
      switch(page) {
      case "Create Post":
          navigate(POST_CREATE)
          break;
      case "Feed":
          navigate(USER_FEED)
          break;
      default:
          break;
    }
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement>) => {
        if ('key' in event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                navigate(`/posts/search?q=${query}`);
            }
        } else if(query !== ''){
            navigate(`/posts/search?q=${query}`);
        }
    }

  const pages = ["Create Post", "Feed"]

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={HOME}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {isAuthenticated() && pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={HOME}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {isAuthenticated() && pages.map((page) => (
              <Button key={page} onClick={() => handleCloseNavMenu(page)} sx={{ my: 2, color: "white", display: "block" }}>
                {page}
              </Button>
            ))}
          </Box>
        <Box sx={{ flexGrow: 0, mr: 3, display: { xs: "none", md: "flex" } }}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Paper>
        </Box>

          {isAuthenticated() ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.username} src={user.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem component={Link} to={`${PROFILE}/${user.username}`}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem component={Link} to={SETTINGS}>
                  <Typography textAlign="center">Settings</Typography>
                </MenuItem>
                <MenuItem onClick={() => logout()}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button href={LOGIN}>Login</Button>
              <Button href={REGISTRATION}>Register</Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
