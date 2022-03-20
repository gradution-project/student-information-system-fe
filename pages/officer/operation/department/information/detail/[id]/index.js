import {useRouter} from "next/router";
import {useState} from "react";
import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import UnauthorizedAccessPage from "../../../../../../401";
import PageNotFound from "../../../../../../404";
import SisOfficerStorage from "../../../../../../../public/storage/officer/SisOfficerStorage";
import ProcessNotification from "../../../../../../../public/notifications/process";
import SuccessNotification from "../../../../../../../public/notifications/success";
import FailNotification from "../../../../../../../public/notifications/fail";
import FacultyController from "../../../../../../../public/api/faculty/FacultyController";
import FacultyStatus from "../../../../../../../public/constants/faculty/FacultyStatus";
import DepartmentStatus from "../../../../../../../public/constants/department/DepartmentStatus";
import DepartmentPreparatoryClass from "../../../../../../../public/constants/department/DepartmentPreparatoryClass";
import DepartmentController from "../../../../../../../public/api/department/DepartmentController";
import SisOperationButton from "../../../../../../../public/components/buttons/SisOperationButton";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const facultyDatas = await FacultyController.getAllFacultiesByStatus(FacultyStatus.ACTIVE);

    const {id} = context.query;
    const departmentData = await DepartmentController.getDepartmentByDepartmentId(id);
    if (departmentData.success && facultyDatas.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                isDataFound: true,
                operationUserId: officerId,
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

    const {facultyResponse} = department;

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

        event.preventDefault();

        const departmentData = await DepartmentController.activateDepartment(operationUserId, department.departmentId);
        if (departmentData.success) {
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

        event.preventDefault();

        const departmentData = await DepartmentController.passivateDepartment(operationUserId, department.departmentId);
        if (departmentData.success) {
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

        event.preventDefault();

        const departmentData = await DepartmentController.deleteDepartment(operationUserId, department.departmentId);
        if (departmentData.success) {
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

    const [facultyId, setFacultyId] = useState(facultyResponse.facultyId);
    const changeFacultyId = event => {
        const facultyId = event.target.value;
        setFacultyId(facultyId);
    }

    const [departmentName, setDepartmentName] = useState(department.name);
    const changeDepartmentName = event => {
        const departmentName = event.target.value;
        setDepartmentName(departmentName);
    }

    const [departmentIsTherePreparatoryClass, setDepartmentIsTherePreparatoryClass] = useState(department.isTherePreparatoryClass);
    const changePreparatoryClass = event => {
        const departmentIsTherePreparatoryClass = event.target.value;
        setDepartmentIsTherePreparatoryClass(departmentIsTherePreparatoryClass);
    }

    const [departmentTotalClassLevel, setDepartmentTotalClassLevel] = useState(department.totalClassLevel);
    const changeTotalClassLevel = event => {
        const departmentTotalClassLevel = event.target.value;
        setDepartmentTotalClassLevel(departmentTotalClassLevel);
    }

    const departmentUpdate = async (event) => {
        openProcessingUpdateNotification();

        event.preventDefault()

        const departmentData = await DepartmentController.updateDepartment(operationUserId, department, facultyId,
            departmentIsTherePreparatoryClass, departmentName, departmentTotalClassLevel);

        if (departmentData.success) {
            closeProcessingUpdateNotification();
            openSuccessUpdateNotification();
        } else {
            closeProcessingUpdateNotification();
            openFailUpdateNotification();
        }
    }

    const isDepartmentPassiveOrDeleted = () => {
        return department.status === DepartmentStatus.PASSIVE || department.status === DepartmentStatus.DELETED
    }

    return (
        <>
            <div>
                <SISTitle/>
                <OfficerNavbar/>
                <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                            <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                                {department.name}
                            </a>
                            {DepartmentStatus.getAll.map((dStatus) => (
                                department.status === dStatus.enum
                                    ?
                                    dStatus.component
                                    :
                                    null
                            ))}
                            {(
                                department.status === DepartmentStatus.DELETED
                                    ?
                                    null
                                    :
                                    SisOperationButton.getDeleteButton(departmentDelete, "BÖLÜMÜ SİL")
                            )}
                            {(

                                department.status === DepartmentStatus.PASSIVE
                                ||
                                department.status === DepartmentStatus.DELETED
                                    ?
                                    null
                                    :
                                    SisOperationButton.getPassivateButton(departmentPassivate, "BÖLÜMÜ PASİFLEŞTİR")
                            )}
                            {(
                                department.status === DepartmentStatus.ACTIVE
                                ||
                                department.status === DepartmentStatus.DELETED
                                    ?
                                    null
                                    :
                                    SisOperationButton.getActivateButton(departmentActivate, "BÖLÜMÜ AKTİFLEŞTİR")
                            )}
                        </div>
                        <div className="select-none mt-10 py-4 sm:mt-0">
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
                                                    defaultValue={department.departmentId}
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
                                                    disabled={isDepartmentPassiveOrDeleted()}
                                                    className={isDepartmentPassiveOrDeleted()
                                                        ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                        : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    }>
                                                    {faculties.map((faculty) => (
                                                        facultyResponse.name === faculty.name
                                                            ?
                                                            <option key={faculty.facultyId} value={faculty.facultyId}
                                                                    selected>{faculty.name}</option>
                                                            :
                                                            <option key={faculty.facultyId}
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
                                                    defaultValue={department.name}
                                                    disabled={isDepartmentPassiveOrDeleted()}
                                                    className={isDepartmentPassiveOrDeleted()
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
                                                    defaultValue={department.totalClassLevel}
                                                    disabled={isDepartmentPassiveOrDeleted()}
                                                    className={isDepartmentPassiveOrDeleted()
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
                                                    disabled={isDepartmentPassiveOrDeleted()}
                                                    className={isDepartmentPassiveOrDeleted()
                                                        ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                        : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    }>
                                                    {DepartmentPreparatoryClass.getAll.map(dPreparatoryClass => (
                                                        department.isTherePreparatoryClass === dPreparatoryClass.value
                                                            ?
                                                            <option key={dPreparatoryClass.value}
                                                                    value={dPreparatoryClass.value}
                                                                    selected>{dPreparatoryClass.tr}</option>
                                                            :
                                                            <option key={dPreparatoryClass.value}
                                                                    value={dPreparatoryClass.value}>{dPreparatoryClass.tr}</option>
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
                                        isDepartmentPassiveOrDeleted()
                                            ?
                                            null
                                            :
                                            SisOperationButton.getUpdateButton(departmentUpdate, "GÜNCELLE")
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