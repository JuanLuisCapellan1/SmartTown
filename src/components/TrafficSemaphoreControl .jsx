import { Clock, Car, Zap, Hand, ToggleLeft, ToggleRight } from 'lucide-react';
import styled, { useTheme } from 'styled-components';
import { useState, useEffect } from 'react';

const SemaphoreContainer = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.accentGradient};
  border-radius: 1rem;
  min-height: 500px;
  margin-bottom: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${({ $active, theme }) => $active ? `
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
  ` : `
    background: ${theme.card};
    color: ${theme.textSecondary};
    border: 1px solid ${theme.border};
    &:hover {
      background: ${theme.background};
      color: ${theme.text};
    }
  `}
`;

const SemaphoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const SemaphoreCard = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.75rem;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.background};
    border-color: ${({ theme }) => theme.accent};
    transform: translateY(-2px);
  }
`;

const SemaphoreTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;
  margin: 0 0 1.5rem 0;
`;

const TrafficLightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TrafficLightBox = styled.div`
  background: ${({ theme }) => theme.background};
  border-radius: 1rem;
  padding: 1rem 0.75rem;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.3);
  border: 2px solid ${({ theme }) => theme.border};
`;

const TrafficLight = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.375rem 0;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);

  ${({ $active, color, theme }) => {
    if ($active) {
      switch (color) {
        case 'red':
          return `
            background: radial-gradient(circle, #ef4444 0%, #dc2626 70%);
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.6), inset 0 2px 8px rgba(0, 0, 0, 0.3);
          `;
        case 'yellow':
          return `
            background: radial-gradient(circle, #fbbf24 0%, #f59e0b 70%);
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.6), inset 0 2px 8px rgba(0, 0, 0, 0.3);
          `;
        case 'green':
          return `
            background: radial-gradient(circle, #22c55e 0%, #16a34a 70%);
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), inset 0 2px 8px rgba(0, 0, 0, 0.3);
          `;
        default:
          return `background: ${theme.border};`;
      }
    } else {
      return `
        background: ${theme.border};
        opacity: 0.5;
      `;
    }
  }}
`;

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.background};
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border};
`;

const TimerText = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;

  ${({ $hasVehicles, theme }) =>
    $hasVehicles
      ? theme.background === "#f1f5f9"
        // Light theme
        ? `
            background: rgba(251, 191, 36, 0.15);
            border: 1px solid rgba(251, 191, 36, 0.3);
            color: #b45309;
          `
        // Dark theme
        : `
            background: rgba(245, 158, 11, 0.15);
            border: 1px solid rgba(245, 158, 11, 0.3);
            color: #fbbf24;
          `
      : theme.background === "#f1f5f9"
      // Light theme
      ? `
          background: rgba(34, 197, 94, 0.10);
          border: 1px solid rgba(34, 197, 94, 0.18);
          color: #15803d;
        `
      // Dark theme
      : `
          background: rgba(34, 197, 94, 0.15);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #4ade80;
        `
  }
`;

const COLOR_SEQUENCE = {
  red: { next: 'yellow', duration: 15 },
  yellow: { next: null, duration: 3 }, // next is decided dynamically
  green: { next: 'yellow', duration: 15 },
};

const getNextColor = (current, prev) => {
  if (current === 'yellow') {
    // If previous was red, go to green; if previous was green, go to red
    return prev === 'red' ? 'green' : 'red';
  }
  return COLOR_SEQUENCE[current].next;
};

