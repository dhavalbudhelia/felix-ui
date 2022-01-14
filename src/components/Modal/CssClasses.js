const cssClasses = {
    base: 'outline-none',
    general: 'inset-0 fixed w-screen h-screen flex flex-col items-center overflow-hidden z-40',
    container: 'border rounded-lg shadow-lg overflow-auto relative z-50 w-full sm:is-lg',
    header: 'flex border-b border-gray-400 bg-gray-200 p-4',
    body: 'border-b border-gray-400 bg-white p-4',
    footer: 'bg-gray-100 p-4',
    close: 'flex-grow-0 cursor-pointer text-gray-500 hover:text-gray-600',
    backdrop: 'fixed absolute inset-0 bg-black opacity-75',
    sizeXs: 'text-xs',
    sizeSm: 'text-sm',
    sizeMd: 'text-base',
    sizeLg: 'text-lg',
};

export default cssClasses;
