import { useCallback, useEffect, useRef, useState } from "react"
import { JournalCard } from "../components/JournalCard"
import { getSherpaData } from "../api/getSherpaData"
import { useDebounce } from "../hooks/useDebounce"
import { SherpaParamsType, SherpaPublicationDataType } from "../api/sherpaTypes"
import { JournalCardSkeleton } from "../components/JournalCardSkeleton"

export function Search() {
  const DEFAULT_QUERY_LIMIT = 20
  const DEFAULT_QUERY_OFFSET = 0

  const [journals, setJournals] = useState<SherpaPublicationDataType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [query, setQuery] = useState("")
  const queryOffset = useRef(DEFAULT_QUERY_OFFSET)
  const queryLimit = useRef(DEFAULT_QUERY_LIMIT)

  const cardRef = useCallback(
    (card: HTMLDivElement) => {
      if (card == null || queryOffset.current == null) return

      const observer = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          queryOffset.current = queryOffset.current + queryLimit.current
          setIsLoadingMore(true)
          getSherpaData(
            (res) => {
              setJournals((current) => [...current, ...res.data.items])
              setIsLoading(false)
              setIsLoadingMore(false)
            },
            {
              offset: queryOffset.current,
              limit: queryLimit.current,
            } as SherpaParamsType,
            query
          )
          observer.unobserve(card)
        }
      })

      observer.observe(card)
    },
    [query]
  )

  useEffect(() => {
    setIsLoading(true)
    getSherpaData(
      (res) => {
        setJournals(res.data.items)
        setIsLoading(false)
      },
      {
        offset: queryOffset.current,
        limit: DEFAULT_QUERY_LIMIT,
      } as SherpaParamsType
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
          limit: DEFAULT_QUERY_LIMIT,
        } as SherpaParamsType,
        query
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
      <section className="m-1">
        {isLoading ? (
          <div className="text-center">
            <p>
              <a
                className="text-xs "
                href="https://giphy.com/gifs/chubbiverse-chubbicorns-chubbicorn-chubbifrens-PPgZCwZPKrLcw75EG1"
              >
                via GIPHY
              </a>
            </p>
            <iframe
              src="https://giphy.com/embed/PPgZCwZPKrLcw75EG1"
              width="480"
              height="270"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
            <span className="animate-pulse text-5xl">Loading...</span>
          </div>
        ) : journals.length === 0 ? (
          <div className="text-center">
            <p>
              <a
                className="text-xs "
                href="https://giphy.com/gifs/originals-crickets-l2QZXWjNkWvgx569i"
              >
                via GIPHY
              </a>
            </p>
            <iframe
              src="https://giphy.com/embed/l2QZXWjNkWvgx569i"
              width="480"
              height="270"
              className="giphy-embed"
              allowFullScreen
            ></iframe>

            <span className="text-5xl">No results found</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-4">
            {journals.map((journal, index) => {
              return (
                <JournalCard
                  key={journal.id}
                  {...journal}
                  ref={index === journals.length - 1 ? cardRef : undefined}
                />
              )
            })}
            {isLoadingMore &&
              Array.from(
                { length: DEFAULT_QUERY_LIMIT },
                (_, index) => index
              ).map((n) => <JournalCardSkeleton key={n} />)}
          </div>
        )}
      </section>
    </>
  )
}
