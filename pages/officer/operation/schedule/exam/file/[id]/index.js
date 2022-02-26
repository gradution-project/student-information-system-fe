import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";
import {useRouter} from "next/router";
import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import {getOfficerNumberWithContext} from "../../../../../../../public/storage/officer";
import UnauthorizedAccessPage from "../../../../../../401";

export async function getServerSideProps(context) {
    const officerId = getOfficerNumberWithContext(context)
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const SIS_API_URL = process.env.SIS_API_URL;
    const {id} = context.query;
    const examScheduleFileResponse = await fetch(`${SIS_API_URL}/exam-schedule-file/department/` + id, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const examScheduleFileData = await examScheduleFileResponse.json();
    if (examScheduleFileData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                SIS_API_URL: SIS_API_URL,
                examScheduleFile: examScheduleFileData.response
            }
        }
    }
}

export default function ExamScheduleFileDetail({isPagePermissionSuccess, SIS_API_URL, examScheduleFile}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const router = useRouter();

    let [isOpenDeleteSuccess, setIsOpenDeleteSuccess] = useState(false);

    function closeDeleteSuccessModal() {
        setIsOpenDeleteSuccess(false);
        router.push("/officer/operation/schedule/exam/files").then(r => router.reload());
    }

    function openDeleteSuccessModal() {
        setIsOpenDeleteSuccess(true);
    }

    let [isOpenDeleteFail, setIsOpenDeleteFail] = useState(false);

    function closeDeleteFailModal() {
        setIsOpenDeleteFail(false);
    }

    function openDeleteFailModal() {
        setIsOpenDeleteFail(true);
    }

    let [isOpenProcessing, setIsOpenProcessing] = useState(false);

    function closeProcessingModal() {
        setIsOpenProcessing(false);
    }

    function openProcessingModal() {
        setIsOpenProcessing(true);
    }

    const examScheduleFileDelete = async (event) => {
        openProcessingModal();

        event.preventDefault();

        const deleteRes = await fetch(`${SIS_API_URL}/exam-schedule-file/delete/department/` + examScheduleFile.departmentResponse.departmentId, {
            headers: {'Content-Type': 'application/json'},
            method: 'DELETE'
        });
        const deleteData = await deleteRes.json();
        if (deleteData.success) {
            closeProcessingModal();
            openDeleteSuccessModal();
        } else {
            closeProcessingModal();
            openDeleteFailModal();
        }
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="px-28 py-5 mx-auto space-y-6">
                        <div className="max-w-7xl mx-auto h-52 px-12 py-10 text-center bg-gray-50 rounded-2xl shadow-xl">
                            <a className="select-none font-phenomenaExtraBold text-4xl text-sis-darkblue">
                                {examScheduleFile.departmentResponse.name} Sınav Programı
                            </a>
                            <div className="mt-10 content-center">
                                <div>
                                    <a
                                        href={examScheduleFile.fileViewUrl}
                                        className="select-none font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                    >
                                        DOSYAYI GÖRÜNTÜLE
                                    </a>
                                    <a
                                        href={examScheduleFile.fileDownloadUrl}
                                        className="select-none ml-2 font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                    >
                                        DOSYAYI İNDİR
                                    </a>
                                    <button
                                        onClick={examScheduleFileDelete}
                                        type="submit"
                                        className="select-none ml-2 font-phenomenaBold py-1.5 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-fail hover:bg-red-700"
                                    >
                                        DOSYAYI SİL
                                    </button>
                                </div>
                            </div>
                        </div>
                        <form className="px-4 py-5 max-w-4xl mx-auto space-y-6">
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <Transition appear show={isOpenDeleteSuccess} as={Fragment}>
                                    <Dialog
                                        as="div"
                                        className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                        onClose={closeDeleteSuccessModal}
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
                                                            Dosya Silme İşlemi Başarılı!
                                                        </div>
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                            Dosya Silme İşlemi başarıyla gerçekleşti.
                                                            Mesaj penceresini kapattıktan sonra sınav programlarının
                                                            listelendiği ekrana yönlendirileceksiniz.
                                                        </p>
                                                    </div>
                                                </div>
                                            </Transition.Child>
                                        </div>
                                    </Dialog>
                                </Transition>
                                <Transition appear show={isOpenDeleteFail} as={Fragment}>
                                    <Dialog
                                        as="div"
                                        className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                        onClose={closeDeleteFailModal}
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
                                                            Dosya Silme İşlemi Başarısız!
                                                        </div>
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                            Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış
                                                            olabilir, dosyayı silmeyi yeniden deneyebilirsiniz.
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
                </div>
            </div>
    )
}
