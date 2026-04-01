import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
import PListaAluno from './pages/PLista/PListaAluno/PListaAluno'
import PListaLivro from './pages/PLista/PListaLivro/PListaLivro'
import PListaEmprestimo from './pages/PLista/PListaEmprestimo/PListaEmprestimo'
import PCadastroAluno from './pages/PCadastro/PCadastroAluno/PCadastroAluno'
import PCadastroLivro from './pages/PCadastro/PCadastroLivro/PCadastroLivro'
import PCadastroEmprestimo from './pages/PCadastro/PCadastroEmprestimo/PCadastroEmprestimo'
import PAtualizarAluno from './pages/PAtualizar/PAtualizarAluno/PAtualizarAluno'
import PAtualizarLivro from './pages/PAtualizar/PAtualizarLivro/PAtualizarLivro'
import PAtualizarEmprestimo from './pages/PAtualizar/PAtualizarEmprestimo/PAtualizarEmprestimo'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} />
        
        {/* Rotas Protegidas */}
        <Route path='/aluno' element={<ProtectedRoute><PListaAluno /></ProtectedRoute>} />
        <Route path='/livro' element={<ProtectedRoute><PListaLivro /></ProtectedRoute>} />
        <Route path='/emprestimo' element={<ProtectedRoute><PListaEmprestimo /></ProtectedRoute>} />
        
        <Route path='/cadastro/aluno' element={<ProtectedRoute><PCadastroAluno /></ProtectedRoute>} />
        <Route path='/cadastro/livro' element={<ProtectedRoute><PCadastroLivro /></ProtectedRoute>} />
        <Route path='/cadastro/emprestimo' element={<ProtectedRoute><PCadastroEmprestimo /></ProtectedRoute>} />
        
        <Route path='/atualizar/aluno/:id' element={<ProtectedRoute><PAtualizarAluno /></ProtectedRoute>} />
        <Route path='/atualizar/livro/:id' element={<ProtectedRoute><PAtualizarLivro /></ProtectedRoute>} />
        <Route path='/atualizar/emprestimo/:id' element={<ProtectedRoute><PAtualizarEmprestimo /></ProtectedRoute>} />
        
        <Route path='/login' element={<PLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
