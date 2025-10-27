import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import axios from 'axios';

function GerenciarAlugueis() {
  const [alugueis, setAlugueis] = useState([]);

  useEffect(() => {
    fetchAlugueis();
  }, []);

  const fetchAlugueis = async () => {
    try {
      const response = await axios.get('/api/alugueis'); // Ajuste conforme sua API
      setAlugueis(response.data.filter(a => a.status === 'ativo'));
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar aluguéis.');
    }
  };

  const handleFinalizar = async (id) => {
    try {
      await axios.put(`/api/alugueis/${id}`, { status: 'finalizado' });
      fetchAlugueis();
    } catch (error) {
      console.error(error);
      alert('Erro ao finalizar aluguel.');
    }
  };

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Gerenciar Aluguéis Ativos
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Estoque ID</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Data Início</TableCell>
            <TableCell>Data Fim</TableCell>
            <TableCell>Valor Mensal</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alugueis.map(a => (
            <TableRow key={a.id}>
              <TableCell>{a.estoque_id}</TableCell>
              <TableCell>{a.cliente_nome}</TableCell>
              <TableCell>{a.cliente_email}</TableCell>
              <TableCell>{a.data_inicio}</TableCell>
              <TableCell>{a.data_fim || '-'}</TableCell>
              <TableCell>{a.valor_mensal}</TableCell>
              <TableCell>{a.status}</TableCell>
              <TableCell>
                <Button variant="contained" color="success" size="small" onClick={() => handleFinalizar(a.id)}>Finalizar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default GerenciarAlugueis;
