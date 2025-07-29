import React, { useState } from 'react';
import styled from 'styled-components';
import { Camera, X } from 'lucide-react';

// Styled Components
const OpenVideoButton = styled.button`
  padding: 0.5rem;
  background-color: #2563EB;
  border: none;
  border-radius: 0.5rem;
  color: white;
  transition: background-color 0.15s ease;
  cursor: pointer;
  
  &:hover {
    background-color: #4F46E5;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const VideoModal = styled.div`
  background-color: transparent;
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  max-width: 900px;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  background-color: ${({ theme }) => theme.modal.background};
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
`;

const ModalCloseButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.4);
  }
`;

const ModalVideoContainer = styled.div`
  position: relative;
  background-color: black;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ModalErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.modal.background};
  border: 1px solid #fecaca;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  margin: 20px;
`;

const VideoInfo = styled.div`
  background-color: ${({ theme }) => theme.modal.background};
  color: white;
  padding: 22px 12px;
  font-size: 12px;
  text-align: center;
  font-family: monospace;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

// Component
export default function CameraView() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [error, setError] = useState('');
  const videoUrl = "https://videos.pexels.com/video-files/3066463/3066463-uhd_2732_1440_24fps.mp4";

  const openVideo = () => {
    setError('');
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    setError('');
  };

  const handleVideoError = () => {
    setError('No se pudo cargar el video. Verifica la URL.');
  };

  return (
    <>
      <OpenVideoButton onClick={openVideo}>
        <Camera className="w-4 h-4" color="white" />
      </OpenVideoButton>

      {isVideoOpen && (
        <Overlay onClick={(e) => {
          if (e.target === e.currentTarget) closeVideo();
        }}>
          <VideoModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                <Camera size={24} />
                Video Stream
              </ModalTitle>
              <ModalCloseButton onClick={closeVideo}>
                <X size={20} />
              </ModalCloseButton>
            </ModalHeader>

            <ModalVideoContainer>
              <StyledVideo
                src={videoUrl}
                controls
                autoPlay
                muted
                onError={handleVideoError}
              />
            </ModalVideoContainer>

            {error && <ModalErrorMessage>{error}</ModalErrorMessage>}

            <VideoInfo>
              📹 Formato: MP4 | 🎯 Resolución: HD | 🔗 Stream en vivo
            </VideoInfo>
          </VideoModal>
        </Overlay>
      )}
    </>
  );
}
