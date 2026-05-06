import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
import ProtectedRoute from './components/Rotas/ProtectedRoutes'
import PAlunos from './pages/PListagens/PAlunos/PAlunos'
import PEmprestimos from './pages/PListagens/PEmprestimos/PEmprestimos'
import PLivros from './pages/PListagens/PLivros/PLivros'
import PDetalhesAluno from './pages/PDetalhes/PDetalhesAluno'
import PDetalhesLivro from './pages/PDetalhes/PDetalhesLivro'
import PDetalhesEmprestimo from './pages/PDetalhes/PDetalhesEmprestimo'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} />
        <Route path='/login' element={<PLogin />} />
        <Route path='/alunos' element={<ProtectedRoute element={PAlunos} />} />
        <Route path='/emprestimos' element={<ProtectedRoute element={PEmprestimos} />} />
        <Route path='/livros' element={<ProtectedRoute element={PLivros} />} />
        <Route path='/aluno/detalhes/:id_aluno' element={<ProtectedRoute element={PDetalhesAluno} />} />
        <Route path='/livro/detalhes/:id_livro' element={<ProtectedRoute element={PDetalhesLivro} />} />
        <Route path='/emprestimo/detalhes/:id_emprestimo' element={<ProtectedRoute element={PDetalhesEmprestimo} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
