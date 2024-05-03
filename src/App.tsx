import { Search } from "./features/Search"
import "./styles.css"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center bg-slate-300 align-middle">
      <section>Sherpa Romeo Explorer</section>
      <Search />
    </div>
  )
}

export default App
