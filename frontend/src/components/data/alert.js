import Swal from "sweetalert2"

const lockScroll = () => {
    document.body.dataset.savedOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
}

const unlockScroll = () => {
    const savedOverflow = document.body.dataset.savedOverflow
    document.body.style.overflow = savedOverflow || 'auto'
    delete document.body.dataset.savedOverflow
}

export const alertSuccess = async (message) => {
    return Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
        confirmButtonColor: '#00a7f2',
        showConfirmButton: false,
        timer: 900,
        scrollbarPadding: false,
        heightAuto: false,
        didOpen: lockScroll,
        willClose: unlockScroll
    })
}

export const alertError = async (message) => {
    return Swal.fire({
        icon: 'error',
        title: 'Ups',
        text: message,
        confirmButtonColor: '#00a7f2',
        scrollbarPadding: false,
        heightAuto: false,
        didOpen: lockScroll,
        willClose: unlockScroll
    })
}