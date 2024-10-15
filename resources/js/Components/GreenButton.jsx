export default function GreenButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            { ...props }
            type={ type }
            className={
                `inline-flex items-center px-4 py-2 bg-green-500 border border-green-500 rounded-md font-semibold text-xs text-white uppercase tracking-widest shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={ disabled }
        >
            { children }
        </button>
    );
}
