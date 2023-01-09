import styles from './Button.module.css';
import cn from 'classnames';

export const Button = ({apperance, children, className, ...props}) => {
    return (
        <button className={cn(styles.button, className, {
            [styles.primary]: apperance === 'primary'
        })}
        {...props}
        >
            {children}
        </button>
    )
}