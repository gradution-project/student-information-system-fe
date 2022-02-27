import {FingerPrintIcon} from "@heroicons/react/outline";
import {Fragment, useState} from "react";
import {useRouter} from "next/router";
import {Dialog, Transition} from "@headlessui/react";
import SISTitle from "../../../../../public/components/page-titles";
import PageNotFound from "../../../../404";

export async function getServerSideProps({query}) {
    const SIS_API_URL = process.env.SIS_API_URL;
    const {operationId} = query;
    const passwordOperationResponse = await fetch(`${SIS_API_URL}/student/password-operation?operationId=${operationId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const passwordOperationData = await passwordOperationResponse.json();
    return {
        props: {
            isDataFound: passwordOperationData.success,
            SIS_API_URL: SIS_API_URL,
            operationId: operationId
        }
    }
}

export default function StudentForgotPassword({isDataFound, SIS_API_URL, operationId}) {

    if (!isDataFound) {
        return (
            <PageNotFound user=""/>
        )
    }

    const router = useRouter();

    let [isOpenSuccess, setIsOpenSuccess] = useState(false);

    function closeSuccessModal() {
        setIsOpenSuccess(false);
        router.push("/login/student");
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

    let [isOpenPasswordsNotMatched, setIsPasswordsNotMatched] = useState(false);

    function closePasswordsNotMatchedModal() {
        setIsPasswordsNotMatched(false);
    }

    function openPasswordsNotMatchedModal() {
        setIsPasswordsNotMatched(true);
    }

    const [newPassword, setNewPassword] = useState();
    const changeNewPassword = event => {
        const newPassword = event.target.value;
        setNewPassword(newPassword);
    }

    const [newPasswordRepeat, setNewPasswordRepeat] = useState();
    const changeNewPasswordRepeat = event => {
        const newPasswordRepeat = event.target.value;
        setNewPasswordRepeat(newPasswordRepeat);
    }

    const studentForgotPassword = async (event) => {
        openProcessingModal();

        event.preventDefault();

        if (newPassword === newPasswordRepeat) {
            const res = await fetch(`${SIS_API_URL}/student/password-operation/change-password`, {
                body: JSON.stringify({
                    operationId: operationId,
                    newPassword: newPassword,
                    newPasswordRepeat: newPasswordRepeat
                }),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            });
            const data = await res.json();
            if (!data.success) {
                closeProcessingModal();
                openFailModal();
            } else if (data.response.passwordChanged) {
                closeProcessingModal();
                openSuccessModal();
            } else {
                closeProcessingModal();
                openFailModal();
            }
        } else {
            closeProcessingModal();
            openPasswordsNotMatchedModal();
        }
    }

    return (
        <>
            <div className="bg-sis-gray h-screen">
                <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <SISTitle/>
                    <div className="sm:mt-0">
                        <img
                            className="h-28 w-auto mb-16"
                            src="https://i.hizliresim.com/em7bd2l.png"
                            alt="Workflow"
                        />
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <div className="md:col-span-1 ">
                                    <div className="px-4 sm:px-0">
                                    </div>
                                </div>
                                <form className="px-4 max-w-2xl mx-auto space-y-6"
                                      onSubmit={studentForgotPassword}>

                                    <div className="shadow overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <h2 className="mt-8 font-phenomenaExtraBold text-center text-5xl text-sis-darkblue mb-6">
                                                ŞİFRE BELİRLEME
                                            </h2>
                                        </div>
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="grid grid-cols-1 gap-6">
                                                <div className="sm:col-span-1">
                                                    <label htmlFor="first-name"
                                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                        YENİ ŞİFRE
                                                    </label>
                                                    <input
                                                        onChange={changeNewPassword}
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        autoComplete="current-password"
                                                        required
                                                        className="font-phenomenaRegular text-sis-yellow mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md focus:text-sis-darkblue"
                                                    />
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label htmlFor="first-name"
                                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                        YENİ ŞİFRE (TEKRAR)
                                                    </label>
                                                    <input
                                                        onChange={changeNewPasswordRepeat}
                                                        id="password-repeat"
                                                        name="password-repeat"
                                                        type="password"
                                                        autoComplete="current-password"
                                                        required
                                                        className="font-phenomenaRegular text-sis-yellow mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md focus:text-sis-darkblue"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="px-4 py-3 text-right sm:px-6">

                                            <div>
                                                <button
                                                    type="submit"
                                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sis-yellow hover:bg-sis-yellow"
                                                >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FingerPrintIcon
                    className="h-5 w-5 text-sis-white group-hover:text-sis-white"
                    aria-hidden="true"/>
                </span>
                                                    <a className="font-phenomenaBold text-lg">Yeni Şifreyi Kaydet</a>
                                                </button>
                                            </div>
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
                                                                <div
                                                                    className="border bg-sis-success rounded-xl p-6">
                                                                    Şifre Değiştirme İsteğiniz Başarılı!
                                                                </div>
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                                    Mail Adresinize gönderilen şifre ile
                                                                    hesabınıza giriş
                                                                    yapabilirsiniz.
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
                                                                <div
                                                                    className="border bg-sis-fail rounded-xl p-6">
                                                                    Şifre Değiştirme İsteğiniz Başarısız!
                                                                </div>
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                                    Öğrenci Numaranızı kontrol ediniz.
                                                                    Öğrenci Numaranızı doğru girdiyseniz
                                                                    sistemsel bir
                                                                    hatadan dolayı isteğiniz sonuçlandıralamamış
                                                                    olabilir.
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

                                        <Transition appear show={isOpenPasswordsNotMatched} as={Fragment}>
                                            <Dialog
                                                as="div"
                                                className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                                onClose={closePasswordsNotMatchedModal}
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
                                                                <div
                                                                    className="border bg-sis-fail rounded-xl p-6">
                                                                    Girmiş Olduğunuz Parolalar Eşleşmiyor!
                                                                </div>
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                                    Lütfen girdiğiniz parolaları kontrol ediniz ve
                                                                    parolaların eşleştiğinden emin olunuz.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Transition.Child>
                                                </div>
                                            </Dialog>
                                        </Transition>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
