import { FC, ReactNode } from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg w-1/2">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-black p-2 m-2 hover:text-red-500">
                        X
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;