import { useState, forwardRef } from "react";

const image = './image/avatar.jpeg'

const Image = forwardRef(({src, alt, fallback: customFallback = image,  ...props}, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback)
    }

    return ( 
        <img ref={ref} src={fallback || src} alt={alt} {...props} onError={handleError}/>
    );
})

export default Image;