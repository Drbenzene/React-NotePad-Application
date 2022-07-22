import React, { useContext } from 'react'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Favourites from '../Favourites/Favourites'

function FavouriteScreen() {

  return (
    <div>
        <Header />
        <Favourites />
        <Footer />
    </div>
  )
}

export default FavouriteScreen