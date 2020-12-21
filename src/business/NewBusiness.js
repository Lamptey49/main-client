import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import auth from './../auth/auth-helper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import {create} from './api-business.js'
import {Link, Redirect} from 'react-router-dom'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2)
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle,
      fontSize: '1em'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    },
    input: {
      display: 'none'
    },
    filename:{
      marginLeft:'10px'
    }
  }))

export default function NewBusiness(){
    const classes = useStyles()
    const [values, setValues] = useState({
        currentStep:1,
        business_name:'',
        region_of_business:'',
        city_of_business:'',
        business_mobile:'',
        business_mobile_contact:'',
        country_of_business:'',
        business_email:'',
        is_business_registered:false,
        business_certificate:'',
        identity_card_front:'',
        identity_card_back:'',
        redirect: false,
        error: '',
        open:false
    })
    const jwt = auth.isAuthenticated();

    const handleChange = name => event => {
        const value = name === 'business_certificate' || name === 'identity_card_front' || name === 'identity_card_back'
          ? event.target.files[0]
          : event.target.value
        setValues({...values, [name]: value })

    }
    const handleCheck = (event, checked) => {
        setValues({...values, 'is_business_registered': checked})
      }
    const clickSubmit = () => {
        const businessData  = new FormData()
        values.business_name && businessData.append('business_name', values.business_name)
        values.region_of_business && businessData.append('region_of_business', values.region_of_business)
        values.city_of_business && businessData.append('city_of_business', values.city_of_business)
        values.business_mobile && businessData.append('business_mobile', values.business_mobile)
        values.business_mobile_contact && businessData.append('business_mobile_contact', values.business_mobile_contact)
        values.country_of_business && businessData.append('country_of_business', values.country_of_business)
        values.business_email && businessData.append('business_email', values.business_email)
        values.is_business_registered && businessData.append('is_business_registered', values.is_business_registered)
        values.business_certificate && businessData.append('business_certificate', values.business_certificate)
        values.identity_card_front && businessData.append('identity_card_front', values.identity_card_front)
        values.identity_card_back && businessData.append('identity_card_back', values.identity_card_back)
        create({
           userId: jwt.user._id
        }, {
            t: jwt.token
        }, businessData).then((data) => {
            if(data){
                setValues({ ...values, error: data.error})
            }
            else{
                setValues({...values, error:'', redirect: true})
            }
        })
    }
    const next = () => {
        let currentStep = values.currentStep
        currentStep = currentStep >= 2 ? 3: currentStep + 1
        setValues({
            currentStep: currentStep
        })
    }
    const prev = () => {
        let currentStep = values.currentStep
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        setValues({
            currentStep: currentStep
        })
    }
    const prevButton = () =>{
        let currentStep = values.currentStep
        if(currentStep !== 1){
            return (
                <Button color='secondary' className='float-left' type='button' onClick={prev}>Previous</Button>
            )
        }
        return null;
    }
    const nextButton = () =>{
        let currentStep = values.currentStep
        if(currentStep < 2){
            return (
                <Button color='primary' className='float-right' type='button' onClick={next}>Next</Button>
            )
        }
        return null;
    }
    // const UserInfo = ()=>{
    //     if (values.currentStep !== 1) {
    //         return null
    //       } 
    //       return(
    //           <div>
    //               <Typography component='h3'>Personal User Information</Typography>
                
    //             <TextField type="text" id="firstname" name="firstname" label='Firstname' className={classes.textField}
    //                         value={values.firstname}
    //                         onChange={handleChange('firstname')} required />
               
               
    //             <TextField type="text" id="lastname" name="lastname" label='Lastname' className={classes.textField}
    //                         value={values.lastname}
    //                         onChange={handleChange('lastname')} required />
               
              
    //             <TextField type="email" id="email" name="email" label='Email' className={classes.textField}
    //                         value={values.email}
    //                         onChange={handleChange('email')} required />
               
                
    //             <TextField type="password" id="password" name="password" label='Password' className={classes.textField}
    //                         value={values.password}
    //                         onChange={handleChange('password')} required />
                
    //             <TextField type="text" id="country" name="country" label='Country' className={classes.textField}
    //                         value={values.country}
    //                         onChange={handleChange('country')} required />
                
    //             <TextField type="text" id="region" name="region" label='Region' className={classes.textField}
    //                         value={values.region}
    //                         onChange={handleChange('region')} required />
              
    //                 <TextField type="text" id="suburb" name="suburb" label='Suburb' className={classes.textField}
    //                         value={values.suburb}
    //                         onChange={handleChange('suburb')} required />
               
    //                 <TextField type="text" id="zip" name="zip" label='Zip' className={classes.textField}
    //                         value={values.zip}
    //                         onChange={handleChange('zip')}  />
               
    //                 <TextField type="text" id="phone_one" name="phone_one" label='Contact' className={classes.textField}
    //                         value={values.phone_one}
    //                         onChange={handleChange('phone_one')} required />
                
    //                 <TextField type="text" id="phone_two" name="phone_two" label='Other Phone' className={classes.textField}
    //                         value={values.phone_two}
    //                         onChange={handleChange('phone_two')}  />
               
    //           </div>
    //       );
    // }
    const BusinessInfo = () =>{
        if (values.currentStep !== 1) {
            return null
          } 
          return(
              <div>
                  <Typography>Business Information</Typography>
                
                <TextField type="text" id="business_name" name="business_name" label='Business Name' className={classes.textField}
                            value={values.business_name}
                            onChange={handleChange('business_name')}
                             required />
                
               
                <TextField type="text" id="region_of_business" name="region_of_business" label='Region' className={classes.textField}
                            value={values.region_of_business}
                            onChange={handleChange('region_of_business')} required />
               
               
                    <TextField type="text" id="city_of_business" name="city_of_business" label='City' className={classes.textField}
                            value={values.city_of_business}
                            onChange={handleChange('city_of_business')} required />
                
                
                    <TextField type="text" id="business_mobile" name="business_mobile" label='Business Contact' className={classes.textField}
                            value={values.business_mobile}
                            onChange={handleChange('business_mobile')} required />
                
                
                    <TextField type="text" id="business_mobile_contact" name="business_mobile_contact" label='Business Alt Contact' className={classes.textField}
                            value={values.business_mobile_contact}
                            onChange={handleChange('business_mobile_contact')}  />
                
                
                    <TextField type="text" id="country_of_business" name="country_of_business" label='Country' className={classes.textField}
                            value={values.country_of_business}
                            onChange={handleChange('country_of_business')} required />
               
                
                    <TextField type="email" id="business_email" name="business_email" label='Business Email' className={classes.textField}
                            value={values.business_email}
                            onChange={handleChange('business_email')} required />
                
                </div>
          )}
    const BusinessDocument = () =>{
        if (values.currentStep !== 2) {
            return null
          } 
        return (
            <div>
                <Typography>
                    Business Document Upload
                </Typography>
                <Typography variant="subtitle1" className={classes.subheading}>
                Is Business Registered?
            </Typography>
            <FormControlLabel
                control={
                <Switch classes={{
                                    checked: classes.checked,
                                    bar: classes.bar,
                                }}
                        checked={values.is_business_registered}
                        onChange={handleCheck}
                />}
                label={values.is_business_registered ? 'Registered' : 'Not Registered'}
            />
                { values.is_business_registered === true && (
                    <div>
                        <input accept="image/*" onChange={handleChange('business_certificate')} className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <Button variant="contained" color="secondary" component="span">
                            Upload Business Certificate
                            <FileUpload/>
                            </Button>
                        </label> <span className={classes.filename}>{values.business_certificate ? values.business_certificate.name : ''}</span><br/>
                    </div>
                )
                }
                {
                    !values.is_business_registered && (
                        <div>
                            <input accept="image/*" onChange={handleChange('identity_card_front')} className={classes.input} id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file">
                                <Button variant="contained" color="secondary" component="span">
                                Upload an Identity Card Front
                                <FileUpload/>
                                </Button>
                            </label> <span className={classes.filename}>{values.identity_card_front ? values.identity_card_front.name : ''}</span><br/>
                            
                            <input accept="image/*" onChange={handleChange('identity_card_front')} className={classes.input} id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file">
                                <Button variant="contained" color="secondary" component="span">
                                Upload an Identity Card Back
                                <FileUpload/>
                                </Button>
                            </label> <span className={classes.filename}>{values.identity_card_back ? values.identity_card_back.name : ''}</span><br/>

                        </div>
                    )
                }
                 <br/> 
                 {
                    values.error && (<Typography component="p" color="error">
                    <Icon color="error" className={classes.error}>error</Icon>
                    {values.error}
                    </Typography>)
                }
                <div className='btngroup'>
                    <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
                    <Link to='/' className={classes.submit}><Button variant="contained">Cancel</Button></Link>
                </div>
            </div>
        )
        
    }
    if(values.redirect){
        return <Redirect to={'/auth/business/signin'} /> 
    }
    return (
        <div>
        <Card className={classes.card}>
            <CardContent>
                <Typography type='headline' component='h2' className={classes.title}>New Shop Registration</Typography>
                <p>Step {values.currentStep}</p>
                <br />
                {/* <UserInfo /> */}
                <BusinessInfo />
                <BusinessDocument />
                {prevButton()}
                {nextButton()}
            </CardContent>

        </Card>
        <Dialog open={values.open} disableBackdropClick={true}>
            <DialogTitle>New Account</DialogTitle>
            <DialogContent>
            <DialogContentText>
                New account successfully created.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Link to="/auth/signin">
                <Button color="primary" autoFocus="autoFocus" variant="contained">
                Sign In
                </Button>
            </Link>
            </DialogActions>
        </Dialog>
        </div>
    )
}