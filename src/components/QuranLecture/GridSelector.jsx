import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ReactAudioPlayer from "react-audio-player";
import Select from "react-select";
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

  const reciterOptions = reciter.map((item) => ({
    value: item.id.toString(),
    label: item.name,
  }));

  const moshafOptions = moshaf.map((item) => ({
    value: item.id.toString(),
    label: item.name,
  }));

  const surahOptions = suwar.map((item) => ({
    value: item.id.toString(),
    label: item.name,
  }));

  const handleReciterChange = (option) => {
    const reciterId = option?.value || '';
    setSelectedReciter(reciterId);
    setSelectedMoshaf('');
    setSelectedSurah('');
    setSelectedMoshafIndex(null);
  };
  return (
    <Form className="container text-center">
      <Row className="justify-content-center align-items-center mb-3 flex-row-reverse container">
        {/* اختيار القارئ */}
        <Col sm={12} md={6} lg={4}>
          <Form.Group controlId="chooseReciter">
            <Form.Label>اختر القارئ أولًا</Form.Label>
            <Select
              options={reciterOptions}
              value={reciterOptions.find(
                (option) => option.value === selectedReciter
              ) || null}
              onChange={handleReciterChange}
              isSearchable
              isClearable
              isLoading={isLoading}
              placeholder="ابحث عن القارئ..."
              noOptionsMessage={() => "لا توجد نتائج"}
              isRtl
            />
            {isLoading && <BorderExample />}
          </Form.Group>
        </Col>

        {/* اختيار الرواية */}
        <Col sm={12} md={6} lg={4}>
        <Form.Group controlId="chooseMoshaf">
          <Form.Label>اختر الرواية ثانيًا</Form.Label>
          <Select
            options={moshafOptions}
            value={moshafOptions.find(
              (option) => option.value === selectedMoshaf
            ) || null}
            onChange={(option) => {
              const moshafId = option?.value || '';
              setSelectedMoshaf(moshafId);
              setSelectedMoshafIndex(
                moshaf.findIndex((item) => item.id.toString() === moshafId) + 1
              );
              setSelectedSurah('');
            }}
            isSearchable
            isClearable
            isDisabled={!selectedReciter || moshafOptions.length === 0}
            placeholder="ابحث عن الرواية..."
            noOptionsMessage={() => "لا توجد نتائج"}
            isRtl
          />
        </Form.Group>
      </Col>
        
        {/* اختيار السورة */}
        <Col sm={12} md={6} lg={4}>
          <Form.Group controlId="chooseSurah">
            <Form.Label>اختر السورة أخيرًا</Form.Label>
            <Select
              options={surahOptions}
              value={surahOptions.find(
                (option) => option.value === selectedSurah
              ) || null}
              onChange={(option) => setSelectedSurah(option?.value || '')}
              isSearchable
              isClearable
              isDisabled={!selectedMoshaf || surahOptions.length === 0}
              placeholder="ابحث عن السورة..."
              noOptionsMessage={() => "لا توجد نتائج"}
              isRtl
            />
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