import './QuranLive.css'

import Button from 'react-bootstrap/Button';  
import VideoPlayer from './VideoPlayer'
import  { useState } from 'react';

const QuranLive = () => {
  const [videoUrl, setVideoUrl] = useState('https://win.holol.com/live/quran/playlist.m3u8');

  const handleButtonClick = (newUrl) => {
    setVideoUrl(newUrl);
  };




  return (
    <div className='d-flex align-items-center flex-column wrap gap-2'>
      <h3 className='my-3' >البث المباشر</h3>
      <div>
        <Button onClick={() => handleButtonClick('https://win.holol.com/live/quran/playlist.m3u8')} variant="primary">
          قناة القرآن الكريم
        </Button>
        <Button style={{ marginLeft: 10 }} onClick={() => handleButtonClick('https://win.holol.com/live/sunnah/playlist.m3u8')} variant="primary">
          قناة السنة النبوية
        </Button>
      </div>
      <div className='d-flex justify-content-center container align-items-center my-5'>
        <VideoPlayer url={videoUrl} />
      </div>
    </div>
  )
}

export default QuranLive