const cssClasses = {
    base: 'outline-none',
    general: 'inset-0 fixed w-screen h-screen flex flex-col items-center overflow-hidden z-40',
    container: 'border rounded-lg shadow-lg overflow-auto relative z-50 w-5/6 sm:is-lg',
    header: 'flex border-b border-gray-400 bg-gray-200 p-4',
    body: 'border-b border-gray-400 bg-white p-4',
    footer: 'bg-gray-100 p-4',
    close: 'flex-grow-0 cursor-pointer text-gray-500 hover:text-gray-600',
    backdrop: 'fixed absolute inset-0 bg-black opacity-75',
    sizeXs: 'text-xs w-2/5',
    sizeSm: 'text-sm w-1/2',
    sizeMd: 'text-base w-3/5',
    sizeLg: 'text-base w-4/5',
};

export default cssClasses;
