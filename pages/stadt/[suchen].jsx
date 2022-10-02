import { useState } from 'react'
import axios from "axios"
import { motion } from 'framer-motion'
import Link from "next/link"
import {IoChevronBack} from "react-icons/io5"
import Head from "next/head"
import { useRouter } from "next/router"
import styles from "../../styles/Suchen.module.scss"
import {SiNextdotjs} from "react-icons/si"

export default function stadt({wetter}) {
    console.log(wetter)
            if (wetter.message == null  || wetter.message == "") {
            return(
                <div className={styles.container}>
                    <Link href="/"><IoChevronBack className={styles.backIcon} /></Link>
                    <Head>
                        <title>{wetter.name}, {wetter.sys.country}</title>
                    </Head>

                    <h2 className={styles.Header}>Das Wetter für {wetter.name}, {wetter.sys.country}</h2>
                    <motion.div className={styles.TemperaturContainer} 
                    initial={{opacity: 0, x: "-100px"}}
                    animate={{opacity: 1, x: "0px"}}
                    transition={{duration: 0.5}}>
                        <h2>Aktuell:</h2>
                        <p className={styles.temp}>Temperatur: {wetter.main.temp_min}°</p>
                        <p>Min-Temp: {wetter.main.temp_min}°</p>
                        <p>Max-Temp: {wetter.main.temp_max}°</p>
                        <p>Angefühlt: {wetter.main.feels_like}°</p>
                        <p>Luftfeuchtigkeit: {wetter.main.humidity}% </p>
                        <p>bewölkt: {wetter.clouds.all}%</p>
                        <p>{wetter.weather[0].description}</p>
                        <p>Windgeschwindigkeit: {wetter.wind.speed} m/s</p>
                    </motion.div>
                    <motion.p
                    initial={{position: "absolute", bottom: "5px", color: "black", backgroundColor: "white", padding: "5px", borderRadius: "3px"}}>Breitengrad: {wetter.coord.lat}, Längengrad: {wetter.coord.lon}</motion.p>
                </div>
            )
            } else {
                return(
                    <div className={styles.containerError}>
                        <Link href="/"><IoChevronBack className={styles.backIcon} /></Link>
                        <h2>Ein Fehler ist aufgetreten!</h2>
                        <p>{wetter.cod}, {wetter.message}</p>
                    </div>
                )
            }
}
export async function getServerSideProps(context) {
    const stadt = context.params.suchen
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${stadt}&appid=${process.env.WetterKey}&units=metric&lang=DE`)
    const json = await data.json()
    return {
        props: {wetter: json}
    }
}
