import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";
import {useRouter} from "next/router";
import SisOfficerStorage from "../../../../../../../public/storage/officer/SisOfficerStorage";
import UnauthorizedAccessPage from "../../../../../../401";
import ProcessNotification from "../../../../../../../public/notifications/process";
import SuccessNotification from "../../../../../../../public/notifications/success";
import FailNotification from "../../../../../../../public/notifications/fail";
import DepartmentController from "../../../../../../../public/api/department/DepartmentController";
import DepartmentStatus from "../../../../../../../public/constants/department/DepartmentStatus";
import TeacherController from "../../../../../../../public/api/teacher/TeacherController";
import TeacherStatus from "../../../../../../../public/constants/teacher/TeacherStatus";
import SisOperationButton from "../../../../../../../public/components/buttons/SisOperationButton";
import TeacherDegree from "../../../../../../../public/constants/teacher/TeacherDegree";
import TeacherRole from "../../../../../../../public/constants/teacher/TeacherRole";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const departmentsData = await DepartmentController.getAllDepartmentsByStatus(DepartmentStatus.ACTIVE);

    const {id} = context.query;
    const teacherData = await TeacherController.getTeacherDetailByTeacherId(id);
    if (teacherData.success && departmentsData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                operationUserId: officerId,
                departments: departmentsData.response,
                teacher: teacherData.response
            }
        }
    }
}


