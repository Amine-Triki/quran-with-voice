import './Home.css'
import { Helmet } from 'react-helmet-async';

import {  QuranLive , QuranLecture } from '../../components/index'

function Home() {
  return (
    <main>
      <Helmet>
        <title>Home page</title>
        <link rel="icon"  type="image/png" href="../../assets/logo.webp"></link>
      </Helmet>

      <QuranLecture/>
      <QuranLive/>
      
    </main>
    
  )
}

export default Home