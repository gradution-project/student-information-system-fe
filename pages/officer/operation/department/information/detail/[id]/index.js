import {useRouter} from "next/router";
import {useState} from "react";
import {departmentPreparatoryClass, departmentStatuses} from "../../../../../../../public/constants/department";
import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import UnauthorizedAccessPage from "../../../../../../401";
import PageNotFound from "../../../../../../404";
import SisOfficerStorage from "../../../../../../../public/storage/officer/SisOfficerStorage";
import ProcessNotification from "../../../../../../../public/notifications/process";
import SuccessNotification from "../../../../../../../public/notifications/success";
import FailNotification from "../../../../../../../public/notifications/fail";

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
    const {id} = context.query;
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
                isPagePermissionSuccess: true,
                isDataFound: true,
                operationUserId: officerId,
                SIS_API_URL: SIS_API_URL,
                faculties: facultyDatas.response,
                department: departmentData.response
            }
        }
    } else {
        return {
            props: {
                isPagePermissionSuccess: true,
                isDataFound: false
            }
        }
    }
}


export default function DepartmentDetail({
                                             isPagePermissionSuccess,
                                             isDataFound,
                                             operationUserId,
                                             SIS_API_URL,
                                             faculties,
                                             department
                                         }) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="/officer"/>
        )
    }

    if (!isDataFound) {
        return (
            <PageNotFound user="/officer"/>
        )
    }

    const router = useRouter();

    const {departmentId, name, totalClassLevel, status, isTherePreparatoryClass, facultyResponse} = department;
    const facultyName = facultyResponse.name;

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


    let [isOpenProcessingActivateNotification, setIsOpenProcessingActivateNotification] = useState(false);

    function closeProcessingActivateNotification() {
        setIsOpenProcessingActivateNotification(false);
    }

    function openProcessingActivateNotification() {
        setIsOpenProcessingActivateNotification(true);
    }

    let [isOpenSuccessActivateNotification, setIsOpenSuccessActivateNotification] = useState(false);

    function closeSuccessActivateNotification() {
        setIsOpenSuccessActivateNotification(false);
        router.reload();
    }

    function openSuccessActivateNotification() {
        setIsOpenSuccessActivateNotification(true);
    }

    let [isOpenFailActivateNotification, setIsOpenFailActivateNotification] = useState(false);

    function closeFailActivateNotification() {
        setIsOpenFailActivateNotification(false);
    }

    function openFailActivateNotification() {
        setIsOpenFailActivateNotification(true);
    }

    const departmentActivate = async (event) => {
        openProcessingActivateNotification();

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
            closeProcessingActivateNotification();
            openSuccessActivateNotification()
        } else {
            closeProcessingActivateNotification();
            openFailActivateNotification();
        }
    }


    let [isOpenProcessingPassivateNotification, setIsOpenProcessingPassivateNotification] = useState(false);

    function closeProcessingPassivateNotification() {
        setIsOpenProcessingPassivateNotification(false);
    }

    function openProcessingPassivateNotification() {
        setIsOpenProcessingPassivateNotification(true);
    }

    let [isOpenSuccessPassivateNotification, setIsOpenSuccessPassivateNotification] = useState(false);

    function closeSuccessPassivateNotification() {
        setIsOpenSuccessPassivateNotification(false);
        router.reload();
    }

    function openSuccessPassivateNotification() {
        setIsOpenSuccessPassivateNotification(true);
    }

    let [isOpenFailPassivateNotification, setIsOpenFailPassivateNotification] = useState(false);

    function closeFailPassivateNotification() {
        setIsOpenFailPassivateNotification(false);
    }

    function openFailPassivateNotification() {
        setIsOpenFailPassivateNotification(true);
    }

    const departmentPassivate = async (event) => {
        openProcessingPassivateNotification();

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
            closeProcessingPassivateNotification();
            openSuccessPassivateNotification()
        } else {
            closeProcessingPassivateNotification();
            openFailPassivateNotification();
        }
    }


    let [isOpenProcessingDeleteNotification, setIsOpenProcessingDeleteNotification] = useState(false);

    function closeProcessingDeleteNotification() {
        setIsOpenProcessingDeleteNotification(false);
    }

    function openProcessingDeleteNotification() {
        setIsOpenProcessingDeleteNotification(true);
    }

    let [isOpenSuccessDeleteNotification, setIsOpenSuccessDeleteNotification] = useState(false);

    function closeSuccessDeleteNotification() {
        setIsOpenSuccessDeleteNotification(false);
        router.reload();
    }

    function openSuccessDeleteNotification() {
        setIsOpenSuccessDeleteNotification(true);
    }

    let [isOpenFailDeleteNotification, setIsOpenFailDeleteNotification] = useState(false);

    function closeFailDeleteNotification() {
        setIsOpenFailDeleteNotification(false);
    }

    function openFailDeleteNotification() {
        setIsOpenFailDeleteNotification(true);
    }

    const departmentDelete = async (event) => {
        openProcessingDeleteNotification();

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
            closeProcessingDeleteNotification();
            openSuccessDeleteNotification()
        } else {
            closeProcessingDeleteNotification();
            openFailDeleteNotification();
        }
    }


    let [isOpenProcessingUpdateNotification, setIsOpenProcessingUpdateNotification] = useState(false);

    function closeProcessingUpdateNotification() {
        setIsOpenProcessingUpdateNotification(false);
    }

    function openProcessingUpdateNotification() {
        setIsOpenProcessingUpdateNotification(true);
    }

    let [isOpenSuccessUpdateNotification, setIsOpenSuccessUpdateNotification] = useState(false);

    function closeSuccessUpdateNotification() {
        setIsOpenSuccessUpdateNotification(false);
        router.reload();
    }

    function openSuccessUpdateNotification() {
        setIsOpenSuccessUpdateNotification(true);
    }

    let [isOpenFailUpdateNotification, setIsOpenFailUpdateNotification] = useState(false);

    function closeFailUpdateNotification() {
        setIsOpenFailUpdateNotification(false);
    }

    function openFailUpdateNotification() {
        setIsOpenFailUpdateNotification(true);
    }

    const departmentUpdate = async (event) => {
        openProcessingUpdateNotification();

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
            closeProcessingUpdateNotification();
            openSuccessUpdateNotification();
        } else {
            closeProcessingUpdateNotification();
            openFailUpdateNotification();
        }
    }
    return (
        <>
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
                                                            <option
                                                                value={faculty.facultyId}>{faculty.name}</option>

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

                                    {/**
                                     * Activate
                                     */}
                                    <ProcessNotification
                                        isOpen={isOpenProcessingActivateNotification}
                                        closeNotification={closeProcessingActivateNotification}
                                        title="Bölüm Aktifleştirme İsteğiniz İşleniyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessActivateNotification}
                                        closeNotification={closeSuccessActivateNotification}
                                        title="Bölüm Aktifleştime İşlemi Başarılı!"
                                        description="Bölüm Aktifleştirildi."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailActivateNotification}
                                        closeNotification={closeFailActivateNotification}
                                        title="Bölüm Aktifleştirme İşlemi Başarısız!"
                                        description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                    />

                                    {/**
                                     * Passivate
                                     */}
                                    <ProcessNotification
                                        isOpen={isOpenProcessingPassivateNotification}
                                        closeNotification={closeProcessingPassivateNotification}
                                        title="Bölüm Bilgi Güncelleme İsteğiniz İşleniyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessPassivateNotification}
                                        closeNotification={closeSuccessPassivateNotification}
                                        title="Bölüm Pasifleştirme İşlemi Başarılı!"
                                        description="Bölüm Pasifleştirildi."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailPassivateNotification}
                                        closeNotification={closeFailPassivateNotification}
                                        title="Bölüm Pasifleştirme İşlemi Başarısız!"
                                        description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                    />

                                    {/**
                                     * Delete
                                     */}
                                    <ProcessNotification
                                        isOpen={isOpenProcessingDeleteNotification}
                                        closeNotification={closeProcessingDeleteNotification}
                                        title="Bölüm Silme İsteğiniz İşleniyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessDeleteNotification}
                                        closeNotification={closeSuccessDeleteNotification}
                                        title="Bölüm Sime İşlemi Başarılı!"
                                        description="Bölüm Silindi."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailDeleteNotification}
                                        closeNotification={closeFailDeleteNotification}
                                        title="Bölüm Silme İşlemi Başarısız!"
                                        description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                    />

                                    {/**
                                     * Update
                                     */}
                                    <ProcessNotification
                                        isOpen={isOpenProcessingUpdateNotification}
                                        closeNotification={closeProcessingUpdateNotification}
                                        title="Bölüm Bilgi Güncelleme İsteğiniz İşleniyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessUpdateNotification}
                                        closeNotification={closeSuccessUpdateNotification}
                                        title="Bölüm Bilgi Güncelleme İşlemi Başarılı!"
                                        description="Bölüm Bilgi Güncellene İşlemi başarıyla gerçekleşti."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailUpdateNotification}
                                        closeNotification={closeFailUpdateNotification}
                                        title="Bölüm Bilgi Güncelleme İşlemi Başarısız!"
                                        description="Lütfen girdiğiniz verileri kontrol ediniz.
                                        Verilerinizi doğru girdiyseniz
                                        sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}