export default function TeacherDetail({isPagePermissionSuccess, operationUserId, departments, teacher}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const {academicInfoResponse, personalInfoResponse} = teacher;
    const {departmentResponse} = academicInfoResponse;
    const {facultyResponse} = departmentResponse;

    const router = useRouter();


    /**
     * TEACHER ACTIVATE OPERATION
     */

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

    const activateTeacher = async (event) => {
        openProcessingActivateNotification();

        event.preventDefault();

        const teacherId = academicInfoResponse.teacherId;
        const teacherData = await TeacherController.activateTeacher(operationUserId, teacherId);
        if (teacherData.success) {
            closeProcessingActivateNotification();
            openSuccessActivateNotification();
        } else {
            closeProcessingActivateNotification();
            openFailActivateNotification();
        }
    }


    /**
     * TEACHER PASSIVATE OPERATION
     */

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

    const passivateTeacher = async (event) => {
        openProcessingPassivateNotification();

        event.preventDefault();

        const teacherId = academicInfoResponse.teacherId;
        const teacherData = await TeacherController.passivateTeacher(operationUserId, teacherId);
        if (teacherData.success) {
            closeProcessingPassivateNotification();
            openSuccessPassivateNotification();
        } else {
            closeProcessingPassivateNotification();
            openFailPassivateNotification();
        }
    }


    /**
     * TEACHER DELETE OPERATION
     */

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

    const deleteTeacher = async (event) => {
        openProcessingDeleteNotification();

        event.preventDefault();

        const teacherId = academicInfoResponse.teacherId;
        const teacherData = await TeacherController.deleteTeacher(operationUserId, teacherId);
        if (teacherData.success) {
            closeProcessingDeleteNotification();
            openSuccessDeleteNotification();
        } else {
            closeProcessingDeleteNotification();
            openFailDeleteNotification();
        }
    }


    /**
     * TEACHER UPDATE ACADEMIC INFO OPERATION
     */

    let [isOpenProcessingAcademicInfoUpdateNotification, setIsOpenProcessingAcademicInfoUpdateNotification] = useState(false);

    function closeProcessingAcademicInfoUpdateNotification() {
        setIsOpenProcessingAcademicInfoUpdateNotification(false);
    }

    function openProcessingAcademicInfoUpdateNotification() {
        setIsOpenProcessingAcademicInfoUpdateNotification(true);
    }

    let [isOpenSuccessAcademicInfoUpdateNotification, setIsOpenSuccessAcademicInfoUpdateNotification] = useState(false);

    function closeSuccessAcademicInfoUpdateNotification() {
        setIsOpenSuccessAcademicInfoUpdateNotification(false);
        router.reload();
    }

    function openSuccessAcademicInfoUpdateNotification() {
        setIsOpenSuccessAcademicInfoUpdateNotification(true);
    }

    let [isOpenFailAcademicInfoUpdateNotification, setIsOpenFailAcademicInfoUpdateNotification] = useState(false);

    function closeFailAcademicInfoUpdateNotification() {
        setIsOpenFailAcademicInfoUpdateNotification(false);
    }

    function openFailAcademicInfoUpdateNotification() {
        setIsOpenFailAcademicInfoUpdateNotification(true);
    }

    const [departmentId, setDepartmentId] = useState(departmentResponse.departmentId);
    const changeDepartmentId = event => {
        const departmentId = event.target.value;
        setDepartmentId(departmentId);
    }

    const [degree, setDegree] = useState(academicInfoResponse.degree);
    const changeDegree = event => {
        const degree = event.target.value;
        setDegree(degree);
    }

    const [fieldOfStudy, setFieldOfStudy] = useState(academicInfoResponse.fieldOfStudy);
    const changeFieldOfStudy = event => {
        const fieldOfStudy = event.target.value;
        setFieldOfStudy(fieldOfStudy);
    }

    const [role, setRole] = useState(academicInfoResponse.role);
    const changeRole = event => {
        const role = event.target.value;
        setRole(role);
    }

    const [academicPhoneNumber, setAcademicPhoneNumber] = useState(academicInfoResponse.phoneNumber);
    const changeAcademicPhoneNumber = event => {
        const academicPhoneNumber = event.target.value;
        setAcademicPhoneNumber(academicPhoneNumber);
    }

    const updateTeacherAcademicInfo = async (event) => {
        openProcessingAcademicInfoUpdateNotification();

        event.preventDefault();

        const teacherId = academicInfoResponse.teacherId;
        const phoneNumber = academicPhoneNumber;
        const academicInfo = {departmentId, degree, fieldOfStudy, role, phoneNumber};
        const teacherData = await TeacherController.updateTeacherAcademicInfo(operationUserId, teacherId, academicInfo);
        if (teacherData.success) {
            closeProcessingAcademicInfoUpdateNotification();
            openSuccessAcademicInfoUpdateNotification();
        } else {
            closeProcessingAcademicInfoUpdateNotification();
            openFailAcademicInfoUpdateNotification();
        }
    }


    /**
     * TEACHER UPDATE ACADEMIC INFO OPERATION
     */

    let [isOpenProcessingPersonalInfoUpdateNotification, setIsOpenProcessingPersonalInfoUpdateNotification] = useState(false);

    function closeProcessingPersonalInfoUpdateNotification() {
        setIsOpenProcessingPersonalInfoUpdateNotification(false);
    }

    function openProcessingPersonalInfoUpdateNotification() {
        setIsOpenProcessingPersonalInfoUpdateNotification(true);
    }

    let [isOpenSuccessPersonalInfoUpdateNotification, setIsOpenSuccessPersonalInfoUpdateNotification] = useState(false);

    function closeSuccessPersonalInfoUpdateNotification() {
        setIsOpenSuccessPersonalInfoUpdateNotification(false);
        router.reload();
    }

    function openSuccessPersonalInfoUpdateNotification() {
        setIsOpenSuccessPersonalInfoUpdateNotification(true);
    }

    let [isOpenFailPersonalInfoUpdateNotification, setIsOpenFailPersonalInfoUpdateNotification] = useState(false);

    function closeFailPersonalInfoUpdateNotification() {
        setIsOpenFailPersonalInfoUpdateNotification(false);
    }

    function openFailPersonalInfoUpdateNotification() {
        setIsOpenFailPersonalInfoUpdateNotification(true);
    }

    const [name, setName] = useState(personalInfoResponse.name);
    const changeName = event => {
        const name = event.target.value;
        setName(name);
    }

    const [surname, setSurname] = useState(personalInfoResponse.surname);
    const changeSurname = event => {
        const surname = event.target.value;
        setSurname(surname);
    }

    const [tcNo, setTcNo] = useState(personalInfoResponse.tcNo);
    const changeTcNo = event => {
        const tcNo = event.target.value;
        setTcNo(tcNo);
    }

    const [birthday, setBirthday] = useState(personalInfoResponse.birthday);
    const changeBirthday = event => {
        const birthday = event.target.value;
        setBirthday(birthday);
    }

    const [email, setEmail] = useState(personalInfoResponse.email);
    const changeEmail = event => {
        const email = event.target.value;
        setEmail(email);
    }

    const [address, setAddress] = useState(personalInfoResponse.address);
    const changeAddress = event => {
        const address = event.target.value;
        setAddress(address);
    }

    const [personalPhoneNumber, setPersonalPhoneNumber] = useState(personalInfoResponse.phoneNumber);
    const changePersonalPhoneNumber = event => {
        const personalPhoneNumber = event.target.value;
        setPersonalPhoneNumber(personalPhoneNumber);
    }

    const updateTeacherPersonalInfo = async (event) => {
        openProcessingPersonalInfoUpdateNotification();

        event.preventDefault()

        const teacherId = academicInfoResponse.teacherId;
        const phoneNumber = personalPhoneNumber;
        const personalInfo = {name, surname, tcNo, birthday, email, phoneNumber, address};
        const teacherData = await TeacherController.updateTeacherPersonalInfo(operationUserId, teacherId, personalInfo);
        if (teacherData.success) {
            closeProcessingPersonalInfoUpdateNotification();
            openSuccessPersonalInfoUpdateNotification();
        } else {
            closeProcessingPersonalInfoUpdateNotification();
            openFailPersonalInfoUpdateNotification();
        }
    }

    const isTeacherPassiveOrDeleted = () => {
        return academicInfoResponse.status === TeacherStatus.PASSIVE || academicInfoResponse.status === TeacherStatus.DELETED
    }

    return (
        <>
            <SISTitle/>
            <OfficerNavbar/>
            <div>
                <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                    <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                        <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                            {personalInfoResponse.name} {personalInfoResponse.surname}
                        </a>
                        {TeacherStatus.getAll.map((teacherStatus) => (
                            academicInfoResponse.status === teacherStatus.enum
                                ?
                                teacherStatus.component
                                :
                                null
                        ))}
                        {(
                            academicInfoResponse.status === TeacherStatus.DELETED
                                ?
                                null
                                :
                                SisOperationButton.getDeleteButton(deleteTeacher, "KAYDI SİL")
                        )}

                        {(
                            academicInfoResponse.status === TeacherStatus.PASSIVE
                            ||
                            academicInfoResponse.status === TeacherStatus.DELETED
                                ?
                                null
                                :
                                SisOperationButton.getPassivateButton(passivateTeacher, "KAYDI DONDUR")
                        )}

                        {(
                            academicInfoResponse.status === TeacherStatus.ACTIVE
                            ||
                            academicInfoResponse.status === TeacherStatus.DELETED
                                ?
                                null
                                :
                                SisOperationButton.getActivateButton(activateTeacher, "KAYDI AKTİFLEŞTİR")
                        )}
                    </div>
                    <div className="md:col-span-1">
                        <form className="mt-10 max-w-3xl mx-auto space-y-6">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                        <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                            AKADEMİK BİLGİLER
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="teacher-number"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ÖĞRETMEN NUMARASI
                                            </label>
                                            <input
                                                type="text"
                                                name="teacherId"
                                                id="teacherId"
                                                defaultValue={academicInfoResponse.teacherId}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="sm:col-span-3 select-none">
                                            <label htmlFor="registration-date"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                KAYIT TARİHİ
                                            </label>
                                            <input
                                                type="text"
                                                name="registration-date"
                                                id="registration-date"
                                                defaultValue={academicInfoResponse.registrationDate}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="faculty"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                FAKÜLTESİ
                                            </label>
                                            <select
                                                id="faculty"
                                                name="faculty"
                                                autoComplete="faculty-name"
                                                disabled
                                                className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option defaultValue={facultyResponse.facultyId}
                                                        selected>{facultyResponse.name}</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="department"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                BÖLÜMÜ
                                            </label>
                                            <select
                                                onChange={changeDepartmentId}
                                                id="department-id"
                                                name="department-id"
                                                autoComplete="department-id"
                                                disabled={isTeacherPassiveOrDeleted()}
                                                className={isTeacherPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                }>
                                                {departments.map((department) => (
                                                    departmentResponse.departmentId === department.name
                                                        ?
                                                        <option key={department.departmentId}
                                                                value={department.departmentId}
                                                                selected>{department.name}</option>
                                                        :
                                                        <option
                                                            value={department.departmentId}>{department.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="department"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ÜNVANI
                                            </label>
                                            <select
                                                onChange={changeDegree}
                                                id="degree"
                                                name="degree"
                                                autoComplete="degree"
                                                disabled={isTeacherPassiveOrDeleted()}
                                                className={isTeacherPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                }>
                                                {TeacherDegree.getAll.map(tDegree => (
                                                    degree === tDegree.enum
                                                        ?
                                                        <option key={tDegree.enum}
                                                                value={tDegree.enum}
                                                                selected>{tDegree.tr}</option>
                                                        :
                                                        <option
                                                            value={tDegree.enum}>{tDegree.tr}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="role"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ROLÜ
                                            </label>
                                            <select
                                                onChange={changeRole}
                                                id="role"
                                                name="role"
                                                autoComplete="role"
                                                disabled={isTeacherPassiveOrDeleted()}
                                                className={isTeacherPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                }>
                                                {TeacherRole.getAll.map(tRole => (
                                                    academicInfoResponse.role === tRole.enum
                                                        ?
                                                        <option key={tRole.enum}
                                                                value={tRole.enum}
                                                                selected>{tRole.tr}</option>
                                                        :
                                                        <option
                                                            value={tRole.enum}>{tRole.tr}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-span-3">
                                            <label htmlFor="fieldOfStudy"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ÇALIŞMA ALANI
                                            </label>
                                            <input
                                                onChange={changeFieldOfStudy}
                                                type="text"
                                                name="fieldOfStudy"
                                                id="fieldOfStudy"
                                                defaultValue={academicInfoResponse.fieldOfStudy}
                                                disabled={isTeacherPassiveOrDeleted()}
                                                className={isTeacherPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        <div className="col-span-3">
                                            <label htmlFor="phone-number"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DAHİLİ NUMARA
                                            </label>
                                            <input
                                                onChange={(e) => {
                                                    let pNumberLength = e.target.value.length;
                                                    if (pNumberLength <= 1) {
                                                        e.target.value = "+90 (" + e.target.value;
                                                    }
                                                    if (pNumberLength > 7 && pNumberLength < 10) {
                                                        e.target.value = e.target.value + ") ";
                                                    }
                                                    if (pNumberLength > 12 && pNumberLength < 15) {
                                                        e.target.value = e.target.value + " ";
                                                    }
                                                    if (pNumberLength > 15 && pNumberLength < 18) {
                                                        e.target.value = e.target.value + " ";
                                                    }
                                                    changeAcademicPhoneNumber(e)
                                                }}
                                                type="text"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                defaultValue={academicInfoResponse.phoneNumber}
                                                disabled={isTeacherPassiveOrDeleted()}
                                                className={isTeacherPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="email-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                E-MAİL ADRESİ
                                            </label>
                                            <input
                                                type="text"
                                                name="email-address"
                                                id="email-address"
                                                defaultValue={academicInfoResponse.email}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>
                                        {(
                                            academicInfoResponse.modifiedDate !== null
                                                ?
                                                <div className="sm:col-span-6">
                                                    <a className="font-phenomenaRegular text-sis-blue text-xl">
                                                        Son Düzenlenme Tarihi : {academicInfoResponse.modifiedDate}
                                                    </a>
                                                </div>
                                                :
                                                null
                                        )}
                                    </div>
                                </div>
                                {(
                                    isTeacherPassiveOrDeleted()
                                        ?
                                        null
                                        :
                                        SisOperationButton.getUpdateButton(updateTeacherAcademicInfo, "GÜNCELLE")
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200"/>
                </div>
            </div>

            <div className="select-none mb-10 mt-10 sm:mt-0">
                <div className="md:mt-0 md:col-span-2">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form className="mt-4 max-w-3xl mx-auto space-y-6">
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                        <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                            KİŞİSEL BİLGİLER
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ADI
                                            </label>
                                            <input
                                                onChange={changeName}
                                                type="text"
                                                name="name"
                                                id="name"
                                                defaultValue={personalInfoResponse.name}
                                                disabled={isTeacherPassiveOrDeleted()}
                                                className={isTeacherPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                SOYADI
                                            </label>
                                            <input
                                                onChange={changeSurname}
                                                type="text"
                                                name="surname"
                                                id="surname"
                                                defaultValue={personalInfoResponse.surname}
                                                disabled={isTeacherPassiveOrDeleted()}
                                                className={isTeacherPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="tc-no"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                T.C. KİMLİK NUMARASI
                                            </label>
                                            <input
                                                onChange={changeTcNo}
                                                type="text"
                                                name="tc-no"
                                                id="tc-no"
                                                minLength="11"
                                                maxLength="11"
                                                pattern="[0-9]+"
                                                required
                                                defaultValue={personalInfoResponse.tcNo}
                                                disabled={isTeacherPassiveOrDeleted()}
                                                className={isTeacherPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="birthday"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DOĞUM TARİHİ
                                            </label>
                                            <input
                                                onChange={(e) => {
                                                    let birthdayLength = e.target.value.length;
                                                    if (birthdayLength > 1 && birthdayLength < 3) {
                                                        if (e.target.value <= 31) {
                                                            e.target.value = e.target.value + ".";
                                                        } else {
                                                            e.target.value = "";
                                                        }
                                                    }
                                                    if (birthdayLength > 4 && birthdayLength < 7) {
                                                        e.target.value = e.target.value + ".";
                                                    }
                                                    changeBirthday(e)
                                                }}
                                                type="text"
                                                name="birthday"
                                                id="birthday"
                                                required
                                                minLength="10"
                                                maxLength="10"
                                                defaultValue={personalInfoResponse.birthday}
                                                disabled={isTeacherPassiveOrDeleted()}
                                                className={isTeacherPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                E-MAİL ADRESİ
                                            </label>
                                            <input
                                                onChange={changeEmail}
                                                type="text"
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                defaultValue={personalInfoResponse.email}
                                                disabled={isTeacherPassiveOrDeleted()}
                                                className={isTeacherPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="phone-number"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                TELEFON NUMARASI
                                            </label>
                                            <input
                                                onChange={(e) => {
                                                    let pNumberLength = e.target.value.length;
                                                    if (pNumberLength <= 1) {
                                                        e.target.value = "+90 (" + e.target.value;
                                                    }
                                                    if (pNumberLength > 7 && pNumberLength < 10) {
                                                        e.target.value = e.target.value + ") ";
                                                    }
                                                    if (pNumberLength > 12 && pNumberLength < 15) {
                                                        e.target.value = e.target.value + " ";
                                                    }
                                                    if (pNumberLength > 15 && pNumberLength < 18) {
                                                        e.target.value = e.target.value + " ";
                                                    }
                                                    changePersonalPhoneNumber(e)
                                                }}
                                                type="text"
                                                name="phone-number"
                                                id="phone-number"
                                                required
                                                minLength="19"
                                                maxLength="19"
                                                defaultValue={personalInfoResponse.phoneNumber}
                                                disabled={isTeacherPassiveOrDeleted()}
                                                className={isTeacherPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="home-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                EV ADRESİ
                                            </label>
                                            <input
                                                onChange={changeAddress}
                                                type="text"
                                                name="home-address"
                                                id="home-address"
                                                autoComplete="home-address"
                                                defaultValue={personalInfoResponse.address}
                                                disabled={isTeacherPassiveOrDeleted()}
                                                className={isTeacherPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>
                                        {(
                                            personalInfoResponse.modifiedDate !== null
                                                ?
                                                <div className="sm:col-span-6">
                                                    <a className="font-phenomenaRegular text-sis-blue text-xl">
                                                        Son Düzenlenme Tarihi : {personalInfoResponse.modifiedDate}
                                                    </a>
                                                </div>
                                                :
                                                null
                                        )}
                                    </div>
                                </div>
                                {(
                                    isTeacherPassiveOrDeleted()
                                        ?
                                        null
                                        :
                                        SisOperationButton.getUpdateButton(updateTeacherPersonalInfo, "GÜNCELLE")
                                )}

                                {/**
                                 * Activate
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingActivateNotification}
                                    closeNotification={closeProcessingActivateNotification}
                                    title="Öğretmen Kaydı Aktifleştiriliyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessActivateNotification}
                                    closeNotification={closeSuccessActivateNotification}
                                    title="Öğretmen Kaydı Aktifleştirildi!"
                                    description="Öğretmen Kayıt Aktifleştirme İşlemi başarıyla gerçekleşti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailActivateNotification}
                                    closeNotification={closeFailActivateNotification}
                                    title="Öğretmen Kaydı Aktifleştirilemedi!"
                                    description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />

                                {/**
                                 * Passivate
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingPassivateNotification}
                                    closeNotification={closeProcessingPassivateNotification}
                                    title="Öğretmen Kaydı Pasifleştiriliyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessPassivateNotification}
                                    closeNotification={closeSuccessPassivateNotification}
                                    title="Öğretmen Kaydı Pasifleştirildi!"
                                    description="Öğretmen Kayıt Pasifleştirme İşlemi başarıyla gerçekleşti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailPassivateNotification}
                                    closeNotification={closeFailPassivateNotification}
                                    title="Öğretmen Kaydı Pasifleştirilemedi!"
                                    description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />

                                {/**
                                 * Delete
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingDeleteNotification}
                                    closeNotification={closeProcessingDeleteNotification}
                                    title="Öğretmen Kaydı Siliniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessDeleteNotification}
                                    closeNotification={closeSuccessDeleteNotification}
                                    title="Öğretmen Kaydı Silindi!"
                                    description="Öğretmen Kayıt Silme İşlemi başarıyla gerçekleşti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailDeleteNotification}
                                    closeNotification={closeFailDeleteNotification}
                                    title="Öğretmen Kaydı Silinemedi!"
                                    description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />

                                {/**
                                 * Academic Info Update
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingAcademicInfoUpdateNotification}
                                    closeNotification={closeProcessingAcademicInfoUpdateNotification}
                                    title="Öğretmen Akademik Bilgileri Güncelleniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessAcademicInfoUpdateNotification}
                                    closeNotification={closeSuccessAcademicInfoUpdateNotification}
                                    title="Öğretmen Akademik Bilgileri Güncellendi!"
                                    description="Öğretmen Akademik Bilgi Güncelleme İşlemi başarıyla gerçekleşti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailAcademicInfoUpdateNotification}
                                    closeNotification={closeFailAcademicInfoUpdateNotification}
                                    title="Öğretmen Akademik Bilgileri Güncellenemedi!"
                                    description="Lütfen girdiğiniz verileri kontrol ediniz.
                                    Verilerinizi doğru girdiyseniz
                                    sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />

                                {/**
                                 * Personal Info Update
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingPersonalInfoUpdateNotification}
                                    closeNotification={closeProcessingPersonalInfoUpdateNotification}
                                    title="Öğretmen Kişisel Bilgileri Güncelleniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessPersonalInfoUpdateNotification}
                                    closeNotification={closeSuccessPersonalInfoUpdateNotification}
                                    title="Öğretmen Kişisel Bilgileri Güncellendi!"
                                    description="Öğretmen Kişisel Bilgi Güncelleme İşlemi başarıyla gerçekleşti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailPersonalInfoUpdateNotification}
                                    closeNotification={closeFailPersonalInfoUpdateNotification}
                                    title="Öğretmen Kişisel Bilgileri Güncellenemedi!"
                                    description="Lütfen girdiğiniz verileri kontrol ediniz.
                                    Verilerinizi doğru girdiyseniz
                                    sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}