import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import auth from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'
import logo from './../assets/images/kik.png';
// import Search from './../product/Search'
import {  list, listCategories } from './../product/api-product'
import Products from './../product/Products'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  textColor:{
    color:'#f4f4f4',
    listStyle:'none'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const  isActive = (history, path) =>{
    if(history.location.pathname.includes(path))
    return { color: '#bef67a'}
    else{
        return { color: '#d7ff9a'}
    }
}
const isPartActive = (history, path) => {
    if (history.location.pathname.includes(path))
      return {color: '#bef67a'}
    else
      return {color: '#bef67a'}
    
}
/**
 * @todo implement User role on the appbar
 */


const Header = withRouter(({history}) =>{
  
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listCategories(signal).then((data) =>{
        setCategories(data)
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])
  

  const [values, setValues] = useState({
    category: '',
    search: '',
    results: [],
    searched: false
    })
    const handleChange = name => event => {
      setValues({
        ...values, [name]: event.target.value,
      })
    }
    const search = () => {
      if(values.search){
        list({
          search: values.search || undefined, category: values.category
        }).then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            setValues({...values, results: data, searched:true})
          }
        })
      }
    }
    const enterKey = (event) => {
      if(event.keyCode === 13){
        event.preventDefault()
        search()
      }
    }
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      > 
               {
                auth.isAuthenticated() && (<span>
                  {auth.isAuthenticated().user.seller && (
                  <Link to="/seller/shops"><Button style={isPartActive(history, "/seller/")}>My Shops</Button></Link>)}
                  <MenuItem >
                  <Link to={"/user/" + auth.isAuthenticated().user._id}>
                  <IconButton color="inherit" style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>
                    <Badge  color="secondary">
                    <AccountCircle />
                    </Badge>
                  </IconButton>
                  </Link>
                  <p>Profile</p>
                </MenuItem>
                  <MenuItem onClick={() => {
                      auth.clearJWT(() => history.push('/'))
                    }}>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    
                  >
                  <ExitToAppIcon />
                  </IconButton>
                  <p>Sign out</p>
                </MenuItem>
                     {/* <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <AccountCircle />
                      
                    </IconButton> */}
                </span>)
              }
        

        {
            !auth.isAuthenticated() && (<span>
              <Link to="/user/signup">
                <Button style={isActive(history, "/user/signup")}>Sign up
                </Button>
              </Link>
              <Link to="/auth/signin">
                <Button style={isActive(history, "/auth/signin")}>Sign In
                </Button>
              </Link>
              <Link to="/business/register/new">
                <Button style={isActive(history, "/business/register/new")}>Connect to Kiriikou
                </Button>
              </Link>
            </span>)
          }
          

      </Menu>
    );
  
    return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link to='/' className={classes.textColor}>
              <img src={logo} alt='Logo' height='50'  />
              Kiriikou.com
              </Link>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon onClick={search} />
                
              </div>
              <InputBase
                placeholder="Search…"
                onKeyDown={enterKey}
                onChange={handleChange('search')}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            {
            !auth.isAuthenticated() && (<span>
              <Link to="/user/signup">
                <Button style={isActive(history, "/user/signup")}>Sign up
                </Button>
              </Link>
              <Link to="/auth/signin">
                <Button style={isActive(history, "/auth/signin")}>Sign In
                </Button>
              </Link>
              
            </span>)
          }
          {
                auth.isAuthenticated() && (<span>
                  {auth.isAuthenticated().user.seller && (<Link to="/seller/shops"><Button style={isPartActive(history, "/seller/")}>My Shops</Button></Link>)}
                  
                  <Link to={"/user/" + auth.isAuthenticated().user._id}>
                    <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>{auth.isAuthenticated().user.name}</Button>
                  </Link>
                  
                     {/* <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <AccountCircle />
                      
                    </IconButton> */}
                    <Link to="/business/register/new">
                      <Button style={isActive(history, "/business/register/new")}>Connect to Kiriikou
                      </Button>
                    </Link>
                    <Button color="inherit" onClick={() => {
                      auth.clearJWT(() => history.push('/'))
                    }}>Sign out</Button>
                </span>)
              }
         
             
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    );

})

export default Header;








