import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";

export default function SelectedNotification({isOpen, closeNotification, title, description, acceptOnClick}) {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                    onClose={closeNotification}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0"/>
                        </Transition.Child>

                        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title as="h3"
                                              className="text-3xl mb-4 font-medium leading-9 text-sis-white text-center font-phenomenaBold">
                                    <div className="border bg-sis-yellow rounded-xl p-6">
                                        {title}
                                    </div>
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                        {description}
                                    </p>
                                </div>
                                <Dialog.Title className="text-3xl mb-4 font-medium leading-9 text-sis-white text-center font-phenomenaBold">
                                    <button
                                        onClick={closeNotification}
                                        type="submit"
                                        className="mt-4 mr-28 font-phenomenaBold float-right ml-2 py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-fail hover:bg-sis-darkblue"
                                    >
                                        HAYIR
                                    </button>
                                    <button
                                        onClick={acceptOnClick}
                                        type="submit"
                                        className="mt-4 font-phenomenaBold float-right py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                                    >
                                        EVET
                                    </button>
                                </Dialog.Title>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
