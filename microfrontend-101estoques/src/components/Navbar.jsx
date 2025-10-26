import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          101Estoques
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/estoques">
          Estoques
        </Button>
        <Button color="inherit" component={RouterLink} to="/alugueis">
          Aluguéis
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar