import { Ref, forwardRef, useRef } from "react"
import { SherpaPublicationDataType } from "../api/sherpaTypes"

export function JournalCardInner(
  {
    title,
    publishers,
    url,
    listed_in_doaj,
    publisher_policy,
    issns,
  }: SherpaPublicationDataType,
  ref: Ref<HTMLDivElement>
) {
  const firstTitle = useRef(title[0]?.title)

  return (
    <div
      ref={ref}
      className="relative m-1 min-h-36 rounded-md border bg-slate-50 p-1"
    >
      <h1 className="font-bold">
        <a href={url} target="_blank" rel="noopener noreferrer">
          {firstTitle.current}
        </a>
      </h1>
      <div className="text-gray-500">
        {publishers.map((publisher, index) => {
          return (
            <span key={publisher.publisher.id}>
              <a
                href={publisher.publisher.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {publisher.publisher.name[0].name}
              </a>
              {index < publishers.length - 1 ? ", " : ""}
            </span>
          )
        })}
      </div>
      <div className="my-1 border-t-2"></div>
      <div data-publisher-policy className="text-gray-500">
        {publisher_policy.map((policy) => {
          return (
            <div
              key={policy.id}
              className="overflow-hidden text-ellipsis text-nowrap text-gray-500"
              title={policy.internal_moniker}
            >
              <a href={policy.uri} target="_blank" rel="noopener noreferrer">
                {policy.publication_count + 1}: {policy.internal_moniker}
              </a>
            </div>
          )
        })}
      </div>
      <div className="absolute bottom-1 right-1">
        <button
          className={`rounded-md border ${listed_in_doaj === "yes" ? "bg-green-100 hover:bg-green-300" : "bg-gray-400 text-gray-200"} px-2 text-sm`}
          disabled={listed_in_doaj === "no"}
        >
          {listed_in_doaj === "yes" ? (
            <a
              href={`https://doaj.org/toc/${issns[0].issn}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              💚 On DOAJ
            </a>
          ) : (
            "Not on DOAJ"
          )}
        </button>
      </div>
    </div>
  )
}

export const JournalCard = forwardRef(JournalCardInner)
