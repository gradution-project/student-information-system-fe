import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import Cookies from "universal-cookie";
import {useRouter} from "next/router";
import {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {departmentPreparatoryClass} from "../../../../../public/constants/department";

export async function getServerSideProps() {
    const SIS_API_URL = process.env.SIS_API_URL;
    const facultyResponses = await fetch(`${SIS_API_URL}/faculty?status=ACTIVE`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const facultyDatas = await facultyResponses.json();
    if (facultyDatas.success) {
        return {
            props: {
                faculties: facultyDatas.response,
                SIS_API_URL: SIS_API_URL
            }
        }
    }
}

export default function DepartmentSave({faculties, SIS_API_URL}) {
    const cookies = new Cookies();

    const facultyName = faculties.name;

    const [preparatoriesClass] = useState();

    const router = useRouter();

    const [operationUserId] = useState(cookies.get('officerNumber'));

    const [departmentName, setDepartmentName] = useState();
    const changeDepartmentName = event => {
        const departmentName = event.target.value;
        setDepartmentName(departmentName);
    }

    const [facultiesName, setFacultiesName] = useState();
    const changeFacultiesName = event => {
        const facultiesName = event.target.value;
        setFacultiesName(facultiesName);
    }

    const [totalClassLevel, setTotalClassLevel] = useState();
    const changeTotalClassLevel = event => {
        const totalClassLevel = event.target.value;
        setTotalClassLevel(totalClassLevel);
    }

    const [preparatoryClass, setPreparatoryClass] = useState();
    const changePreparatoryClass = event => {
        const preparatoryClass = event.target.value;
        setPreparatoryClass(preparatoryClass);
    }

    let [isOpenSuccess, setIsOpenSuccess] = useState(false);

    function closeSuccessModal() {
        setIsOpenSuccess(false);
        router.push("/officer/operation/department").then(() => router.reload());
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

    const departmentSave = async (event) => {
        openProcessingModal();

        event.preventDefault();

        const saveRes = await fetch(`${SIS_API_URL}/department/save`, {
            body: JSON.stringify({
                departmentInfoRequest: {
                    facultyId: facultiesName,
                    isTherePreparatoryClass: preparatoryClass,
                    name: departmentName,
                    totalClassLevel: totalClassLevel
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
            <div className="select-none md:col-span-1">
                <form className="mt-5 px-4 max-w-3xl mx-auto space-y-6" onSubmit={departmentSave}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                    BÖLÜM EKLEME
                                </h3>
                            </div>
                            <div className="grid grid-cols-6 gap-6">

                                <div className="sm:col-span-3">
                                    <label htmlFor="faculty"
                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                        FAKÜLTE ADI
                                    </label>
                                    <select
                                        onChange={changeFacultiesName}
                                        id="faculty"
                                        name="faculty"
                                        autoComplete="faculty-name"
                                        className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                    >
                                        <option>Fakülte Seçiniz...</option>
                                        {faculties.map((faculty) => (
                                            facultyName === faculty.name
                                                ?
                                                <option value={faculty.facultyId}>{faculty.name}</option>
                                                :
                                                <option value={faculty.facultyId}>{faculty.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="department-name"
                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                        BÖLÜM ADI
                                    </label>
                                    <input
                                        onChange={changeDepartmentName}
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="department-name"
                                        className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="totalClassLevel"
                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                        SINIF SAYISI
                                    </label>
                                    <input
                                        onChange={changeTotalClassLevel}
                                        type="text"
                                        name="totalClassLevel"
                                        id="totalClassLevel"
                                        autoComplete="totalClassLevel"
                                        className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                    />
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
                                        className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                    >
                                        <option>Hazırlık Sınıfı Durumu Seçiniz...</option>
                                        {departmentPreparatoryClass.map(preparatoryClass => (
                                            preparatoriesClass === preparatoryClass.value
                                                ?
                                                <option value={preparatoryClass.value}
                                                        selected>{preparatoryClass.tr}</option>
                                                :
                                                <option
                                                    value={preparatoryClass.value}>{preparatoryClass.tr}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
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
                                                    Bölüm Ekleme İşlemi Başarılı!
                                                </div>
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                    Öğrenci Ekleme İşlemi başarıyla gerçekleşti.
                                                    Mesaj penceresini kapattıktan sonra bölüm listeleme
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
                                                    Bölüm Ekleme İşlemi Başarısız!
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
        </div>

    )
}