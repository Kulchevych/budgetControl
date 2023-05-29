import React, { useEffect, useRef } from 'react';
import classes from './styles.module.scss';

export default function GraphDetail({
  name,
  count,
  color,
  top,
  left,
  handleClose,
}) {
  const dropdownRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleClose();
    }, 2000);

    return () => clearTimeout(timeout);
  })
  return (
    <div
      className={classes.GraphDetail}
      style={{
        top: top - 17,
        left,
      }}
      ref={dropdownRef}
    >
      <div className={classes.label}>
        <span className={classes.name}>{name}</span>
        <span className={classes.amount}>{count} грн</span>
      </div>

      <div
        className={classes.reference}
        style={{
          height: `${248 - top}px`,
          borderColor: color,
        }}
      />
    </div>
  );
}
