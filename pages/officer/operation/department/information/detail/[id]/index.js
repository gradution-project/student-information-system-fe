import Cookies from "universal-cookie";
import {useRouter} from "next/router";
import {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {departmentPreparatoryClass, departmentStatuses} from "../../../../../../../public/constants/department";
import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import UnauthorizedAccessPage from "../../../../../../401";
import PageNotFound from "../../../../../../404";

export async function getServerSideProps({query}) {
    const SIS_API_URL = process.env.SIS_API_URL;
    const {id} = query;
    const facultyResponses = await fetch(`${SIS_API_URL}/faculty?status=ACTIVE`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const departmentResponse = await fetch(`${SIS_API_URL}/department/` + id, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });

    const facultyDatas = await facultyResponses.json();
    const departmentData = await departmentResponse.json();
    if (departmentData.success && facultyDatas.success) {
        return {
            props: {
                isDataFound: true,
                faculties: facultyDatas.response,
                department: departmentData.response,
                SIS_API_URL: SIS_API_URL
            }
        }
    } else {
        return {
            props: {
                isDataFound: false
            }
        }
    }
}


export default function DepartmentDetail({isDataFound, faculties, department, SIS_API_URL}) {

    const cookies = new Cookies();

    const [officerId] = useState(cookies.get('officerNumber'));
    let isPagePermissionSuccess = false;
    if (officerId !== undefined) {
        isPagePermissionSuccess = true;
    }

    if (isPagePermissionSuccess) {
        if (isDataFound) {
            const {departmentId, name, totalClassLevel, status, isTherePreparatoryClass, facultyResponse} = department;
            const facultyName = facultyResponse.name;


            const router = useRouter();

            const [operationUserId] = useState(cookies.get('officerNumber'));

            const [departmentName, setDepartmentName] = useState(name);
            const changeDepartmentName = event => {
                const departmentName = event.target.value;
                setDepartmentName(departmentName);
            }

            const [facultyId, setFacultyId] = useState(facultyResponse.facultyId);
            const changeFacultyId = event => {
                const facultyId = event.target.value;
                setFacultyId(facultyId);
            }

            const [totalClassLevels, setTotalClassLevel] = useState(totalClassLevel);
            const changeTotalClassLevel = event => {
                const totalClassLevels = event.target.value;
                setTotalClassLevel(totalClassLevels);
            }

            const [preparatoryClass, setPreparatoryClass] = useState(isTherePreparatoryClass);
            const changePreparatoryClass = event => {
                const preparatoryClass = event.target.value;
                setPreparatoryClass(preparatoryClass);
            }

            let [isOpenSuccessActive, setIsOpenSuccessActive] = useState(false);

            function closeSuccessModalActive() {
                setIsOpenSuccessActive(false);
                router.reload();
            }

            function openSuccessModalActive() {
                setIsOpenSuccessActive(true);
            }

            let [isOpenFailActive, setIsOpenFailActive] = useState(false);

            function closeFailModalActive() {
                setIsOpenFailActive(false);
            }

            function openFailModalActive() {
                setIsOpenFailActive(true);
            }

            let [isOpenProcessingActive, setIsOpenProcessingActive] = useState(false);

            function closeProcessingModalActive() {
                setIsOpenProcessingActive(false);
            }

            function openProcessingModalActive() {
                setIsOpenProcessingActive(true);
            }

            let [isOpenSuccessPassivate, setIsOpenSuccessPassivate] = useState(false);

            function closeSuccessModalPassivate() {
                setIsOpenSuccessPassivate(false);
                router.reload();
            }

            function openSuccessModalPassivate() {
                setIsOpenSuccessPassivate(true);
            }

            let [isOpenFailPassivate, setIsOpenFailPassivate] = useState(false);

            function closeFailModalPassivate() {
                setIsOpenFailPassivate(false);
            }

            function openFailModalPassivate() {
                setIsOpenFailPassivate(true);
            }

            let [isOpenProcessingPassivate, setIsOpenProcessingPassivate] = useState(false);

            function closeProcessingModalPassivate() {
                setIsOpenProcessingPassivate(false);
            }

            function openProcessingModalPassivate() {
                setIsOpenProcessingPassivate(true);
            }

            let [isOpenSuccessDelete, setIsOpenSuccessDelete] = useState(false);

            function closeSuccessModalDelete() {
                setIsOpenSuccessDelete(false);
                router.reload();
            }

            function openSuccessModalDelete() {
                setIsOpenSuccessDelete(true);
            }

            let [isOpenFailDelete, setIsOpenFailDelete] = useState(false);

            function closeFailModalDelete() {
                setIsOpenFailDelete(false);
            }

            function openFailModalDelete() {
                setIsOpenFailDelete(true);
            }

            let [isOpenProcessingDelete, setIsOpenProcessingDelete] = useState(false);

            function closeProcessingModalDelete() {
                setIsOpenProcessingDelete(false);
            }

            function openProcessingModalDelete() {
                setIsOpenProcessingDelete(true);
            }

            let [isOpenSuccess, setIsOpenSuccess] = useState(false);

            function closeSuccessModal() {
                setIsOpenSuccess(false);
                router.reload();
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

            const departmentActivate = async (event) => {
                openProcessingModalActive();

                event.preventDefault()
                const activateRes = await fetch(`${SIS_API_URL}/department/activate`, {
                    headers: {'Content-Type': 'application/json'},
                    method: 'PATCH',
                    body: JSON.stringify({
                        operationInfoRequest: {
                            userId: operationUserId
                        },
                        departmentId: departmentId
                    }),
                });
                const activateData = await activateRes.json();
                if (activateData.success) {
                    closeProcessingModalActive();
                    openSuccessModalActive()
                } else {
                    closeProcessingModalActive();
                    openFailModalActive();
                }
            }

            const departmentPassivate = async (event) => {
                openProcessingModalPassivate();

                event.preventDefault()
                const passivateRes = await fetch(`${SIS_API_URL}/department/passivate`, {
                    headers: {'Content-Type': 'application/json'},
                    method: 'PATCH',
                    body: JSON.stringify({
                        operationInfoRequest: {
                            userId: operationUserId
                        },
                        departmentId: departmentId
                    }),
                });
                const passivateData = await passivateRes.json();
                if (passivateData.success) {
                    closeProcessingModalPassivate();
                    openSuccessModalPassivate()
                } else {
                    closeProcessingModalPassivate();
                    openFailModalPassivate();
                }
            }

            const departmentDelete = async (event) => {
                openProcessingModalDelete();

                event.preventDefault()
                const deleteRes = await fetch(`${SIS_API_URL}/department/delete`, {
                    headers: {'Content-Type': 'application/json'},
                    method: 'DELETE',
                    body: JSON.stringify({
                        operationInfoRequest: {
                            userId: operationUserId
                        },
                        departmentId: departmentId
                    }),
                });
                const deleteData = await deleteRes.json();
                if (deleteData.success) {
                    closeProcessingModalDelete();
                    openSuccessModalDelete()
                } else {
                    closeProcessingModalDelete();
                    openFailModalDelete();
                }
            }

            const departmentUpdate = async (event) => {
                openProcessingModal();

                event.preventDefault()
                const updateRes = await fetch(`${SIS_API_URL}/department/update/${departmentId}`, {
                    headers: {'Content-Type': 'application/json'},
                    method: 'PUT',
                    body: JSON.stringify({
                        departmentInfoRequest: {
                            facultyId: facultyId,
                            isTherePreparatoryClass: preparatoryClass,
                            name: departmentName,
                            totalClassLevel: totalClassLevels
                        },
                        operationInfoRequest: {
                            userId: operationUserId
                        }
                    }),
                });
                const updateData = await updateRes.json();
                if (updateData.success) {
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
                    <div className="select-none px-28 py-5 mx-auto space-y-6">
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                                <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                                    {name}
                                </a>
                                {departmentStatuses.map((departmentStatus) => (
                                    status === departmentStatus.enum
                                        ?
                                        departmentStatus.component
                                        :
                                        null
                                ))}
                                {(
                                    status !== 'DELETED'
                                        ?
                                        <button
                                            onClick={departmentDelete}
                                            type="submit"
                                            className="block float-right font-phenomenaBold ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-red-600 hover:bg-sis-darkblue"
                                        >
                                            BÖLÜMÜ SİL
                                        </button>
                                        :
                                        null
                                )}
                                {(
                                    status !== 'PASSIVE' && status !== 'DELETED'
                                        ?
                                        <button
                                            onClick={departmentPassivate}
                                            type="submit"
                                            className="block float-right font-phenomenaBold ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                                        >
                                            BÖLÜMÜ PASİFLEŞTİR
                                        </button>
                                        :
                                        null
                                )}
                                {(
                                    status !== 'ACTIVE' && status !== 'DELETED'
                                        ?
                                        <button
                                            onClick={departmentActivate}
                                            type="submit"
                                            className="block float-right font-phenomenaBold ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                                        >
                                            BÖLÜMÜ AKTİFLEŞTİR
                                        </button>
                                        :
                                        null
                                )}
                            </div>
                            <div className="select-none md:col-span-1">
                                <form className="mt-5 px-4 max-w-3xl mx-auto space-y-6">
                                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                            <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                                <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                                    BÖLÜM BİLGİLERİ
                                                </h3>
                                            </div>
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="department-number"
                                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                        BÖLÜM NUMARASI
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="departmentId"
                                                        id="departmentId"
                                                        defaultValue={departmentId}
                                                        disabled
                                                        className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    />
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="facultyId"
                                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                        FAKÜLTE ADI
                                                    </label>
                                                    <select
                                                        onChange={changeFacultyId}
                                                        id="facultyId"
                                                        name="facultyId"
                                                        autoComplete="facultyId"
                                                        disabled={status === "DELETED" || status === "PASSIVE"}
                                                        className={status === "DELETED" || status === "PASSIVE"
                                                            ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                            : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                        }>
                                                        {faculties.map((faculty) => (
                                                            facultyName === faculty.name
                                                                ?
                                                                <option value={faculty.facultyId}
                                                                        selected>{faculty.name}</option>
                                                                :
                                                                <option value={faculty.facultyId}>{faculty.name}</option>

                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="department"
                                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                        BÖLÜM ADI
                                                    </label>
                                                    <input
                                                        onChange={changeDepartmentName}
                                                        type="text"
                                                        name="department"
                                                        id="department"
                                                        defaultValue={name}
                                                        disabled={status === "DELETED" || status === "PASSIVE"}
                                                        className={status === "DELETED" || status === "PASSIVE"
                                                            ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                            : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                        }/>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="totalClassLevel"
                                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                        SINIF SAYISI
                                                    </label>
                                                    <input
                                                        onChange={changeTotalClassLevel}
                                                        type="text"
                                                        name="totalClassLevel"
                                                        id="totalClassLevel"
                                                        defaultValue={totalClassLevel}
                                                        disabled={status === "DELETED" || status === "PASSIVE"}
                                                        className={status === "DELETED" || status === "PASSIVE"
                                                            ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                            : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                        }/>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="isTherePreparatoryLevel"
                                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                        HAZIRLIK SINIFI
                                                    </label>
                                                    <select
                                                        onChange={changePreparatoryClass}
                                                        id="isTherePreparatoryLevel"
                                                        name="isTherePreparatoryLevel"
                                                        autoComplete="isTherePreparatoryLevel"
                                                        disabled={status === "DELETED" || status === "PASSIVE"}
                                                        className={status === "DELETED" || status === "PASSIVE"
                                                            ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                            : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                        }>
                                                        {departmentPreparatoryClass.map(preparatoryClass => (
                                                            isTherePreparatoryClass === preparatoryClass.value
                                                                ?
                                                                <option value={preparatoryClass.value}
                                                                        selected>{preparatoryClass.tr}</option>
                                                                :
                                                                <option
                                                                    value={preparatoryClass.value}>{preparatoryClass.tr}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {(
                                                    department.modifiedDate !== null
                                                        ?
                                                        <div className="sm:col-span-6">
                                                            <a className="font-phenomenaRegular text-sis-blue text-xl">
                                                                Son Düzenlenme Tarihi : {department.modifiedDate}
                                                            </a>
                                                        </div>
                                                        :
                                                        null
                                                )}
                                            </div>
                                        </div>
                                        {(
                                            status !== 'DELETED' && status !== 'PASSIVE'
                                                ?
                                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                                    <button
                                                        onClick={departmentUpdate}
                                                        type="submit"
                                                        className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                                                    >
                                                        GÜNCELLE
                                                    </button>
                                                </div>
                                                :
                                                null
                                        )}

                                        <Transition appear show={isOpenSuccessActive} as={Fragment}>
                                            <Dialog
                                                as="div"
                                                className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                                onClose={closeSuccessModalActive}
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
                                                                    Bölüm Aktifleştirme İşlemi Başarılı!
                                                                </div>
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                                    Bölüm Aktifleştirme İşlemi başarıyla gerçekleşti.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Transition.Child>
                                                </div>
                                            </Dialog>
                                        </Transition>
                                        <Transition appear show={isOpenFailActive} as={Fragment}>
                                            <Dialog
                                                as="div"
                                                className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                                onClose={closeFailModalActive}
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
                                                                    Bölüm Aktifleştirme İşlemi Başarısız!
                                                                </div>
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                                    Lütfen girdiğiniz verileri kontrol ediniz.
                                                                    Verilerinizi doğru girdiyseniz bölüm kaydı
                                                                    silinmiş olabilir.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Transition.Child>
                                                </div>
                                            </Dialog>
                                        </Transition>

                                        <Transition appear show={isOpenProcessingActive} as={Fragment}>
                                            <Dialog
                                                as="div"
                                                className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                                onClose={closeProcessingModalActive}
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
                                                                Bölüm Aktifleştirme İsteğiniz İşleniyor...
                                                            </Dialog.Title>
                                                        </div>
                                                    </Transition.Child>
                                                </div>
                                            </Dialog>
                                        </Transition>

                                        <Transition appear show={isOpenSuccessPassivate} as={Fragment}>
                                            <Dialog
                                                as="div"
                                                className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                                onClose={closeSuccessModalPassivate}
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
                                                                    Bölüm Pasifleştirme İşlemi Başarılı!
                                                                </div>
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                                    Bölüm Pasifleştirme İşlemi başarıyla gerçekleşti.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Transition.Child>
                                                </div>
                                            </Dialog>
                                        </Transition>
                                        <Transition appear show={isOpenFailPassivate} as={Fragment}>
                                            <Dialog
                                                as="div"
                                                className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                                onClose={closeFailModalPassivate}
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
                                                                    Bölüm Pasifleştirme İşlemi Başarısız!
                                                                </div>
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                                    Lütfen girdiğiniz verileri kontrol ediniz.
                                                                    Verilerinizi doğru girdiyseniz bölüm kaydı
                                                                    silinmiş olabilir.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Transition.Child>
                                                </div>
                                            </Dialog>
                                        </Transition>

                                        <Transition appear show={isOpenProcessingPassivate} as={Fragment}>
                                            <Dialog
                                                as="div"
                                                className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                                onClose={closeProcessingModalPassivate}
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
                                                                Bölüm Pasifleştirme İsteğiniz İşleniyor...
                                                            </Dialog.Title>
                                                        </div>
                                                    </Transition.Child>
                                                </div>
                                            </Dialog>
                                        </Transition>

                                        <Transition appear show={isOpenSuccessDelete} as={Fragment}>
                                            <Dialog
                                                as="div"
                                                className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                                onClose={closeSuccessModalDelete}
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
                                                                    Bölüm Silme İşlemi Başarılı!
                                                                </div>
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                                    Bölüm Silme İşlemi başarıyla gerçekleşti.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Transition.Child>
                                                </div>
                                            </Dialog>
                                        </Transition>
                                        <Transition appear show={isOpenFailDelete} as={Fragment}>
                                            <Dialog
                                                as="div"
                                                className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                                onClose={closeFailModalDelete}
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
                                                                    Bölüm Silme İşlemi Başarısız!
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

                                        <Transition appear show={isOpenProcessingDelete} as={Fragment}>
                                            <Dialog
                                                as="div"
                                                className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                                onClose={closeProcessingModalDelete}
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
                                                                Bölüm Silme İsteğiniz İşleniyor...
                                                            </Dialog.Title>
                                                        </div>
                                                    </Transition.Child>
                                                </div>
                                            </Dialog>
                                        </Transition>

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
                                                                    Bölüm Bilgi Güncelleme İşlemi Başarılı!
                                                                </div>
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                                    Bölüm Bilgi Güncellene İşlemi başarıyla
                                                                    gerçekleşti.

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
                                                                    Bölüm Bilgi Güncelleme İşlemi Başarısız!
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
                                                                Bölüm Bilgi Güncelleme İsteğiniz İşleniyor...
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
                </div>
            )
        } else {
            return (
                <PageNotFound user="officer"/>
            )
        }
    } else {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }
}