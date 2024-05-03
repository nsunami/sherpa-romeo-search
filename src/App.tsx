import { Search } from "./features/Search"
import "./styles.css"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center bg-slate-300 align-middle">
      <section className="mt-5">
        <a href="/">Sherpa Romeo Explorer</a>
      </section>

      <Search />
    </div>
  )
}

export default App
