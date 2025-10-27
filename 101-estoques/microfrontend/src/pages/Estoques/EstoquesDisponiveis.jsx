import { Box, Typography, Grid, Paper, Button } from "@mui/material";

function EstoquesDisponiveis() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Estoques Disponíveis
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Encontre e alugue espaços de estoque disponíveis em diversas regiões.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Paper
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              elevation={3}
            >
              <Typography variant="h6">Estoque #{i}</Typography>
              <Typography variant="body2" color="text.secondary">
                Localização: Curitiba - PR
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Tamanho: 80 m²
              </Typography>
              <Typography variant="body2">R$ 1500 / mês</Typography>
              <Button
                sx={{ mt: 2 }}
                fullWidth
                variant="contained"
                color="primary"
              >
                Ver detalhes
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default EstoquesDisponiveis;
