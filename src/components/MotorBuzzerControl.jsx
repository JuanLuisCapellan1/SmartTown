import { Settings, Zap, Hand, ToggleLeft, ToggleRight, StepForward, StepBack, Volume2, Power } from 'lucide-react';
import { useState } from 'react';
import styled, { useTheme } from 'styled-components';

const ControlContainer = styled.div`
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

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ControlPanel = styled.div`
  background: ${({ theme }) => theme.card}CC;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.75rem;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.card};
    border-color: ${({ theme }) => theme.accent};
  }
`;

const PanelTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.text};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 2rem 0;
  text-align: center;
  justify-content: center;
`;

const StatusDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const StatusBox = styled.div`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 0.75rem;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  min-width: 150px;
  transition: all 0.3s ease;
`;

const StatusIcon = styled.div`
  width: 2rem;
  height: 2rem;
  border: 2px solid ${({ theme }) => theme.textSecondary};
  border-radius: 0.25rem;
  background: transparent;
`;

const StatusText = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1rem;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
  justify-content: center;

  ${({ variant, theme }) => {
    // Detectar tema claro
    const isLight = theme.background === "#f1f5f9";
    if (variant === 'forward' || variant === 'backward') {
      return `
        background: ${theme.card};
        color: ${theme.textSecondary};
        border: 1px solid ${theme.border};
        &:hover {
          background: ${theme.background};
          color: ${theme.text};
        }
      `;
    } else if (variant === 'on') {
      return isLight
        ? `
            background: #22c55e;
            color: #fff;
            border: 1px solid #16a34a;
            box-shadow: 0 2px 8px #22c55e33;
            &:hover {
              background: #16a34a;
              color: #fff;
            }
          `
        : `
            background: rgba(34, 197, 94, 0.2);
            color: #4ade80;
            border: 1px solid rgba(34, 197, 94, 0.4);
            &:hover {
              background: rgba(34, 197, 94, 0.3);
              color: #22c55e;
            }
          `;
    } else if (variant === 'off') {
      return isLight
        ? `
            background: #ef4444;
            color: #fff;
            border: 1px solid #b91c1c;
            box-shadow: 0 2px 8px #ef444433;
            &:hover {
              background: #b91c1c;
              color: #fff;
            }
          `
        : `
            background: rgba(239, 68, 68, 0.2);
            color: #f87171;
            border: 1px solid rgba(239, 68, 68, 0.4);
            &:hover {
              background: rgba(239, 68, 68, 0.3);
              color: #ef4444;
            }
          `;
    }
  }}
`;

const BuzzerStatusBox = styled(StatusBox)`
  border-color: ${({ status, theme }) =>
    status === 'Encendido' ? theme.status.success : theme.status.error};
`;

const BuzzerStatusIcon = styled(StatusIcon)`
  border-color: ${({ status, theme }) =>
    status === 'Encendido' ? theme.status.success : theme.status.error};
  background: ${({ status, theme }) =>
    status === 'Encendido'
      ? 'rgba(34, 197, 94, 0.1)'
      : 'rgba(239, 68, 68, 0.1)'};
`;

const BuzzerStatusText = styled(StatusText)`
  color: ${({ status, theme }) =>
    status === 'Encendido' ? theme.status.success : theme.status.error};
`;

const MotorBuzzerControl = () => {
  const theme = useTheme();
  const [mode, setMode] = useState('auto');
  const [motorStatus, setMotorStatus] = useState('Cerrado');
  const [buzzerStatus, setBuzzerStatus] = useState('Encendido');

  // Solo permite acciones en modo manual
  const handleMotor = (status) => {
    if (mode !== 'manual') return;
    setMotorStatus(status);
  };

  const handleBuzzer = (status) => {
    if (mode !== 'manual') return;
    setBuzzerStatus(status);
  };

  return (
    <ControlContainer theme={theme}>
      <Header>
        <Title theme={theme}>
          <Settings size={24} />
          Control del Motor y Buzzer
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

      <ControlsGrid>
        {/* Motor Control Panel */}
        <ControlPanel theme={theme}>
          <PanelTitle theme={theme}>
            <Settings size={20} />
            Control del Motor
          </PanelTitle>
          
          <StatusDisplay>
            <StatusBox theme={theme}>
              <StatusIcon theme={theme} />
              <StatusText theme={theme}>{motorStatus}</StatusText>
            </StatusBox>
          </StatusDisplay>

          {/* Mostrar controles solo en modo manual */}
          {mode === 'manual' && (
            <ActionButtons>
              <ActionButton 
                variant="forward"
                onClick={() => handleMotor('Adelante')}
                theme={theme}
              >
                <StepForward size={16} />
                Adelante
              </ActionButton>
              <ActionButton 
                variant="backward"
                onClick={() => handleMotor('Atrás')}
                theme={theme}
              >
                <StepBack size={16} />
                Atrás
              </ActionButton>
            </ActionButtons>
          )}
        </ControlPanel>

        {/* Buzzer Control Panel */}
        <ControlPanel theme={theme}>
          <PanelTitle theme={theme}>
            <Settings size={20} />
            Control del Buzzer
          </PanelTitle>
          
          <StatusDisplay>
            <BuzzerStatusBox status={buzzerStatus} theme={theme}>
              <BuzzerStatusIcon status={buzzerStatus} theme={theme} />
              <BuzzerStatusText status={buzzerStatus} theme={theme}>{buzzerStatus}</BuzzerStatusText>
            </BuzzerStatusBox>
          </StatusDisplay>

          {/* Mostrar controles solo en modo manual */}
          {mode === 'manual' && (
            <ActionButtons>
              <ActionButton 
                variant="on"
                onClick={() => handleBuzzer('Encendido')}
                theme={theme}
              >
                <Volume2 size={16} />
                Encendido
              </ActionButton>
              <ActionButton 
                variant="off"
                onClick={() => handleBuzzer('Apagado')}
                theme={theme}
              >
                <Power size={16} />
                Apagado
              </ActionButton>
            </ActionButtons>
          )}
        </ControlPanel>
      </ControlsGrid>
    </ControlContainer>
  );
};

export default MotorBuzzerControl;