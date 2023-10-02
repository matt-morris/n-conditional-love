type RuleWithField = {
  field: string
  operator: string
  value: any
  logicalOperator?: LogicalOperator
  rules?: never
}

type RuleWithRules = {
  field?: never
  operator?: never
  value?: never
  logicalOperator: LogicalOperator
  rules: Rule[]
}

export type Rule = RuleWithField | RuleWithRules

type LogicalOperator = "AND" | "OR" | "NOT"

export class Query {
  private rules: Rule[] = []
  private logicalOperator: LogicalOperator = "AND"

  addRule(rule: Rule) {
    this.rules.push(rule)
  }

  addRules(rules: Rule[]) {
    this.rules.push(...rules)
  }

  setLogicalOperator(operator: LogicalOperator) {
    this.logicalOperator = operator
  }

  execute(collection: any[]): any[] {
    return collection.filter((item) =>
      this.evaluate(item, this.rules, this.logicalOperator),
    )
  }

  private resolveField(item: any, field: string): any {
    return field.split(".").reduce((obj, prop) => obj && obj[prop], item)
  }

  private evaluate(
    item: any,
    rules: Rule[],
    logicalOperator: LogicalOperator,
  ): boolean {
    return rules.reduce((acc, rule) => {
      const result = rule?.rules
        ? this.evaluate(item, rule.rules, rule.logicalOperator!)
        : this.compare(item, rule)
      return logicalOperator === "AND"
        ? acc && result
        : logicalOperator === "OR"
        ? acc || result
        : !result
    }, logicalOperator === "AND")
  }

  private compare(item: any, rule: RuleWithField): boolean {
    const { field, operator, value } = rule
    const fieldValue = this.resolveField(item, field!)

    switch (operator) {
      case "==":
        return fieldValue == value
      case ">":
        return fieldValue > value
      case "<":
        return fieldValue < value
      case "contains":
        return fieldValue.includes(value)
      default:
        throw new Error(`Unsupported operator: ${operator}`)
    }
  }
}
