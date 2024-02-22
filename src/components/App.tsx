import Autocomplete from './Autocomplete'

function App() {
  return (
    <main className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto max-w-5xl">
        <header>
          <h1 className="mb-2 text-6xl text-deelBlue">
            The best performing Pokémon finder.
          </h1>
          <p className="text-lg text-slate-800">
            Type the pokemon name in the input below to search for a pokemon.
          </p>
        </header>
        <Autocomplete />
      </div>
    </main>
  )
}

export default App
