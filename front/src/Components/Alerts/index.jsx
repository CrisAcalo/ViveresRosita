const Alerts = (props) => {
    const styles = {
        success: 'border-green-500 text-green-500 bg-green-100',
        error: 'border-red-500 text-red-500 bg-red-100',
        warning: 'border-yellow-500 text-yellow-500 bg-yellow-100',
        info: 'border-blue-500 text-blue-500 bg-blue-100'
    }

    return (
        <div className={`border-2 font-bold rounded-lg p-4 w-72 md:w-96 mb-4 ${styles[props.type]}`}>
            {props.children}
        </div>
    );
}

export default Alerts;