import HomePage from '@/pages/home-page'
import MatchGeneratePage from '@/pages/match-generate-page'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:matchId" element={<MatchGeneratePage />} />
    </Routes>
  )
}

export default App
