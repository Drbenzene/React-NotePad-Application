import React from 'react'
import styles from './Footer.module.css'
import '../../App.css';

function Footer() {

  let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.bottom = "0";
  } else {
    document.getElementById("navbar").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}

  return (
    <div id="navbar" className={styles.container}>
        © Copyright 2022, Boyinbode Ebenezer Ayomide
        <p>All Right Reserved</p>
    </div>
  )
}

export default Footer