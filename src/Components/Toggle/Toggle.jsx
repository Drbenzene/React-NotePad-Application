import React from 'react'
import styles from './Toggle.module.css'
import {ImCancelCircle} from 'react-icons/im'

function Toggle() {
  return (
    <div className={styles.container} >
        <div className={styles.content}>
        <ImCancelCircle />
        Hello
        </div>

        </div>
  )
}

export default Toggle