import { t } from "@lingui/macro"
import { useLingui } from "@lingui/react"
import React from "react"
import ValidationError from "./ValidationError"
import { IValidationErrorProps } from "./ValidationError.types"

const ERROR_TYPES_MAP: Record<string, string> = {
  required: "value_error.missing",
}

const PostValidationError: React.FC<IValidationErrorProps> = ({
  children,
  error,
  messages,
  value = 0,
  min = 0,
  max = 0,
}) => {
  const { i18n } = useLingui()

  if (!error) return null

  const errorType = ERROR_TYPES_MAP[error.type] || error.type
  if (messages && messages[errorType]) {
    return children({ type: errorType, message: messages[errorType] })
  }

  switch (errorType) {
    case "auth_error.not_moderator":
      return children({
        type: errorType,
        message: i18n._(
          "auth_error.not_moderator.post",
          t`You can't moderate this post.`
        ),
      })

    case "auth_error.category.closed":
      return children({
        type: errorType,
        message: i18n._(
          "auth_error.post_category.closed",
          t`This post's category is closed.`
        ),
      })

    case "auth_error.thread.closed":
      return children({
        type: errorType,
        message: i18n._(
          "auth_error.thread.closed",
          t`This post's thread is closed.`
        ),
      })

    case "auth_error.post.not_author":
      return children({
        type: errorType,
        message: i18n._(
          "auth_error.post.not_author",
          t`You need to be this post's author to perform this action.`
        ),
      })

    case "value_error.post.thread_start":
      return children({
        type: errorType,
        message: i18n._(
          "value_error.post.thread_start",
          t`This post is thread's original post.`
        ),
      })

    case "value_error.post.not_exists":
      return children({
        type: errorType,
        message: i18n._(
          "value_error.post.not_exists",
          t`Post could not be found.`
        ),
      })
  }

  return (
    <ValidationError error={error} value={value} min={min} max={max}>
      {children}
    </ValidationError>
  )
}

export default PostValidationError
