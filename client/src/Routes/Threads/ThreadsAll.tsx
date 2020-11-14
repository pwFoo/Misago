import { t } from "@lingui/macro"
import { useLingui } from "@lingui/react"
import React from "react"
import LoadMoreButton from "../../UI/LoadMoreButton"
import RouteLoader from "../../UI/RouteLoader"
import WindowTitle from "../../UI/WindowTitle"
import { useForumStatsContext, useSettingsContext } from "../../Context"
import { ThreadsHeaderAll } from "./ThreadsHeader"
import ThreadsLayout from "./ThreadsLayout"
import ThreadsList from "./ThreadsList"
import { ThreadsModeration, useThreadsModeration } from "./ThreadsModeration"
import ThreadsToolbar from "./ThreadsToolbar"
import { useThreadsQuery } from "./useThreadsQuery"
import useThreadsSelection from "./useThreadsSelection"

const ThreadsAll: React.FC = () => {
  const { i18n } = useLingui()

  const forumStats = useForumStatsContext()
  const settings = useSettingsContext()
  const { data, error, loading, update, fetchMoreThreads } = useThreadsQuery()
  const { threads } = data || { threads: null }

  const selection = useThreadsSelection(threads?.items || [])
  const moderation = useThreadsModeration(selection.selected)

  if (!forumStats || !settings) return <RouteLoader />

  const isIndex = settings.forumIndexThreads

  return (
    <ThreadsLayout className="route-threads">
      <WindowTitle
        index={isIndex}
        title={i18n._("threads.title", t`Threads`)}
        alerts={update.threads}
      />
      <ThreadsHeaderAll settings={settings} stats={forumStats} />
      <ThreadsToolbar />
      <ThreadsList
        error={error}
        loading={loading}
        selectable={!!moderation}
        selection={selection}
        threads={threads}
        update={update}
      />
      <LoadMoreButton
        data={threads}
        loading={loading}
        onEvent={fetchMoreThreads}
      />
      <ThreadsModeration moderation={moderation} selection={selection} />
    </ThreadsLayout>
  )
}

export default ThreadsAll
