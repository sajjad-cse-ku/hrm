import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

function FlashMessage({flash}) {

    const [message, setMessage] = useState(null);
    useEffect(() => {
        const types = ['success', 'error', 'warning', 'info'];

        for (const type of types) {
            if (flash[type]) {
                setMessage(flash[type]);
                setTimeout(() => {
                    setMessage(null);
                }, 2000);
                break;
            }
        }
    }, [flash]);

if(flash.success && message){
    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: 'success',
        title: flash.success,
        padding: '10px 20px',
    });
}else if(flash.info && message){
    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: 'info',
        title: flash.info,
        padding: '10px 20px',
    });
}else if(flash.warning && message){
    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: 'warning',
        title: flash.warning,
        padding: '10px 20px',
    });
}else if(flash.error && message){
    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
    });
    toast.fire({
        icon: 'error',
        title: flash.error,
        padding: '10px 20px',
    });
}

}

export default FlashMessage