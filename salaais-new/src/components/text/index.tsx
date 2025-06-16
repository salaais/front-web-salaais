import { useState } from "react";
import type { EnumType } from "../../global";
import { Color } from "../../global/types/color";
import { Size } from "../../global/types/size";
import * as Styled from "./style"


export interface TextProps {
  id?: string
  text?: string
  size?: EnumType<typeof Size>
  title?: boolean
  space?: number
  bold?: boolean
  link?: boolean
  href?: string
  center?: boolean
  color?: EnumType<typeof Color>
  maxW?: string
  responsive?: boolean
  responsiveW?: string
  textLimit?: number
  showMore?: boolean,
  coloredParts?: { text: string; color: EnumType<typeof Color> }[]
}

export function Text({
  id,
  text = "text",
  size,
  title = false,
  bold = false,
  link = false,
  href,
  center = false,
  color,
  maxW,
  responsive,
  textLimit,
  showMore = false,
  coloredParts = [],
}: TextProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => setIsExpanded(prev => !prev)

  const truncateText = (text: string, limit: number | undefined) => {
    if (!limit || isExpanded || text.length <= limit) return text
    return `${text.substring(0, limit)}`
  }

  const displayText = truncateText(text, textLimit)

  const renderTextWithColors = () => {
    if (!coloredParts.length) {
      return (
        <>
          {displayText}
          {showMore && textLimit && text.length > textLimit && (
            <span
              style={{
                cursor: "pointer",
                color: color ?? Color.Blue,
                marginLeft: "5px",
                fontWeight: "600",
              }}
              onClick={handleToggle}
            >
              {isExpanded ? "menos" : "mais..."}
            </span>
          )}
        </>
      )
    }

    // Se tiver partes coloridas (não recomendado para truncado + showMore), renderize com cores:
    let lastIndex = 0
    return (
      <>
        {coloredParts.map(({ text, color }) => {
          const startIndex = displayText.indexOf(text, lastIndex)
          if (startIndex !== -1) {
            const beforeText = displayText.slice(lastIndex, startIndex)
            lastIndex = startIndex + text.length
            return (
              <>
                <span>{beforeText}</span>
                <span style={{ color }}>{text}</span>
              </>
            )
          }
          return null
        })}
        <span>{displayText.slice(lastIndex)}</span>
      </>
    )
  }

  // Estilizações iguais às anteriores
  if (title) {
    return (
      <Styled.Title id={id} size={size} center={center} color={color}>
        {renderTextWithColors()}
      </Styled.Title>
    )
  }

  if (link) {
    return (
      <Styled.A
        id={id}
        size={size}
        href={href}
        color={color}
        target="_blank"
        rel="noopener noreferrer"
      >
        {renderTextWithColors()}
      </Styled.A>
    )
  }

  return (
    <Styled.Text
      id={id}
      size={size}
      bold={bold}
      center={center}
      color={color}
      maxW={maxW}
      responsive={responsive}
    >
      {renderTextWithColors()}
    </Styled.Text>
  )
}
