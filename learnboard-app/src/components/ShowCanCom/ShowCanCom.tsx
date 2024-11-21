import React, { use, useEffect, useState } from 'react';
import Compiler from '../Compiler/Complier';
import AppLayout from '~/layouts/AppLayout';
import Draggable from 'react-draggable';
import styles from './ParentComponent.module.css'; // Importa el módulo CSS
import { FaArrowsAlt } from 'react-icons/fa';
import dynamic from "next/dynamic";
import axios from 'axios';
import { useRouter } from "next/router";
import useCanvasContext from '~/context/useCanvasContext';
const Overlay = dynamic(
  () => import("../VideoSDK/Overlay"),
  {
    ssr: false,
  }
);

const ParentComponent: React.FC = () => {
  const router = useRouter();
  const [showCompiler, setShowCompiler] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('https://example.com/');
  const [showIframe, setShowIframe] = useState(true);
  const [meetingId, setMeetingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setCenter } = useCanvasContext();


  const handleShowCompilerChange = (newShowCompiler: boolean | ((prevState: boolean) => boolean)) => {
    setShowCompiler(newShowCompiler);
  };

  const handleIframeStateChange = (newSrc: string | ((prevState: string) => string)) => {
    setIframeSrc(newSrc);
  };

  const fetchMeetingId = async () => {
    const boardCode = router.query.id;
    try {
      const response = await axios.get(`https://api.learn-board.tech/colabs/${boardCode}`);
      if (response.status === 200) {
        setMeetingId(response.data.data.meetingId);
      }
    } catch (error) {
      console.error("Error obteniendo el ID de la reunión:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
    fetchMeetingId();
    handleIframeStateChange((prevSrc) => prevSrc);
    setCenter();
  }, []);

  return (
    <div>

      <div style={{ display: showCompiler ? 'none' : 'block' }}>
        <AppLayout
          showCompiler={showCompiler}
          onShowCompilerChange={handleShowCompilerChange}
        />
      </div>
      <div style={{ display: showCompiler ? 'block' : 'none' }}>
        <Compiler
          showCompiler={showCompiler}
          onShowCompilerChange={handleShowCompilerChange}
          iframeSrc={iframeSrc}
          handleIframeStateChange={handleIframeStateChange}
        />
      </div>

      <Draggable handle={`.${styles.moveButton}`}>
        <div className={styles.draggableContainer}>
          <div className={styles.iframeContainer}>
            <button className={styles.moveButton}>
              <FaArrowsAlt />
            </button>
            {/* <button onClick={() => setShowIframe(!showIframe)} className={styles.toggleButton}>
              {showIframe ? 'Ocultar' : 'Mostrar'}
            </button> */}

            {loading ? (
              <div className={styles.hiddenIframe}>Estamos creando tu videollamada, espera...</div>
            ) : meetingId ? (
              <Overlay meetingId={meetingId}/>
            ) :(
              <div className={styles.hiddenIframe}>Ocurrio un error al crear la videollamada</div>
            )}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default ParentComponent;
