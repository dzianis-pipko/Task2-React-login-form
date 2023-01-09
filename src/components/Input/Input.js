import React, { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

export const Input = forwardRef(({className, error, ...props}, ref) => {
    return (
        <div className={cn(className, styles.inputWrapper)}>
            <input ref={ref} className={cn(styles.input, {
                [styles.error]: error,
            })} {...props} />
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    )
})