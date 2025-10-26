import { Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Estoques from './pages/Estoques'
import Alugueis from './pages/Alugueis'

function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estoques" element={<Estoques />} />
          <Route path="/alugueis" element={<Alugueis />} />
        </Routes>
      </Container>
    </>
  )
}

export default App