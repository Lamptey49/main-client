import React, { useState, useEffect } from 'react';
import Footer from './FooterComponent.js';
import { listCategories, listLatest } from './../product/api-product'
import Suggestions from './../product/Suggestions'
import Search from './../product/Search'
import Categories from './../product/Categories'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom';
import Products from './../product/Products';
import { SLIDE_INFO} from './SlideConstants'
import {list} from './../product/api-product.js'
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  }
}))



const  Home = ()=> {
const classes =  useStyles()

const [suggestionTitle, setSuggestionTitle] = useState('Latest Products')
const [categories, setCategories] = useState([])
const [suggestions, setSuggestions] = useState([])

const [animating, setAnimating] = useState(false)
const [activeIndex, setActiveIndex] = useState(0)
const [values, setValues] = useState({
        category: '',
        search: '',
        results: [],
        searched: false
})

const content = SLIDE_INFO;

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
const next = ()=>{
  if(animating) return;
  const nextIndex = activeIndex === content.length - 1 ? 0 : activeIndex + 1;
  setActiveIndex(nextIndex)
}

const previous = ()=>{
  if(animating) return;
  const nextIndex = activeIndex === 0 ? content.length - 1 : activeIndex - 1;
  setActiveIndex(nextIndex)
}

const gotoIndex = (newIndex)=> {
  if(animating) return;
  setActiveIndex(newIndex)
}
const slides = content.map((item, index)=> {
  return(

    <CarouselItem 
      onExiting={()=> setAnimating(true)}
      onExited={()=> setAnimating(false)}
      key={item.id} >
      <img src={item.imgUrl} alt={item.title } height='300px' width='900px' />
      <CarouselCaption captionText={item.title} captionHeader={item.button} />
    </CarouselItem>
  )
})

useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listLatest(signal).then((data)=>{
      if(data){
        // console.log(data)
      }
      else{
        setSuggestions(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
    
}, [])
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


    return(
    <>

<div className={classes.root}>
  {/* <Products product={values.results} searched={values.searched}/> */}
<Grid container spacing={2}>
  <Grid item xs={8}>
  <Carousel 
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={content} activeIndex={activeIndex} onClickHandler={gotoIndex}  />
      {slides}
      <CarouselControl direction='prev' directionText='Previous' onClickHandler={previous} />
      <CarouselControl direction='next' directionText='Next' onClickHandler={next} />
    </Carousel>
  </Grid>
  <Grid item xs={4} sm={4}>
    <Suggestions products={suggestions} title={suggestionTitle}/>
  </Grid>
</Grid>

<Grid container spacing={4}>
  <Grid item xs={12} sm={8}>
  <Categories categories={categories}/>
<Products products={values.results} searched={values.searched}/>
  </Grid>
</Grid>
</div>
<div id="sitewrapper" >
  <Footer/>
</div>
</> 

    )
}
  
export default Home;