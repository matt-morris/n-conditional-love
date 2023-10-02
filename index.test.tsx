import { describe, expect, it } from "vitest"
import { Query, Builder } from "./index"
import { render, screen } from "@testing-library/react"

describe(Query, () => {
  const collection = [
    {
      name: "apple",
      type: "fruit",
      color: { primary: "red", secondary: "green" },
    },
    { name: "banana", type: "fruit", color: { primary: "yellow" } },
    { name: "carrot", type: "vegetable", color: { primary: "orange" } },
  ]
  const query = new Query()
  query.addRule({ field: "type", operator: "==", value: "fruit" })
  query.addRule({
    logicalOperator: "OR",
    rules: [
      { field: "color.primary", operator: "==", value: "red" },
      { field: "color.secondary", operator: "==", value: "green" },
    ],
  })

  it("does the thing", () => {
    expect(query.execute(collection)).toEqual([
      {
        name: "apple",
        type: "fruit",
        color: { primary: "red", secondary: "green" },
      },
    ])
  })
})

describe(Builder, () => {
  it("can render", () => {
    render(<Builder />)

    expect(screen.getByText("ohai")).toBeInTheDocument()
  })
})
