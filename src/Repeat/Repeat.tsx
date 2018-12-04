import React, { Fragment, FunctionComponent, ReactElement } from 'react'

export interface RepeatProps {
  times: number
  children: ReactElement<{}>
}

const Repeat: FunctionComponent<RepeatProps> = ({
  times,
  children,
}: RepeatProps): ReactElement<{}> => {
  return (
    <>
      {Array(times)
        .fill(0)
        .map((_: number, i: number) => (
          <Fragment key={i}>{children}</Fragment>
        ))}
    </>
  )
}

export default Repeat
