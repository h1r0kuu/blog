import { Box, BoxProps, styled } from "@mui/material"
import { FC } from "react"

const StyledBox = styled(Box)<{
  textTransformStyle?: any
  ellipsis?: boolean
}>(({ textTransformStyle, ellipsis }) => ({
  textTransform: textTransformStyle || "none",
  whiteSpace: ellipsis ? "nowrap" : "normal",
  overflow: ellipsis ? "hidden" : "",
  textOverflow: ellipsis ? "ellipsis" : "",
}))

type Props = {
  ellipsis?: boolean
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | "initial" | "inherit"
}

export const Small: FC<BoxProps & Props> = ({ children, className, ellipsis, textTransform, ...props }) => {
  return (
    <StyledBox
      style={{
        textTransform: textTransform,
      }}
      ellipsis={ellipsis}
      className={className}
      component="small"
      fontSize="12px"
      fontWeight="500"
      lineHeight="1.5"
      {...props}
    >
      {children}
    </StyledBox>
  )
}

export const Tiny: FC<BoxProps & Props> = ({ children, className, ellipsis, textTransform, ...props }) => {
  return (
    <StyledBox
      style={{
        textTransform: textTransform,
      }}
      ellipsis={ellipsis}
      className={className}
      component="small"
      fontSize="11px"
      lineHeight="1.5"
      {...props}
    >
      {children}
    </StyledBox>
  )
}
