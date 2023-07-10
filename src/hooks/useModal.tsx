import { useState } from "react";

export const useModal = () => {
    const [open, setOpen] = useState(false);
    const closeModal: (() => void) = () => {
        setOpen(false);
    }
    const openModal:(() => void) = () => {
        setOpen(true);
    }
    return [
        open,
        openModal,
        closeModal
    ]
}