import { BarChart3, Car, AlertTriangle, Users, Clock, Zap, Eye, Moon, Sun } from 'lucide-react';
import styled from 'styled-components';
import CameraView from './CameraView';

const HeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;
  background: linear-gradient(90deg, #1e3a8a 0%, #1e40af 25%, #2563eb 50%, #1d4ed8 75%, #1e3a8a 100%);
  
  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;


const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

const LogoContainer = styled.div`
  padding: 0.5rem;
  background-color: #2563eb;
  border-radius: 0.5rem;
  flex-shrink: 0;
`;

const TitleContainer = styled.div`
  min-width: 0;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #b7c2d2ff;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const AutoButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #ea580c;
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 0.875rem;
  transition: background-color 0.15s ease;
  white-space: nowrap;
  cursor: pointer;
  
  &:hover {
    background-color: #c2410c;
  }
`;

const IconButton = styled.button`
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

// Header Component
const Header = ({ darkMode = false, toggleDarkMode = () => {} }) => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        {/* Left Section - Logo and Title */}
        <LeftSection>
          <LogoContainer>
            <BarChart3 className="w-6 h-6 text-white" />
          </LogoContainer>
          <TitleContainer>
            <Title>Dashboard</Title>
            <Subtitle>lunes, 21 de julio de 2025, 21:26:24</Subtitle>
          </TitleContainer>
        </LeftSection>
        
        {/* Right Section - Buttons */}
        <RightSection>
          <IconButton
            onClick={toggleDarkMode}
            title={darkMode ? "Light mode" : "Dark mode"}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </IconButton>
          <CameraView darkMode={darkMode}/>
        </RightSection>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;