const TrafficSemaphoreControl = () => {
  const theme = useTheme();
  const [mode, setMode] = useState('auto');
  const [semaphores, setSemaphores] = useState([
    {
      id: 1,
      name: 'Semáforo 1',
      activeLight: 'red',
      timer: 10,
      prevLight: 'green',
      hasVehicles: true,
      vehicleCount: 5
    },
    {
      id: 2,
      name: 'Semáforo 2',
      activeLight: 'green',
      timer: 7,
      prevLight: 'yellow',
      hasVehicles: false,
      vehicleCount: 0
    },
    {
      id: 3,
      name: 'Semáforo 3',
      activeLight: 'red',
      timer: 15,
      prevLight: 'green',
      hasVehicles: true,
      vehicleCount: 3
    },
    {
      id: 4,
      name: 'Semáforo 4',
      activeLight: 'yellow',
      timer: 3,
      prevLight: 'red',
      hasVehicles: false,
      vehicleCount: 0
    }
  ]);

  // Countdown effect for automatic mode
  useEffect(() => {
    if (mode !== 'auto') return;
    const interval = setInterval(() => {
      setSemaphores(semaphores =>
        semaphores.map(sem => {
          if (sem.timer > 1) {
            return { ...sem, timer: sem.timer - 1 };
          } else {
            // Change color and reset timer
            let nextColor, nextTimer, prevLight;
            if (sem.activeLight === 'yellow') {
              nextColor = getNextColor('yellow', sem.prevLight);
              nextTimer = nextColor === 'green' ? 15 : 15;
              prevLight = 'yellow';
            } else {
              nextColor = getNextColor(sem.activeLight, sem.prevLight);
              nextTimer = COLOR_SEQUENCE[sem.activeLight].duration === 15 ? 3 : 15;
              prevLight = sem.activeLight;
            }
            if (sem.activeLight === 'red' || sem.activeLight === 'green') {
              // Go to yellow for 3s
              return {
                ...sem,
                prevLight: sem.activeLight,
                activeLight: 'yellow',
                timer: 3
              };
            } else if (sem.activeLight === 'yellow') {
              // Go to green or red for 15s
              return {
                ...sem,
                prevLight: 'yellow',
                activeLight: sem.prevLight === 'red' ? 'green' : 'red',
                timer: 15
              };
            }
            return sem;
          }
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [mode]);

  // Handler to update the activeLight of a semaphore
  const handleLightChange = (id, color) => {
    if (mode !== 'manual') return;
    setSemaphores(semaphores =>
      semaphores.map(sem =>
        sem.id === id ? { ...sem, activeLight: color } : sem
      )
    );
  };

  return (
    <SemaphoreContainer theme={theme}>
      <Header>
        <Title theme={theme}>
          <Clock size={24} />
          Semáforos
        </Title>
        <ControlButtons>
          <ControlButton
            $active={mode === 'auto'}
            onClick={() => setMode('auto')}
            theme={theme}
          >
            <Zap size={16} />
            Automático
          </ControlButton>
          <ControlButton
            onClick={() => setMode(mode === 'auto' ? 'manual' : 'auto')}
            style={{ padding: '0.5rem' }}
            $active={false}
            theme={theme}
          >
            {mode === 'auto' ? (
              <ToggleLeft size={20} />
            ) : (
              <ToggleRight size={20} />
            )}
          </ControlButton>
          <ControlButton
            $active={mode === 'manual'}
            onClick={() => setMode('manual')}
            theme={theme}
          >
            <Hand size={16} />
            Manual
          </ControlButton>
        </ControlButtons>
      </Header>

      <SemaphoreGrid>
        {semaphores.map((semaphore) => (
          <SemaphoreCard key={semaphore.id} theme={theme}>
            <SemaphoreTitle theme={theme}>{semaphore.name}</SemaphoreTitle>
            <TrafficLightContainer>
              <TrafficLightBox theme={theme}>
                <TrafficLight 
                  color="red" 
                  $active={semaphore.activeLight === 'red'} 
                  theme={theme}
                />
                <TrafficLight 
                  color="yellow" 
                  $active={semaphore.activeLight === 'yellow'} 
                  theme={theme}
                />
                <TrafficLight 
                  color="green" 
                  $active={semaphore.activeLight === 'green'} 
                  theme={theme}
                />
              </TrafficLightBox>
              {/* Show manual controls only in manual mode */}
              {mode === 'manual' && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button
                    style={{
                      background: semaphore.activeLight === 'red' ? '#ef4444' : theme.border,
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '2.5rem',
                      height: '2.5rem',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleLightChange(semaphore.id, 'red')}
                  />
                  <button
                    style={{
                      background: semaphore.activeLight === 'yellow' ? '#fbbf24' : theme.border,
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '2.5rem',
                      height: '2.5rem',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleLightChange(semaphore.id, 'yellow')}
                  />
                  <button
                    style={{
                      background: semaphore.activeLight === 'green' ? '#22c55e' : theme.border,
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '2.5rem',
                      height: '2.5rem',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleLightChange(semaphore.id, 'green')}
                  />
                </div>
              )}
            </TrafficLightContainer>
            {/* Countdown only in auto mode */}
            {mode === 'auto' && (
              <TimerContainer theme={theme}>
                <Clock size={16} />
                <TimerText theme={theme}>{semaphore.timer}s</TimerText>
              </TimerContainer>
            )}
            <StatusContainer $hasVehicles={semaphore.hasVehicles}>
              <Car size={16} />
              {semaphore.hasVehicles 
                ? `${semaphore.vehicleCount} Vehículos esperando`
                : 'Sin vehículos'
              }
            </StatusContainer>
          </SemaphoreCard>
        ))}
      </SemaphoreGrid>
    </SemaphoreContainer>
  );
};

export default TrafficSemaphoreControl;