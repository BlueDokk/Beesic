import Input from '../components/common/input';

export const Form = () => {

    const renderButton = (label, btnForm, btnClass, type, onClick )=> {
        return <button
            // disabled={this.validate()}
            type={type}
            className={`btn btn-${btnForm} btn-${btnClass} m-2`}
            onClick={onClick}
        >{label}
        </button>
    };

    const renderInput = (name, placeholder, type = 'text', onChange, error, ...rest)=>{
        return (
            <Input
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                error = {error}
                {...rest}
            />
        )
    };

    return { 
        renderButton,
        renderInput,
    };
}


