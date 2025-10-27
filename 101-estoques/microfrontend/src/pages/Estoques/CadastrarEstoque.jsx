import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";

function CadastrarEstoque() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Cadastrar Novo Estoque
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Adicione um novo estoque disponível para aluguel em poucos cliques.
      </Typography>

      <Paper sx={{ p: 3, mt: 3, maxWidth: 600 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Código do Estoque" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Nome" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth type="number" label="Tamanho (m²)" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth type="number" label="Preço Mensal (R$)" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Localização" variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth variant="contained" size="large">
              Cadastrar Estoque
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default CadastrarEstoque;
