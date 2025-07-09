import { useState, forwardRef } from "react";

import image from '../../assets/images'

const Image = forwardRef(({src, alt, fallback: customFallback = image.avatar,  ...props}, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback)
    }

    return ( 
        <img ref={ref} src={fallback || src} alt={alt} {...props} onError={handleError}/>
    );
})

export default Image;