import { useEffect, useRef } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

import Suggestions from 'components/Suggestions'

const Autocomplete = () => {
  const iptRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    iptRef.current?.focus()
  }, [])

  return (
    <div className="relative">
      <div className="relative mt-8 flex items-center justify-between">
        <FiSearch className="size-10 stroke-slate-400" />
        <input
          ref={iptRef}
          maxLength={20}
          placeholder="Search for a pokemon"
          className="absolute z-10 w-full bg-transparent px-12 text-5xl text-slate-800 caret-slate-700 outline-none placeholder:text-slate-400 placeholder:text-opacity-15"
        />
        <button className="relative z-20">
          <FiX className="size-10 stroke-slate-700" />
        </button>
      </div>
      <Suggestions />
    </div>
  )
}
export default Autocomplete
