import { Users, Clock } from 'lucide-react';
import styled, { useTheme } from 'styled-components';

const CrossingContainer = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.accentGradient};
  border-radius: 1rem;
  min-height: 400px;
  margin-bottom: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text};
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const CrossingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const CrossingCard = styled.div`
  background: ${({ theme }) => theme.card}CC;
  border-radius: 0.75rem;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border: 2px solid
    ${({ $hasPedestrians, theme }) =>
      $hasPedestrians
        ? theme.status.warning + 'B3'
        : 'transparent'};
  
  &:hover {
    background: ${({ theme }) => theme.card};
    transform: translateY(-2px);
    border-color: ${({ $hasPedestrians, theme }) =>
      $hasPedestrians
        ? theme.status.warning + 'B3'
        : 'transparent'};
  }
`;

const CrossingTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;
  margin: 0 0 1.5rem 0;
`;

const PedestrianIconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const PedestrianIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background: ${({ $hasPedestrians, theme }) =>
    $hasPedestrians
      ? `linear-gradient(135deg, ${theme.status.warning} 0%, #d97706 100%)`
      : `linear-gradient(135deg, ${theme.status.success} 0%, #16a34a 100%)`};
  box-shadow: ${({ $hasPedestrians, theme }) =>
    $hasPedestrians
      ? `0 0 25px ${theme.status.warning}66`
      : `0 0 25px ${theme.status.success}66`};
  color: white;
`;

const CountContainer = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const CountNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
`;

const CountLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
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

  ${({ $hasPedestrians, theme }) =>
    $hasPedestrians
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

const PedestrianCrossingControl = () => {
  const theme = useTheme();
  const crossingData = [
    {
      id: 1,
      name: 'Cruce 1',
      pedestrianCount: 3,
      label: 'Peatones'
    },
    {
      id: 2,
      name: 'Cruce 2',
      pedestrianCount: 0,
      label: 'Peatones'
    },
    {
      id: 3,
      name: 'Cruce 3',
      pedestrianCount: 1,
      label: 'Peatón'
    },
    {
      id: 4,
      name: 'Cruce 4',
      pedestrianCount: 0,
      label: 'Peatones'
    }
  ];

  const getStatusText = (count) => {
    if (count > 0) {
      return 'Esperando cruzar';
    }
    return 'Sin peatones';
  };

  const getStatusIcon = (count) => {
    if (count > 0) {
      return <Clock size={16} />;
    }
    return <Users size={16} />;
  };

  return (
    <CrossingContainer theme={theme}>
      <Header theme={theme}>
        <Users size={24} />
        <Title theme={theme}>Cruces Peatonales</Title>
      </Header>

      <CrossingGrid>
        {crossingData.map((crossing) => {
          const hasPedestrians = crossing.pedestrianCount > 0;
          return (
            <CrossingCard key={crossing.id} $hasPedestrians={hasPedestrians} theme={theme}>
              <CrossingTitle theme={theme}>{crossing.name}</CrossingTitle>
              <PedestrianIconContainer>
                <PedestrianIcon $hasPedestrians={hasPedestrians} theme={theme}>
                  <Users size={24} />
                </PedestrianIcon>
              </PedestrianIconContainer>
              <CountContainer>
                <CountNumber theme={theme}>{crossing.pedestrianCount}</CountNumber>
                <CountLabel theme={theme}>{crossing.label}</CountLabel>
              </CountContainer>
              <StatusContainer $hasPedestrians={hasPedestrians} theme={theme}>
                {getStatusIcon(crossing.pedestrianCount)}
                {getStatusText(crossing.pedestrianCount)}
              </StatusContainer>
            </CrossingCard>
          );
        })}
      </CrossingGrid>
    </CrossingContainer>
  );
};

export default PedestrianCrossingControl;