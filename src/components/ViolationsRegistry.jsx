import { AlertTriangle } from 'lucide-react';
import styled, { useTheme } from 'styled-components';

const RegistryContainer = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.accentGradient};
  border-radius: 1rem;
  min-height: 300px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const TableContainer = styled.div`
  background: ${({ theme }) => theme.card}CC;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.75rem;
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const TableHeaderRow = styled.tr``;

const TableHeaderCell = styled.th`
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  &:first-child {
    padding-left: 1.5rem;
  }
  
  &:last-child {
    padding-right: 1.5rem;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.border};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.background}CC;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  
  &:first-child {
    padding-left: 1.5rem;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
  }
  
  &:last-child {
    padding-right: 1.5rem;
  }
`;

const VehicleIdCell = styled(TableCell)`
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: ${({ theme }) => theme.status.info};
`;

const DateCell = styled(TableCell)`
  color: ${({ theme }) => theme.textSecondary};
`;

const TimeCell = styled(TableCell)`
  color: ${({ theme }) => theme.textSecondary};
  font-family: 'Courier New', monospace;
`;

const DescriptionCell = styled(TableCell)`
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 500;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
`;

const ViolationsRegistry = () => {
  const theme = useTheme();
  const violationsData = [
    {
      id: 1,
      vehicleId: 'ABC-123',
      date: '2025-01-18',
      time: '08:45',
      description: 'No respetó semáforo 1'
    },
    {
      id: 2,
      vehicleId: 'XYZ-789',
      date: '2025-01-18',
      time: '10:00',
      description: 'Invadió cruce peatonal'
    },
    {
      id: 3,
      vehicleId: 'DEF-456',
      date: '2025-01-18',
      time: '11:30',
      description: 'Exceso de velocidad'
    }
  ];

  return (
    <RegistryContainer theme={theme}>
      <Header>
        <AlertTriangle size={24} color={theme.text} />
        <Title theme={theme}>Registro de Infracciones</Title>
      </Header>

      <TableContainer theme={theme}>
        <Table>
          <TableHeader theme={theme}>
            <TableHeaderRow>
              <TableHeaderCell theme={theme}>ID Vehículo</TableHeaderCell>
              <TableHeaderCell theme={theme}>Fecha</TableHeaderCell>
              <TableHeaderCell theme={theme}>Hora</TableHeaderCell>
              <TableHeaderCell theme={theme}>Descripción</TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {violationsData.length > 0 ? (
              violationsData.map((violation) => (
                <TableRow key={violation.id} theme={theme}>
                  <VehicleIdCell theme={theme}>{violation.vehicleId}</VehicleIdCell>
                  <DateCell theme={theme}>{violation.date}</DateCell>
                  <TimeCell theme={theme}>{violation.time}</TimeCell>
                  <DescriptionCell theme={theme}>{violation.description}</DescriptionCell>
                </TableRow>
              ))
            ) : (
              <TableRow theme={theme}>
                <TableCell colSpan="4" theme={theme}>
                  <NoDataMessage theme={theme}>
                    No hay infracciones registradas
                  </NoDataMessage>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </RegistryContainer>
  );
};

export default ViolationsRegistry;