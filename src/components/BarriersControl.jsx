import { Construction, Zap, Hand, ToggleLeft, ToggleRight } from 'lucide-react';
import styled, { useTheme } from 'styled-components';
import { useState } from 'react';

const BarriersContainer = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.accentGradient};
  border-radius: 1rem;
  min-height: 350px;
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

const BarriersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const BarrierCard = styled.div`
  background: ${({ theme }) => theme.card}CC;
  border-radius: 0.75rem;
  padding: 2rem 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 2px solid ${({ $isActive, theme }) =>
    $isActive ? 'rgba(245, 158, 11, 0.5)' : 'transparent'};
  
  &:hover {
    background: ${({ theme }) => theme.card};
    transform: translateY(-2px);
    border-color: ${({ $isActive }) =>
      $isActive ? 'rgba(245, 158, 11, 0.7)' : 'transparent'};
  }
`;

const BarrierTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
`;

const BarrierIconContainer = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  background: ${({ $isActive, theme }) =>
    $isActive
      ? `linear-gradient(135deg, ${theme.status.warning} 0%, #d97706 100%)`
      : theme.status.error
  };
  box-shadow: ${({ $isActive, theme }) =>
    $isActive
      ? `0 0 25px ${theme.status.warning}66`
      : `0 0 25px ${theme.status.error}66`
  };
  color: white;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 120px;

  ${({ $isActive, theme }) =>
    $isActive
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

const StatusIcon = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.status.warning : theme.status.error};
  box-shadow: ${({ $isActive, theme }) =>
    $isActive
      ? `0 0 8px ${theme.status.warning}99`
      : `0 0 8px ${theme.status.error}99`
  };
`;

const BarriersControl = () => {
  const theme = useTheme();
  const [mode, setMode] = useState('auto');
  const [barriers, setBarriers] = useState([
    { id: 1, name: 'Barrera 1', isActive: true },
    { id: 2, name: 'Barrera 2', isActive: false },
    { id: 3, name: 'Barrera 3', isActive: true }
  ]);

  const getStatusText = (isActive) => (isActive ? 'Activa' : 'Desactivada');

  // Cambia el estado de la barrera solo en modo manual
  const toggleBarrier = (id) => {
    if (mode !== 'manual') return;
    setBarriers(barriers =>
      barriers.map(barrier =>
        barrier.id === id
          ? { ...barrier, isActive: !barrier.isActive }
          : barrier
      )
    );
  };

  return (
    <BarriersContainer theme={theme}>
      <Header>
        <Title theme={theme}>
          <Construction size={24} />
          Barreras
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
            {mode === 'auto'
              ? <ToggleLeft size={20} />
              : <ToggleRight size={20} />
            }
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

      <BarriersGrid>
        {barriers.map((barrier) => (
          <BarrierCard
            key={barrier.id}
            $isActive={barrier.isActive}
            onClick={() => toggleBarrier(barrier.id)}
            theme={theme}
            style={mode === 'manual' ? { cursor: 'pointer' } : { cursor: 'default' }}
            title={mode === 'manual' ? 'Haz clic para alternar el estado' : ''}
          >
            <BarrierTitle theme={theme}>{barrier.name}</BarrierTitle>
            <BarrierIconContainer $isActive={barrier.isActive} theme={theme}>
              <Construction size={24} />
            </BarrierIconContainer>
            <StatusContainer $isActive={barrier.isActive} theme={theme}>
              <StatusIcon $isActive={barrier.isActive} theme={theme} />
              {getStatusText(barrier.isActive)}
            </StatusContainer>
          </BarrierCard>
        ))}
      </BarriersGrid>
    </BarriersContainer>
  );
};

export default BarriersControl;