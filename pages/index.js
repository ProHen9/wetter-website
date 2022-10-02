import {motion} from "framer-motion"
import Head from "next/head"
import styles from "../styles/Home.module.scss"
import Link from "next/link"
import {useRouter} from "next/router"
import { useState } from "react"
import {IoArrowForwardOutline} from "react-icons/io5"
import {AiFillCloseCircle} from "react-icons/ai"
import {FcAndroidOs} from "react-icons/fc"


export default function Home() {
  const [searchValue, setsearchValue] = useState("")
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false)
  const [lastSearch, setLastsearch] = useState(null)

  const Popup = () => {
    if (showPopup == false) {
      return null
    } else {
      return(
        <motion.div initial={{backgroundColor: "white", color: "black", position: "absolute", padding: "10px", borderRadius: "4px", width: "40%", border: "1px solid black"}}>
          <AiFillCloseCircle className={styles.close} onClick={() => setShowPopup(false)} />
          <p>Gebe in der oberen Suchleiste den Namen, der Stadt dessen Wetter du suchst ein. Drücke anschließend auf dem Button mit dem Pfeil nach Rechts um nach der angegebenen Stadt zu suchen.</p>
        </motion.div>
      )
    }
  }

  
  function handleChange(event) {
    setsearchValue(event.target.value)
  }

  function handleClick() {
    if (searchValue == "" || searchValue == null) {
      // Der Error könnte hier angezeigt werden. In dem Fall passiert nichts bei einem Error
    } else {
      router.push({
        pathname: `/stadt/${searchValue}`,
      })
    }
  }
  return(
    <div className={styles.container}>
      <Head>
        <title>Wetter</title>
      </Head>
      <h2 className={styles.h2}>Wetter</h2>

      {/* Das Suchfeld */}
      <motion.div 
      className={styles.SearchContainer}>
        <motion.input whileHover={{backgroundColor: "rgb(207, 200, 200)"}} id="searchInput" onChange={handleChange} className={styles.Search} placeholder="Der Name der gesuchten Stadt" />
        <button onClick={handleClick}  className={styles.SearchButton}><IoArrowForwardOutline/></button>
      </motion.div>
      {/* Ein Popup für die Beispiele bei den Städten */}
      <Popup />
      <motion.p onClick={() => setShowPopup(true)} initial={{cursor: "pointer", color: "black", position: "absolute", bottom: "10px"}}>z.B: München, Berlin, Hamburg, Frankfurt, Mainz, ...</motion.p>
      <motion.p initial={{position: "absolute", bottom: "20px",left: "10px", transform: "scale(2.9)"}}><a target="_blank" href="https://play.google.com/"><FcAndroidOs /></a></motion.p>
    </div>
  )
}