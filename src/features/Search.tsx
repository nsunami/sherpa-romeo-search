import { useCallback, useEffect, useRef, useState } from "react"
import { JournalCard } from "../components/JournalCard"
import { getSherpaData } from "../api/getSherpaData"
import { useDebounce } from "../hooks/useDebounce"
import { SherpaParamsType, SherpaPublicationDataType } from "../api/sherpaTypes"

export function Search() {
  const DEFAULT_QUERY_LIMIT = 30

  const [journals, setJournals] = useState<SherpaPublicationDataType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState("")
  const queryOffset = useRef(0)
  const queryLimit = useRef(DEFAULT_QUERY_LIMIT)
  const cardRef = useCallback((card: HTMLDivElement) => {
    if (card == null || queryOffset.current == null) return

    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        queryOffset.current = queryOffset.current + queryLimit.current
        getSherpaData(
          (res) => {
            setJournals((current) => [...current, ...res.data.items])
            setIsLoading(false)
          },
          {
            filter: query ? `[["title", "contains word", "${query}*"]]` : "",
            offset: queryOffset.current,
            limit: queryLimit.current,
          } as SherpaParamsType
        )
        observer.unobserve(card)
      }
    })

    observer.observe(card)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getSherpaData(
      (res) => {
        setJournals(res.data.items)
        setIsLoading(false)
      },
      { limit: 30 } as SherpaParamsType
    )
  }, [])

  useDebounce(
    () => {
      setIsLoading(true)
      getSherpaData(
        (res) => {
          setJournals(res.data.items)
          setIsLoading(false)
        },
        {
          limit: 30,
          filter: query ? `[["title", "contains word", "${query}*"]]` : "",
        } as SherpaParamsType
      )
    },
    500,
    [query]
  )

  return (
    <>
      <section>
        <label htmlFor="search-query"></label>
        <input
          className="my-6 min-w-80 border-b-2 p-1"
          placeholder="Journal"
          type="text"
          name="search-query"
          id="search-query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </section>
      <section className="m-1 grid gap-1 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? "Loading..."
          : journals.length === 0
            ? "No results found"
            : journals.map((journal, index) => {
                return (
                  <JournalCard
                    key={journal.id}
                    {...journal}
                    ref={index === journals.length - 1 ? cardRef : undefined}
                  />
                )
              })}
      </section>
    </>
  )
}
