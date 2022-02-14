import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import {Fragment, useState} from "react";
import Cookies from "universal-cookie";
import {Dialog, Transition} from "@headlessui/react";
import {useRouter} from "next/router";


export default function Faculty() {
    const cookies = new Cookies();

    const router = useRouter();

    const [operationUserId] = useState(cookies.get('officerNumber'));

    const [facultyName, setFacultyName] = useState();
    const changeFacultyName = event => {
        const facultyName = event.target.value;
        setFacultyName(facultyName);
    }

    let [isOpenSuccess, setIsOpenSuccess] = useState(false);

    function closeSuccessModal() {
        setIsOpenSuccess(false);
        router.push("/officer/operation/faculty").then(() => router.reload());
    }

    function openSuccessModal() {
        setIsOpenSuccess(true);
    }

    let [isOpenFail, setIsOpenFail] = useState(false);

    function closeFailModal() {
        setIsOpenFail(false);
    }

    function openFailModal() {
        setIsOpenFail(true);
    }

    let [isOpenProcessing, setIsOpenProcessing] = useState(false);

    function closeProcessingModal() {
        setIsOpenProcessing(false);
    }

    function openProcessingModal() {
        setIsOpenProcessing(true);
    }

    const facultySave = async (event) => {
        openProcessingModal();

        event.preventDefault();

        const saveRes = await fetch("http://localhost:8585/faculty/save", {
            body: JSON.stringify({
                facultyInfoRequest: {
                    name: facultyName
                },
                operationInfoRequest: {
                    userId: operationUserId
                }
            }),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        });
        const saveData = await saveRes.json();
        if (saveData.success) {
            closeProcessingModal();
            openSuccessModal()
        } else {
            closeProcessingModal();
            openFailModal();
        }
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <form className="select-none px-4 py-12 max-w-2xl mx-auto space-y-6" onSubmit={facultySave}>
                <div className="py-2 px-4 shadow overflow-hidden sm:rounded-md">
                    <div className="sm:col-span-6">
                        <label htmlFor="faculty-name"
                               className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                            FAKÜLTE İSMİ
                        </label>
                        <input
                            onChange={changeFacultyName}
                            type="text"
                            name="faculty-name"
                            id="faculty-name"
                            className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="px-4 py-3 text-right sm:px-6">
                        <button
                            type="submit"
                            className="font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                        >
                            KAYDET
                        </button>
                    </div>

                    <Transition appear show={isOpenSuccess} as={Fragment}>
                        <Dialog
                            as="div"
                            className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                            onClose={closeSuccessModal}
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

                                <span
                                    className="inline-block h-screen align-middle"
                                    aria-hidden="true"
                                >
              &#8203;
            </span>
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
                                        <Dialog.Title
                                            as="h3"
                                            className="text-3xl mb-4 font-medium leading-9 text-sis-white text-center font-phenomenaBold"
                                        >
                                            <div className="border bg-sis-success rounded-xl p-6">
                                                Fakülte Ekleme İşlemi Başarılı!
                                            </div>
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                Fakülte Ekleme İşlemi başarıyla gerçekleşti.
                                                Mesaj penceresini kapattıktan sonra fakülte listeleme
                                                ekranına yönlendirileceksiniz.
                                            </p>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>
                    <Transition appear show={isOpenFail} as={Fragment}>
                        <Dialog
                            as="div"
                            className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                            onClose={closeFailModal}
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

                                <span
                                    className="inline-block h-screen align-middle"
                                    aria-hidden="true"
                                >
              &#8203;
            </span>
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
                                        <Dialog.Title
                                            as="h3"
                                            className="text-3xl mb-4 font-medium leading-9 text-sis-white text-center font-phenomenaBold"
                                        >
                                            <div className="border bg-sis-fail rounded-xl p-6">
                                                Fakülte Ekleme İşlemi Başarısız!
                                            </div>
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                Lütfen girdiğiniz verileri kontrol ediniz.
                                                Verilerinizi doğru girdiyseniz sistemsel bir
                                                hatadan dolayı isteğiniz sonuçlandıralamamış olabilir.
                                            </p>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>

                    <Transition appear show={isOpenProcessing} as={Fragment}>
                        <Dialog
                            as="div"
                            className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                            onClose={closeProcessingModal}
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

                                <span
                                    className="inline-block h-screen align-middle"
                                    aria-hidden="true"
                                >
              &#8203;
            </span>
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
                                        <Dialog.Title
                                            as="h3"
                                            className="text-3xl font-medium leading-9 text-sis-yellow text-center font-phenomenaBold"
                                        >
                                            İsteğiniz İşleniyor...
                                        </Dialog.Title>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </form>
        </div>

    )
}