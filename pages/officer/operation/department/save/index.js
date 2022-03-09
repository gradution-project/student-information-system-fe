import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import {useRouter} from "next/router";
import {useState} from "react";
import {departmentPreparatoryClass} from "../../../../../public/constants/department";
import UnauthorizedAccessPage from "../../../../401";
import SisOfficerStorage from "../../../../../public/storage/officer/SisOfficerStorage";
import ProcessNotification from "../../../../../public/notifications/process";
import SuccessNotification from "../../../../../public/notifications/success";
import FailNotification from "../../../../../public/notifications/fail";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const SIS_API_URL = process.env.SIS_API_URL;
    const facultyResponses = await fetch(`${SIS_API_URL}/faculty?status=ACTIVE`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const facultyDatas = await facultyResponses.json();
    if (facultyDatas.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                operationUserId: officerId,
                SIS_API_URL: SIS_API_URL,
                faculties: facultyDatas.response
            }
        }
    }
}


export default function DepartmentSave({isPagePermissionSuccess, operationUserId, SIS_API_URL, faculties}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const router = useRouter();

    const [preparatoryClass, setPreparatoryClass] = useState();
    const changePreparatoryClass = event => {
        const preparatoryClass = event.target.value;
        setPreparatoryClass(preparatoryClass);
    }

    let [isOpenSuccessSaveNotification, setIsOpenSuccessSaveNotification] = useState(false);

    function closeSuccessSaveNotification() {
        setIsOpenSuccessSaveNotification(false);
        router.push("/officer/operation/department").then(() => router.reload());
    }

    function openSuccessSaveNotification() {
        setIsOpenSuccessSaveNotification(true);
    }

    let [isOpenFailSaveNotification, setIsOpenFailSaveNotification] = useState(false);

    function closeFailSaveNotification() {
        setIsOpenFailSaveNotification(false);
    }

    function openFailSaveNotification() {
        setIsOpenFailSaveNotification(true);
    }

    let [isOpenProcessingSaveNotification, setIsOpenProcessingSaveNotification] = useState(false);

    function closeProcessingSaveNotification() {
        setIsOpenProcessingSaveNotification(false);
    }

    function openProcessingSaveNotification() {
        setIsOpenProcessingSaveNotification(true);
    }


    const [departmentName, setDepartmentName] = useState();
    const changeDepartmentName = event => {
        const departmentName = event.target.value;
        setDepartmentName(departmentName);
    }

    const [facultyId, setFacultyId] = useState();
    const changeFacultyId = event => {
        const facultyId = event.target.value;
        setFacultyId(facultyId);
    }

    const [totalClassLevel, setTotalClassLevel] = useState();
    const changeTotalClassLevel = event => {
        const totalClassLevel = event.target.value;
        setTotalClassLevel(totalClassLevel);
    }

    const departmentSave = async (event) => {
        openProcessingSaveNotification();

        event.preventDefault();

        const saveRes = await fetch(`${SIS_API_URL}/department/save`, {
            body: JSON.stringify({
                departmentInfoRequest: {
                    facultyId: facultyId,
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
            closeProcessingSaveNotification();
            openSuccessSaveNotification();
        } else {
            closeProcessingSaveNotification();
            openFailSaveNotification();
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
                                    <label htmlFor="facultyId"
                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                        FAKÜLTE ADI
                                    </label>
                                    <select
                                        onChange={changeFacultyId}
                                        id="facultyId"
                                        name="facultyId"
                                        autoComplete="facultyId"
                                        className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                    >
                                        <option>Fakülte Seçiniz...</option>
                                        {faculties.map((faculty) => (
                                            <option key={faculty.facultyId}
                                                    value={faculty.facultyId}>{faculty.name}</option>
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
                                            <option key={preparatoryClass.value}
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

                        <ProcessNotification
                            isOpen={isOpenProcessingSaveNotification}
                            closeNotification={closeProcessingSaveNotification}
                            title="Bölüm Ekleme İsteğiniz İşleniyor..."
                        />

                        <SuccessNotification
                            isOpen={isOpenSuccessSaveNotification}
                            closeNotification={closeSuccessSaveNotification}
                            title="Bölüm Ekleme İşlemi Başarılı!"
                            description="Bölüm Ekleme İşlemi başarıyla gerçekleşti.
                            Mesaj penceresini kapattıktan sonra bölüm listeleme ekranına yönlendirileceksiniz."
                        />

                        <FailNotification
                            isOpen={isOpenFailSaveNotification}
                            closeNotification={closeFailSaveNotification}
                            title="Bölüm Ekleme İşlemi Başarısız!"
                            description="Lütfen girdiğiniz verileri kontrol ediniz.
                            Verilerinizi doğru girdiyseniz
                            sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}