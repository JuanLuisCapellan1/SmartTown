import { Car, Truck, AlertTriangle, Users } from 'lucide-react';
import styled, { useTheme } from 'styled-components';

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  padding: 1rem 0rem;
  border-radius: 0.75rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const StatusCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.cardShadow || 'none'};

  &:hover {
    box-shadow: 0 4px 16px ${({ theme }) => theme.border}33;
    transform: translateY(-2px);
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  flex-shrink: 0;
  ${({ $variant }) => {
    switch ($variant) {
      case 'parked':
        return `background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white;`;
      case 'heavy':
        return `background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white;`;
      case 'violations':
        return `background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white;`;
      case 'waiting':
        return `background: linear-gradient(135deg, #22c55e 0%, #15803d 100%); color: white;`;
      default:
        return `background: linear-gradient(135deg, #6b7280 0%, #374151 100%); color: white;`;
    }
  }}
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  flex-grow: 1;
`;

const Title = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme, $variant }) => {
    switch ($variant) {
      case 'parked':
        return theme.status?.info || '#60a5fa';
      case 'heavy':
        return theme.status?.error || '#f472b6';
      case 'violations':
        return theme.status?.warning || '#fbbf24';
      case 'waiting':
        return theme.status?.success || '#4ade80';
      default:
        return theme.textSecondary || '#9ca3af';
    }
  }};
`;

const Value = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary || '#e5e7eb'};
  margin: 0;
`;

const DashboardStatusCards = () => {
  const theme = useTheme();
  const statusData = [
    {
      id: 1,
      title: 'Vehículos Parqueados',
      value: '3 vehículos',
      variant: 'parked',
      icon: Car
    },
    {
      id: 2,
      title: 'Vehículo Pesado',
      value: 'Presente',
      variant: 'heavy',
      icon: Truck
    },
    {
      id: 3,
      title: 'Infracciones Hoy',
      value: '3 registradas',
      variant: 'violations',
      icon: AlertTriangle
    },
    {
      id: 4,
      title: 'Peatones Esperando',
      value: 'Si',
      variant: 'waiting',
      icon: Users
    }
  ];

  return (
    <CardsContainer>
      {statusData.map((item) => {
        const IconComponent = item.icon;
        return (
          <StatusCard key={item.id} theme={theme}>
            <IconContainer $variant={item.variant}>
              <IconComponent size={20} />
            </IconContainer>
            <ContentContainer>
              <Title $variant={item.variant} theme={theme}>{item.title}</Title>
              <Value theme={theme}>{item.value}</Value>
            </ContentContainer>
          </StatusCard>
        );
      })}
    </CardsContainer>
  );
};

export default DashboardStatusCards;