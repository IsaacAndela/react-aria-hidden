import React, { FunctionComponent } from 'react'

const isFocusable = (element: React.ReactHTMLElement<HTMLElement>): boolean => {
  return (
    ['a', 'button', 'textarea', 'input', 'select', 'iframe', 'area'].includes(
      element.type,
    ) ||
    (element.props.tabIndex !== undefined && element.props.tabIndex >= 0)
  )
}

const isReactHtmlElement = (
  element: React.ReactElement,
): element is React.ReactHTMLElement<HTMLElement> => {
  return typeof element.type === 'string'
}

const makeUnfocusable = (reactNode: React.ReactNode): React.ReactNode => {
  let nodeModified = false

  const newReactNode = React.Children.map(reactNode, node => {
    if (!React.isValidElement<{ children?: React.ReactNode }>(node)) {
      return node
    }

    let childrenModified = false

    const children = React.Children.map(node.props.children, child => {
      const newChild = makeUnfocusable(child)

      if (newChild !== child) {
        childrenModified = true
      }

      return newChild
    })

    if (isReactHtmlElement(node) && isFocusable(node)) {
      nodeModified = true
      return React.cloneElement<{
        tabIndex?: number
        focusable?: boolean
      }>(
        node,
        {
          tabIndex: -1,
          focusable: false, // For IE
        },
        children,
      )
    }

    if (!childrenModified) {
      return node
    }

    nodeModified = true

    return React.cloneElement(node, undefined, children)
  })

  return nodeModified ? newReactNode : reactNode
}

type Props = {
  'aria-hidden'?: boolean
  children: React.ReactNode
  as?: string
  [key: string]: any
}

export const AriaHidden: FunctionComponent<Props> = props => {
  const { children, as = 'div', ...restProps } = props

  const { 'aria-hidden': hidden = false } = props

  return React.createElement(
    as,
    restProps,
    hidden ? makeUnfocusable(children) : children,
  )
}
