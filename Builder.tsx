import React, { useState } from "react"
import { Query } from "./Query"
import type { Rule } from "./Query"

export function Builder({
  children,
  rules = [],
  collection = [],
  ...props
}: BuilderProps) {
  const [query, setQuery] = useState(rules)

  const addRule = (rule: Rule) => setQuery([...query, rule])
  const removeRule = (index: number) => {
    const newQuery = [...query]
    newQuery.splice(index, 1)
    setQuery(newQuery)
  }

  const execute = () => {
    const query = new Query()
    query.addRules(rules)
    return query.execute(collection)
  }

  return (
    <>
      {React.Children.only(children)?.({
        query,
        addRule,
        removeRule,
        execute,
        ...props,
      })}
    </>
  )
}

export default Builder

export type BuilderChildProps = {
  query: Rule[]
  addRule: (rule: Rule) => void
  removeRule: (index: number) => void
  execute: () => any[]
}

export type BuilderProps = {
  children?: (props: BuilderChildProps) => React.ReactElement
  rules?: Rule[]
  collection?: any[]
}
