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
import StudentController from "../../../../../../../public/api/student/StudentController";
import StudentStatus from "../../../../../../../public/constants/student/StudentStatus";
import SisOperationButton from "../../../../../../../public/components/buttons/SisOperationButton";
import StudentClassLevel from "../../../../../../../public/constants/student/StudentClassLevel";
import StudentDegree from "../../../../../../../public/constants/student/StudentDegree";
import PageNotFound from "../../../../../../404";
import StudentGraduationController from "../../../../../../../public/api/student/graduation/StudentGraduationController";

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
    const studentData = await StudentController.getStudentDetailByStudentId(id);
    const isStudentGraduationEnabledData = await  StudentGraduationController.isStudentGraduationEnabled(id);
    if (studentData.success && departmentsData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                isDataFound: true,
                operationUserId: officerId,
                departments: departmentsData.response,
                student: studentData.response,
                isStudentsGraduationEnabled: isStudentGraduationEnabledData.success
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


export default function StudentDetail({isPagePermissionSuccess, isDataFound, operationUserId, departments, student, isStudentsGraduationEnabled}) {
    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    if (!isDataFound) {
        return (
            <PageNotFound user="/officer"/>
        )
    }

    const {academicInfoResponse, personalInfoResponse} = student;
    const {departmentResponse} = academicInfoResponse;
    const {facultyResponse} = departmentResponse;


    const router = useRouter();


    /**
     * STUDENT GRADUATE OPERATION
     */

    let [isOpenProcessingGraduateNotification, setIsOpenProcessingGraduateNotification] = useState(false);

    function closeProcessingGraduateNotification() {
        setIsOpenProcessingGraduateNotification(false);
    }

    function openProcessingGraduateNotification() {
        setIsOpenProcessingGraduateNotification(true);
    }

    let [isOpenSuccessGraduateNotification, setIsOpenSuccessGraduateNotification] = useState(false);

    function closeSuccessGraduateNotification() {
        setIsOpenSuccessGraduateNotification(false);
        router.push("/officer/operation/student").then(() => router.reload());
    }

    function openSuccessGraduateNotification() {
        setIsOpenSuccessGraduateNotification(true);
    }

    let [isOpenFailGraduateNotification, setIsOpenFailGraduateNotification] = useState(false);

    function closeFailGraduateNotification() {
        setIsOpenFailGraduateNotification(false);
    }

    function openFailGraduateNotification() {
        setIsOpenFailGraduateNotification(true);
    }

    const startGraduationOperation = async (event) => {
        openProcessingGraduateNotification();

        event.preventDefault();

        const studentId = academicInfoResponse.studentId;
        const studentData = await StudentGraduationController.saveStudentGraduation(operationUserId, studentId);
        if (studentData.success) {
            closeProcessingGraduateNotification();
            openSuccessGraduateNotification();
        } else {
            closeProcessingGraduateNotification();
            openFailGraduateNotification();
        }
    }

    /**
     * STUDENT ACTIVATE OPERATION
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

    const studentActivate = async (event) => {
        openProcessingActivateNotification();

        event.preventDefault();

        const studentId = academicInfoResponse.studentId;
        const studentData = await StudentController.activateStudent(operationUserId, studentId);
        if (studentData.success) {
            closeProcessingActivateNotification();
            openSuccessActivateNotification();
        } else {
            closeProcessingActivateNotification();
            openFailActivateNotification();
        }
    }


    /**
     * STUDENT PASSIVATE OPERATION
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

    const studentPassivate = async (event) => {
        openProcessingPassivateNotification();

        event.preventDefault();

        const studentId = academicInfoResponse.studentId;
        const studentData = await StudentController.passivateStudent(operationUserId, studentId);
        if (studentData.success) {
            closeProcessingPassivateNotification();
            openSuccessPassivateNotification();
        } else {
            closeProcessingPassivateNotification();
            openFailPassivateNotification();
        }
    }


    /**
     * STUDENT DELETE OPERATION
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

    const studentDelete = async (event) => {
        openProcessingDeleteNotification();

        event.preventDefault();

        const studentId = academicInfoResponse.studentId;
        const studentData = await StudentController.deleteStudent(operationUserId, studentId);
        if (studentData.success) {
            closeProcessingDeleteNotification();
            openSuccessDeleteNotification();
        } else {
            closeProcessingDeleteNotification();
            openFailDeleteNotification();
        }
    }


    /**
     * STUDENT UPDATE ACADEMIC INFO OPERATION
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

    const [classLevel, setClassLevel] = useState(academicInfoResponse.classLevel);
    const changeClassLevel = event => {
        const classLevel = event.target.value;
        setClassLevel(classLevel);
    }

    const [degree, setDegree] = useState(academicInfoResponse.degree);
    const changeDegree = event => {
        const degree = event.target.value;
        setDegree(degree);
    }

    const updateStudentAcademicInfo = async (event) => {
        openProcessingAcademicInfoUpdateNotification();

        event.preventDefault();

        const studentId = academicInfoResponse.studentId;
        const academicInfo = {departmentId, classLevel, degree};
        const studentData = await StudentController.updateStudentAcademicInfo(operationUserId, studentId, academicInfo);
        if (studentData.success) {
            closeProcessingAcademicInfoUpdateNotification();
            openSuccessAcademicInfoUpdateNotification();
        } else {
            closeProcessingAcademicInfoUpdateNotification();
            openFailAcademicInfoUpdateNotification();
        }
    }


    /**
     * STUDENT UPDATE PERSONAL INFO OPERATION
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

    const [name, setName] = useState(departmentResponse.name);
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

    const [phoneNumber, setPhoneNumber] = useState(personalInfoResponse.phoneNumber);
    const changePhoneNumber = event => {
        const phoneNumber = event.target.value;
        setPhoneNumber(phoneNumber);
    }

    const [address, setAddress] = useState(personalInfoResponse.address);
    const changeAddress = event => {
        const address = event.target.value;
        setAddress(address);
    }

    const updateStudentPersonalInfo = async (event) => {
        openProcessingPersonalInfoUpdateNotification();

        event.preventDefault();

        const studentId = academicInfoResponse.studentId;
        const personalInfo = {name, surname, tcNo, birthday, email, phoneNumber, address};
        const studentData = await StudentController.updateStudentPersonalInfo(operationUserId, studentId, personalInfo);
        if (studentData.success) {
            closeProcessingPersonalInfoUpdateNotification();
            openSuccessPersonalInfoUpdateNotification();
        } else {
            closeProcessingPersonalInfoUpdateNotification();
            openFailPersonalInfoUpdateNotification();
        }
    }

    const isStudentPassiveOrDeleted = () => {
        return academicInfoResponse.status === StudentStatus.PASSIVE || academicInfoResponse.status === StudentStatus.DELETED
    }

    return (
        <>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                        <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                            {personalInfoResponse.name} {personalInfoResponse.surname}
                        </a>
                        {StudentStatus.getAll.map((studentStatus) => (
                            academicInfoResponse.status === studentStatus.enum
                                ?
                                studentStatus.component
                                :
                                null
                        ))}
                        {(
                            academicInfoResponse.status === StudentStatus.DELETED
                                ?
                                null
                                :
                                SisOperationButton.getDeleteButton(studentDelete, "KAYDI S??L")
                        )}
                        {(
                            academicInfoResponse.status === StudentStatus.PASSIVE
                            ||
                            academicInfoResponse.status === StudentStatus.DELETED
                                ?
                                null
                                :
                                SisOperationButton.getPassivateButton(studentPassivate, "KAYDI DONDUR")
                        )}
                        {(
                            academicInfoResponse.status === StudentStatus.ACTIVE
                            ||
                            academicInfoResponse.status === StudentStatus.DELETED
                                ?
                                null
                                :
                                SisOperationButton.getActivateButton(studentActivate, "KAYDI AKT??FLE??T??R")
                        )}
                        {(
                           !isStudentsGraduationEnabled
                                ?
                               null
                                :
                               SisOperationButton.getGraduateButton(startGraduationOperation, "MEZUN??YET ????LEM?? BA??LAT")
                        )}
                    </div>
                    <div className="md:col-span-1">
                        <form className="mt-10 max-w-3xl mx-auto space-y-6">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                        <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                            AKADEM??K B??LG??LER
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="student-number"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ????RENC?? NUMARASI
                                            </label>
                                            <input
                                                type="text"
                                                name="studentId"
                                                id="studentId"
                                                defaultValue={academicInfoResponse.studentId}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="sm:col-span-3 select-none">
                                            <label htmlFor="registration-date"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                KAYIT TAR??H??
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
                                                FAK??LTES??
                                            </label>
                                            <select
                                                id="faculty"
                                                name="faculty"
                                                autoComplete="faculty-name"
                                                disabled
                                                defaultValue={facultyResponse.name}
                                                className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option
                                                    value={facultyResponse.facultyId}>{facultyResponse.name}</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="departmentId"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                B??L??M??
                                            </label>
                                            <select
                                                onChange={changeDepartmentId}
                                                id="departmentId"
                                                name="department-id"
                                                autoComplete="department-id"
                                                disabled={isStudentPassiveOrDeleted()}
                                                className={isStudentPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                }>
                                                {departments.map((department) => (
                                                    departmentResponse.name === department.name
                                                        ?
                                                        <option value={department.departmentId}
                                                                selected>{department.name}</option>
                                                        :
                                                        <option
                                                            value={department.departmentId}>{department.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="degree"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DERECES??
                                            </label>
                                            <select
                                                onChange={changeDegree}
                                                id="degree"
                                                name="degree"
                                                autoComplete="degree"
                                                disabled={isStudentPassiveOrDeleted()}
                                                className={isStudentPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                }>
                                                {StudentDegree.getAll.map(sDegree => (
                                                    academicInfoResponse.degree === sDegree.enum
                                                        ?
                                                        <option key={sDegree.enum} value={sDegree.enum} selected>{sDegree.tr}</option>
                                                        :
                                                        <option key={sDegree.enum} value={sDegree.enum}>{sDegree.tr}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="student-class"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                SINIF
                                            </label>
                                            <select
                                                onChange={changeClassLevel}
                                                id="classLevel"
                                                name="classLevel"
                                                disabled={isStudentPassiveOrDeleted()}
                                                className={isStudentPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                }>
                                                {/*{(*/}
                                                {/*    isTherePreparatoryClass === true*/}
                                                {/*        ?*/}
                                                {/*        <option value="PREPARATORY">Haz??rl??k S??n??f??</option>*/}
                                                {/*        : */}
                                                {/*        null*/}
                                                {/*)}*/}
                                                {/*{studentClassLevels.map(studentClassLevel => (*/}
                                                {/*        classLevel === studentClassLevel.name*/}
                                                {/*            ?*/}
                                                {/*            <option value={studentClassLevel.enum} selected>{studentClassLevel.name}</option>*/}
                                                {/*            :*/}
                                                {/*            studentClassLevel.value <= totalClassLevel*/}
                                                {/*                ?*/}
                                                {/*                <option value={studentClassLevel.enum}>{studentClassLevel.name}</option>*/}
                                                {/*                : */}
                                                {/*                null*/}
                                                {/*))}*/}
                                                {StudentClassLevel.getAll.map(sClassLevel => (
                                                    academicInfoResponse.classLevel === sClassLevel.enum
                                                        ?
                                                        <option value={sClassLevel.enum}
                                                                selected>{sClassLevel.tr}</option>
                                                        :
                                                        <option value={sClassLevel.enum}>{sClassLevel.tr}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="email-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                E-MA??L ADRES??
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
                                                        Son D??zenlenme Tarihi : {academicInfoResponse.modifiedDate}
                                                    </a>
                                                </div>
                                                :
                                                null
                                        )}
                                    </div>
                                </div>

                                {(
                                    isStudentPassiveOrDeleted()
                                    ||
                                    academicInfoResponse.status === StudentStatus.GRADUATED
                                        ?
                                        null
                                        :
                                        SisOperationButton.getUpdateButton(updateStudentAcademicInfo, "G??NCELLE")
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
                                            K??????SEL B??LG??LER
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
                                                disabled={isStudentPassiveOrDeleted()}
                                                className={isStudentPassiveOrDeleted()
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
                                                disabled={isStudentPassiveOrDeleted()}
                                                className={isStudentPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="tc-no"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                T.C. K??ML??K NUMARASI
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
                                                disabled={isStudentPassiveOrDeleted()}
                                                className={isStudentPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="birthday"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DO??UM TAR??H??
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
                                                disabled={isStudentPassiveOrDeleted()}
                                                className={isStudentPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                E-MA??L ADRES??
                                            </label>
                                            <input
                                                onChange={changeEmail}
                                                type="text"
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                defaultValue={personalInfoResponse.email}
                                                disabled={isStudentPassiveOrDeleted()}
                                                className={isStudentPassiveOrDeleted()
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
                                                    changePhoneNumber(e)
                                                }}
                                                type="text"
                                                name="phone-number"
                                                id="phone-number"
                                                required
                                                minLength="19"
                                                maxLength="19"
                                                defaultValue={personalInfoResponse.phoneNumber}
                                                disabled={isStudentPassiveOrDeleted()}
                                                className={isStudentPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="home-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                EV ADRES??
                                            </label>
                                            <input
                                                onChange={changeAddress}
                                                type="text"
                                                name="home-address"
                                                id="home-address"
                                                autoComplete="home-address"
                                                defaultValue={personalInfoResponse.address}
                                                disabled={isStudentPassiveOrDeleted()}
                                                className={isStudentPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        {(
                                            personalInfoResponse.modifiedDate !== null
                                                ?
                                                <div className="sm:col-span-6">
                                                    <a className="font-phenomenaRegular text-sis-blue text-xl">
                                                        Son D??zenlenme Tarihi : {personalInfoResponse.modifiedDate}
                                                    </a>
                                                </div>
                                                :
                                                null
                                        )}
                                    </div>
                                </div>
                                {(
                                    isStudentPassiveOrDeleted()
                                    ||
                                    academicInfoResponse.status === StudentStatus.GRADUATED
                                        ?
                                        null
                                        :
                                        SisOperationButton.getUpdateButton(updateStudentPersonalInfo, "G??NCELLE")
                                )}

                                {/**
                                 * Graduate
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingGraduateNotification}
                                    closeNotification={closeProcessingGraduateNotification}
                                    title="????renci Mezuniyet ????lemi Ba??lat??l??yor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessGraduateNotification}
                                    closeNotification={closeSuccessGraduateNotification}
                                    title="????renci Mezuniyet ????lemi Ba??lat??ld??!"
                                    description="????renci Mezuniyet ????lemi ba??ar??yla ba??lat??ld??.
                                                 Mezuniyet ????lemleri ekran??ndan takip edebilirsiniz."
                                />

                                <FailNotification
                                    isOpen={isOpenFailGraduateNotification}
                                    closeNotification={closeFailGraduateNotification}
                                    title="????renci Mezuniyet ????lemi Ba??lat??lamad??!"
                                    description="Sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                />

                                {/**
                                 * Activate
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingActivateNotification}
                                    closeNotification={closeProcessingActivateNotification}
                                    title="????renci Kayd?? Aktifle??tiriliyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessActivateNotification}
                                    closeNotification={closeSuccessActivateNotification}
                                    title="????renci Kayd?? Aktifle??tirildi!"
                                    description="????renci Kay??t Aktifle??tirme ????lemi ba??ar??yla ger??ekle??ti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailActivateNotification}
                                    closeNotification={closeFailActivateNotification}
                                    title="????renci Kayd?? Aktifle??tirilemedi!"
                                    description="Sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                />

                                {/**
                                 * Passivate
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingPassivateNotification}
                                    closeNotification={closeProcessingPassivateNotification}
                                    title="????renci Kayd?? Pasifle??tiriliyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessPassivateNotification}
                                    closeNotification={closeSuccessPassivateNotification}
                                    title="????renci Kayd?? Pasifle??tirildi!"
                                    description="????renci Kay??t Pasifle??tirme ????lemi ba??ar??yla ger??ekle??ti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailPassivateNotification}
                                    closeNotification={closeFailPassivateNotification}
                                    title="????renci Kayd?? Pasifle??tirilemedi!"
                                    description="Sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                />

                                {/**
                                 * Delete
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingDeleteNotification}
                                    closeNotification={closeProcessingDeleteNotification}
                                    title="????renci Kayd?? Siliniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessDeleteNotification}
                                    closeNotification={closeSuccessDeleteNotification}
                                    title="????renci Kayd?? Silindi!"
                                    description="????renci Kay??t Silme ????lemi ba??ar??yla ger??ekle??ti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailDeleteNotification}
                                    closeNotification={closeFailDeleteNotification}
                                    title="????renci Kayd?? Silinemedi!"
                                    description="Sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                />

                                {/**
                                 * Academic Info Update
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingAcademicInfoUpdateNotification}
                                    closeNotification={closeProcessingAcademicInfoUpdateNotification}
                                    title="????renci Akademik Bilgileri G??ncelleniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessAcademicInfoUpdateNotification}
                                    closeNotification={closeSuccessAcademicInfoUpdateNotification}
                                    title="????renci Akademik Bilgileri G??ncellendi!"
                                    description="????renci Akademik Bilgi G??ncelleme ????lemi ba??ar??yla ger??ekle??ti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailAcademicInfoUpdateNotification}
                                    closeNotification={closeFailAcademicInfoUpdateNotification}
                                    title="????renci Akademik Bilgileri G??ncellenemedi!"
                                    description="L??tfen girdi??iniz verileri kontrol ediniz.
                                    Verilerinizi do??ru girdiyseniz
                                    sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                />

                                {/**
                                 * Personal Info Update
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingPersonalInfoUpdateNotification}
                                    closeNotification={closeProcessingPersonalInfoUpdateNotification}
                                    title="????renci Ki??isel Bilgileri G??ncelleniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessPersonalInfoUpdateNotification}
                                    closeNotification={closeSuccessPersonalInfoUpdateNotification}
                                    title="????renci Ki??isel Bilgileri G??ncellendi!"
                                    description="????renci Ki??isel Bilgi G??ncelleme ????lemi ba??ar??yla ger??ekle??ti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailPersonalInfoUpdateNotification}
                                    closeNotification={closeFailPersonalInfoUpdateNotification}
                                    title="????renci Ki??isel Bilgileri G??ncellenemedi!"
                                    description="L??tfen girdi??iniz verileri kontrol ediniz.
                                    Verilerinizi do??ru girdiyseniz
                                    sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}