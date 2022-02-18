import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";
import Cookies from "universal-cookie";
import {useRouter} from "next/router";

export async function getServerSideProps() {
    const SIS_API_URL = process.env.SIS_API_URL;
    const departmentResponses = await fetch(`${SIS_API_URL}/department?status=ACTIVE`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const departmentDatas = await departmentResponses.json();
    if (departmentDatas.success) {
        return {
            props: {
                departments: departmentDatas.response,
                SIS_API_URL: SIS_API_URL
            }
        }
    }
}

export default function LessonScheduleFileSave({departments, SIS_API_URL}) {

    const cookies = new Cookies();

    const router = useRouter();

    const [operationUserId, setOperationUserId] = useState(cookies.get("officerNumber"));

    const [facultyId, setFacultyId] = useState(cookies.get("officerFacultyNumber"));

    const [departmentId, setDepartmentId] = useState();
    const changeDepartmentId = event => {
        const departmentId = event.target.value;
        setDepartmentId(departmentId);
    }

    const [departmentName, setDepartmentName] = useState();

    const [isFileUploaded, setIsFileUploaded] = useState(false);

    const [fileViewUrl, setFileViewUrl] = useState();

    const [fileDownloadUrl, setFileDownloadUrl] = useState();

    const [lessonScheduleFileRequest, setLessonScheduleFileRequest] = useState();
    const changeLessonScheduleFile = event => {
        const formData = new FormData();
        for (let key of Object.keys(event.target.files)) {
            if (key !== 'length') {
                formData.append('document', event.target.files[key]);
            }
        }
        formData.append('apiUrl', SIS_API_URL);
        formData.append('facultyId', facultyId);
        formData.append('departmentId', departmentId);
        formData.append('operationUserId', operationUserId);
        setLessonScheduleFileRequest(formData);
    }

    let [isOpenSaveSuccess, setIsOpenSaveSuccess] = useState(false);

    function closeSaveSuccessModal() {
        setIsOpenSaveSuccess(false);
    }

    function openSaveSuccessModal() {
        setIsOpenSaveSuccess(true);
    }

    let [isOpenSaveFail, setIsOpenSaveFail] = useState(false);

    function closeSaveFailModal() {
        setIsOpenSaveFail(false);
        router.reload();
    }

    function openSaveFailModal() {
        setIsOpenSaveFail(true);
    }

    let [isOpenProcessing, setIsOpenProcessing] = useState(false);

    function closeProcessingModal() {
        setIsOpenProcessing(false);
    }

    function openProcessingModal() {
        setIsOpenProcessing(true);
    }

    const lessonScheduleFileSave = async (event) => {
        openProcessingModal();

        event.preventDefault();

        if (facultyId !== null && departmentId !== null) {
            const saveRes = await fetch(`${SIS_API_URL}/lesson-schedule-file/save`, {
                body: lessonScheduleFileRequest,
                method: 'POST'
            });
            const saveData = await saveRes.json();
            if (saveData.success) {
                closeProcessingModal();
                openSaveSuccessModal();
                setIsFileUploaded(true);
                setFileViewUrl(saveData.response.fileViewUrl)
                setFileDownloadUrl(saveData.response.fileDownloadUrl)
                setDepartmentName(saveData.response.departmentResponse.name)
            } else {
                closeProcessingModal();
                openSaveFailModal();
            }
        } else {
            closeProcessingModal();
            openSaveFailModal();
        }
    }


    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="px-28 py-5 mx-auto space-y-6">
                {(
                    isFileUploaded
                        ?
                        <div
                            className="max-w-7xl mx-auto h-52 px-12 py-10 text-center bg-gray-50 rounded-2xl shadow-xl">
                            <a className="select-none font-phenomenaExtraBold text-4xl text-sis-darkblue">
                                {departmentName} Ders Programı
                            </a>
                            <div className="mt-10 content-center">
                                <div>
                                    <a
                                        href={fileViewUrl}
                                        className="select-none font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                    >
                                        DOSYAYI GÖRÜNTÜLE
                                    </a>
                                    <a
                                        href={fileDownloadUrl}
                                        className="select-none ml-2 font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                    >
                                        DOSYAYI İNDİR
                                    </a>
                                </div>
                            </div>
                        </div>
                        :
                        <div
                            className="max-w-7xl mx-auto h-52 px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                            <a className="select-none font-phenomenaExtraBold text-4xl text-sis-darkblue">
                                DERS PROGRAMI YÜKLEME
                            </a>
                            <div className="float-right">
                                <form className="upload" onSubmit={lessonScheduleFileSave}>
                                    <select
                                        onChange={changeDepartmentId}
                                        id="departmentNumber"
                                        name="departmentNumber"
                                        autoComplete="department-number"
                                        required
                                        className="select-none font-phenomenaRegular text-gray-700 w-full block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                    >
                                        <option value=''>Bölüm Seçiniz...</option>
                                        {departments.map((department) => (
                                            <option key={department.departmentId}
                                                    value={department.departmentId}>{department.name}</option>
                                        ))}
                                    </select>
                                    <div className="mt-8">
                                        <input type="file" name="uploadFile" accept="application/pdf" required
                                               className="select-none mt-2" onChange={changeLessonScheduleFile}/>
                                        <button
                                            type="submit"
                                            className="select-none ml-2 font-phenomenaBold float-right py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                        >
                                            DOSYAYI YÜKLE
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                )}
                <form className="px-4 py-5 max-w-4xl mx-auto space-y-6">
                    <div className="shadow overflow-hidden sm:rounded-md">
                        <Transition appear show={isOpenSaveSuccess} as={Fragment}>
                            <Dialog
                                as="div"
                                className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                onClose={closeSaveSuccessModal}
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
                                                    Dosya Yükleme İşlemi Başarılı!
                                                </div>
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                    Dosya Yükleme İşlemi başarıyla gerçekleşti.
                                                    Mesaj penceresini kapattıktan sonra dosya listeleme
                                                    ekranına yönlendirileceksiniz.
                                                </p>
                                            </div>
                                        </div>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition>
                        <Transition appear show={isOpenSaveFail} as={Fragment}>
                            <Dialog
                                as="div"
                                className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                onClose={closeSaveFailModal}
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
                                                    Dosya Yükleme İşlemi Başarısız!
                                                </div>
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                    Lütfen bölüm seçiminizi kontrol ediniz.
                                                    Bölüm seçtiyseniz; bu bölüme ait ders programı sistemde
                                                    mevcut olabilir, tanımlı olan dosyayı sildikten sonra
                                                    tekrar deneyerek ders programı ekleyebilirsiniz veya
                                                    sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış
                                                    olabilir, dosyayı yükleyerek yeniden deneyebilirsiniz.
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
    )
}
