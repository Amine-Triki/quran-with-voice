import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ReactAudioPlayer from "react-audio-player";
import { useState, useEffect, useRef } from 'react';
import BorderExample from "./BorderExample";
const apiUrl = 'https://mp3quran.net/api/v3';
const language = 'ar';


function GridSelector() {
 
  const [reciter, setReciter] = useState([]);
  const [moshaf, setMoshaf] = useState([]);
  const [suwar, setSuwar] = useState([]);
  const [selectedReciter, setSelectedReciter] = useState('');
  const [selectedMoshaf, setSelectedMoshaf] = useState('');
  const [selectedSurah, setSelectedSurah] = useState('');
  const audioPlayerRef = useRef();
  const [selectedMoshafIndex, setSelectedMoshafIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  const fetchReciter = async () => {
    try {
      setIsLoading(true); // قم بتعيين isLoading إلى true عند بدء التحميل
      const response = await fetch(`${apiUrl}/reciters?language=${language}`);
      const data = await response.json();
      setReciter(data.reciters);
    } catch (error) {
      console.error('Error fetching reciters:', error);
    } finally {
      setIsLoading(false); // قم بتعيين isLoading إلى false بعد الانتهاء من التحميل
    }
  };

  useEffect(() => {
    fetchReciter();
  }, []);

  useEffect(() => {
    if (selectedReciter) {
      fetchMoshaf(selectedReciter);
    }
  }, [selectedReciter])

  const fetchMoshaf = async (reciter) => {
    try {
      const response = await fetch(`${apiUrl}/reciters?language=${language}&reciter=${reciter}`);
      const data = await response.json();
      const moshafsData = data.reciters[0].moshaf;
      //console.log(moshafsData[0].server); 
      setMoshaf(moshafsData);
      
      
    } catch (error) {
      console.error('Error fetching moshaf:', error);
    }
  };

  const fetchSuwar = async (moshaf) => {
    try {
      const response = await fetch(`${apiUrl}/suwar?moshaf=${moshaf}`);
      const data = await response.json();
      setSuwar(data.suwar);
    } catch (error) {
      console.error('Error fetching suwar:', error);
    }
  };

  useEffect(() => {
    fetchSuwar(selectedMoshaf);
  }, [selectedMoshaf]);

  useEffect(() => {
    if (selectedReciter) {
      fetchMoshaf(selectedReciter);
    }
  }, [selectedReciter]);

  useEffect(() => {
    if (selectedMoshaf) {
      fetchSuwar(selectedMoshaf);
    }
  }, [selectedMoshaf]);

  useEffect(() => {
    if (selectedSurah) {
      fetchSuwar(parseInt(selectedSurah, 10));
    }
  }, [selectedSurah]);

  const [surahMp3, setSurahMp3] = useState('');

  useEffect(() => {
    if (surahMp3 && audioPlayerRef.current) {
      audioPlayerRef.current.src = surahMp3;
    }
  }, [surahMp3]);

  
  useEffect(() => {
  const selectedSurahObject = suwar.find((surah) => surah.id === parseInt(selectedSurah, 10));

  if (selectedSurahObject) {
    // const surahServer = selectedMoshaf.server || '';
    const padSurah = selectedSurahObject.id.toString().padStart(3, '0');
    const surahMp3 = `${moshaf[selectedMoshafIndex-1].server}/${padSurah}.mp3`;
console.log();


    setSurahMp3(surahMp3);
  }
}, [selectedSurah, selectedMoshaf, suwar, selectedReciter , moshaf, selectedMoshafIndex]);
  
  //

  const handleReciterChange = (e) => {
    const reciterId = e.target.value;
    setSelectedReciter(reciterId);
    // إعادة تعيين القيم عند اختيار القارئ
    setSelectedMoshaf('');
    setSelectedSurah('');
  };
  return (
    <Form className="container text-center">
      <Row className="justify-content-center align-items-center mb-3 flex-row-reverse container">
        {/* اختيار القارئ */}
        <Col sm={12} md={6} lg={4}>
          <Form.Group controlId="chooseReciter">
            <Form.Label>اختر القارء</Form.Label>
            <Form.Select
              value={selectedReciter}
              onChange={handleReciterChange}
            >
              <option value="" disabled>اختر القارء أولا</option>
              {reciter.map(reciter => (
                <option key={reciter.id} value={reciter.id}>
                  {reciter.name}
                  
                </option>
              ))}
              
            </Form.Select>
            {isLoading && <BorderExample />}
          </Form.Group>
        </Col>

        {/* اختيار الرواية */}
        <Col sm={12} md={6} lg={4}>
        <Form.Group controlId="chooseMoshaf">
          <Form.Label>اختر الرواية</Form.Label>
          <Form.Select
            value={selectedMoshaf}
            onChange={(e) => {setSelectedMoshaf(e.target.value)
              setSelectedMoshafIndex(e.target.selectedIndex);
            }}
          >
           <option value="" disabled>اختر الرواية ثانيا</option> 
            {moshaf.map(moshaf => (
              <option key={moshaf.id} value={moshaf.id}>
                {moshaf.name  }
                
                
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
        
        {/* اختيار السورة */}
        <Col sm={12} md={6} lg={4}>
          <Form.Group controlId="chooseSurah">
            <Form.Label>اختر السورة</Form.Label>
            <Form.Select
              value={selectedSurah}
              onChange={(e) => setSelectedSurah(e.target.value)}
            >
              <option value="" disabled>ثم اختر السورة </option>
              {suwar.map(surah => (
                <option key={surah.id} value={surah.id}>
                  {surah.name}
                  
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <ReactAudioPlayer
        className="w-100 container"
        ref={audioPlayerRef}
        src={surahMp3}
        controls
      />
    </Form>
  );
}

export default GridSelector;