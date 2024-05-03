import { Fragment, Ref, forwardRef, useMemo, useRef } from "react"
import { SherpaPublicationDataType } from "../api/sherpaTypes"

export function JournalCardInner(
  {
    title,
    publishers,
    url,
    listed_in_doaj,
    publisher_policy,
    issns,
    system_metadata,
  }: SherpaPublicationDataType,
  ref: Ref<HTMLDivElement>
) {
  const firstTitle = useRef(title[0]?.title)

  const oaPermitted = useMemo(
    () => [
      ...new Set(
        publisher_policy?.flatMap((p) => {
          return p.permitted_oa?.flatMap((oa) => {
            return oa.article_version_phrases?.flatMap((p) => p.phrase)
          })
        })
      ),
    ],
    [publisher_policy]
  )
  return (
    <div
      ref={ref}
      className="m-1 flex min-h-36 flex-col rounded-md border bg-slate-50 p-1"
    >
      <div data-card-header>
        <h1 className="font-bold">
          <a
            href={system_metadata.uri}
            target="_blank"
            rel="noopener noreferrer"
          >
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
      </div>
      <div data-card-body className="flex-grow">
        <div data-publisher-policy className="text-gray-500">
          Open Access possible with:
          <ul className="list-none text-gray-800">
            {oaPermitted.map((i, index) => (
              <li key={index}>
                {i === "Submitted"
                  ? "💌 Submitted"
                  : i === "Accepted"
                    ? "✅ Accepted"
                    : i === "Published"
                      ? "📙 Published"
                      : ""}{" "}
                version
              </li>
            ))}
          </ul>
          <div className="mt-2 overflow-hidden text-ellipsis text-nowrap text-sm text-gray-500">
            Policies:{" "}
            {publisher_policy.map((policy) => {
              return (
                <Fragment key={policy.id}>
                  <div className="overflow-hidden text-ellipsis">
                    <a
                      href={policy.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      📝 {policy.internal_moniker}
                    </a>
                  </div>
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
      <div data-card-footer className="flex items-end justify-between">
        <div className=" text-xs text-gray-500">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {issns[0].issn}
          </a>
        </div>
        <div className=" bottom-1 right-1">
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
    </div>
  )
}

export const JournalCard = forwardRef(JournalCardInner)
