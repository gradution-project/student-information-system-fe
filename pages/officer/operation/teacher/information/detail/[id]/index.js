import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";
import {useRouter} from "next/router";
import {teacherDegrees, teacherRoles, teacherStatuses} from "../../../../../../../public/constants/teacher";
import {getOfficerNumberWithContext} from "../../../../../../../public/storage/officer";
import UnauthorizedAccessPage from "../../../../../../401";
import ProcessNotification from "../../../../../../../public/notifications/process";
import SuccessNotification from "../../../../../../../public/notifications/success";
import FailNotification from "../../../../../../../public/notifications/fail";

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
    const departmentResponses = await fetch(`${SIS_API_URL}/department?status=ACTIVE`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const teacherResponse = await fetch(`${SIS_API_URL}/teacher/` + id, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });

    const departmentDatas = await departmentResponses.json();
    const teacherData = await teacherResponse.json();
    if (teacherData.success && departmentDatas.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                operationUserId: officerId,
                SIS_API_URL: SIS_API_URL,
                departments: departmentDatas.response,
                teacher: teacherData.response
            }
        }
    }
}


export default function TeacherDetail({isPagePermissionSuccess, operationUserId, SIS_API_URL, departments, teacher}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const {academicInfoResponse} = teacher;
    const {personalInfoResponse} = teacher;

    const {
        departmentResponse,
        teacherId,
        degree,
        role,
        fieldOfStudy,
        registrationDate,
        status
    } = academicInfoResponse;
    const {name, surname, phoneNumber, email, tcNo, birthday, address} = personalInfoResponse;
    const {facultyResponse} = departmentResponse;

    const departmentId = departmentResponse.departmentId;
    const facultyId = facultyResponse.facultyId;
    const facultyName = facultyResponse.name;
    const departmentName = departmentResponse.name;
    const phone = academicInfoResponse.phoneNumber;

    const [teacherName, setTeacherName] = useState(name);
    const changeTeacherName = event => {
        const teacherName = event.target.value;
        setTeacherName(teacherName);
    }

    const [teacherSurname, setTeacherSurname] = useState(surname);
    const changeTeacherSurname = event => {
        const teacherSurname = event.target.value;
        setTeacherSurname(teacherSurname);
    }

    const [teacherTcNo, setTeacherTcNo] = useState(tcNo);
    const changeTeacherTcNo = event => {
        const teacherTcNo = event.target.value;
        setTeacherTcNo(teacherTcNo);
    }

    const [teacherBirthday, setTeacherBirthday] = useState(birthday);
    const changeTeacherBirthday = event => {
        const teacherBirthday = event.target.value;
        setTeacherBirthday(teacherBirthday);
    }

    const [teacherEmail, setTeacherEmail] = useState(email);
    const changeTeacherEmail = event => {
        const teacherEmail = event.target.value;
        setTeacherEmail(teacherEmail);
    }

    const [teacherAddress, setTeacherAddress] = useState(address);
    const changeTeacherAddress = event => {
        const teacherAddress = event.target.value;
        setTeacherAddress(teacherAddress);
    }

    const [teacherDegree, setTeacherDegree] = useState(degree);
    const changeTeacherDegree = event => {
        const teacherDegree = event.target.value;
        setTeacherDegree(teacherDegree);
    }

    const [teacherDepartmentId, setTeacherDepartmentId] = useState(departmentId);
    const changeTeacherDepartmentId = event => {
        const teacherDepartmentId = event.target.value;
        setTeacherDepartmentId(teacherDepartmentId);
    }

    const [teacherPhoneNumber, setTeacherPhoneNumber] = useState(phoneNumber);
    const changeTeacherPhoneNumber = event => {
        const teacherPhoneNumber = event.target.value;
        setTeacherPhoneNumber(teacherPhoneNumber);
    }

    const [teacherFieldOfStudy, setTeacherFieldOfStudy] = useState(fieldOfStudy);
    const changeTeacherFieldOfStudy = event => {
        const teacherFieldOfStudy = event.target.value;
        setTeacherFieldOfStudy(teacherFieldOfStudy);
    }

    const [teacherRole, setTeacherRole] = useState(role);
    const changeTeacherRole = event => {
        const teacherRole = event.target.value;
        setTeacherRole(teacherRole);
    }

    const [teacherPhone, setTeacherPhone] = useState(phone);
    const changeTeacherPhone = event => {
        const teacherPhone = event.target.value;
        setTeacherPhone(teacherPhone);
    }

    const router = useRouter();

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

    const teacherActivate = async (event) => {
        openProcessingActivateNotification();

        event.preventDefault()
        const activateRes = await fetch(`${SIS_API_URL}/teacher/activate`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PATCH',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: operationUserId
                },
                teacherId: teacherId
            }),
        });
        const activateData = await activateRes.json();
        if (activateData.success) {
            closeProcessingActivateNotification();
            openSuccessActivateNotification();
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

    const teacherPassivate = async (event) => {
        openProcessingPassivateNotification();

        event.preventDefault()
        const passivateRes = await fetch(`${SIS_API_URL}/teacher/passivate`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PATCH',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: operationUserId
                },
                teacherId: teacherId
            }),
        });
        const passivateData = await passivateRes.json();
        if (passivateData.success) {
            closeProcessingPassivateNotification();
            openSuccessPassivateNotification();
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

    const teacherDelete = async (event) => {
        openProcessingDeleteNotification();

        event.preventDefault()
        const deleteRes = await fetch(`${SIS_API_URL}/teacher/delete`, {
            headers: {'Content-Type': 'application/json'},
            method: 'DELETE',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: operationUserId
                },
                teacherId: teacherId
            }),
        });
        const deleteData = await deleteRes.json();
        if (deleteData.success) {
            closeProcessingDeleteNotification();
            openSuccessDeleteNotification();
        } else {
            closeProcessingDeleteNotification();
            openFailDeleteNotification();
        }
    }


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

    const teacherUpdateAcademic = async (event) => {
        openProcessingAcademicInfoUpdateNotification();

        event.preventDefault()
        const updateRes = await fetch(`${SIS_API_URL}/teacher/update/academic-info/${teacherId}`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PUT',
            body: JSON.stringify({
                academicInfoRequest: {
                    degree: teacherDegree,
                    departmentId: teacherDepartmentId,
                    fieldOfStudy: teacherFieldOfStudy,
                    phoneNumber: teacherPhone,
                    role: teacherRole
                },
                operationInfoRequest: {
                    userId: operationUserId
                }
            }),
        });
        const updateAcademicData = await updateRes.json();
        if (updateAcademicData.success) {
            closeProcessingAcademicInfoUpdateNotification();
            openSuccessAcademicInfoUpdateNotification();
        } else {
            closeProcessingAcademicInfoUpdateNotification();
            openFailAcademicInfoUpdateNotification();
        }
    }


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

    const teacherUpdatePersonal = async (event) => {
        openProcessingPersonalInfoUpdateNotification();

        event.preventDefault()

        const updatePersonalRes = await fetch(`${SIS_API_URL}/teacher/update/personal-info/${teacherId}`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PUT',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: operationUserId
                },
                personalInfoRequest: {
                    address: teacherAddress,
                    birthday: teacherBirthday,
                    email: teacherEmail,
                    name: teacherName,
                    phoneNumber: teacherPhoneNumber,
                    surname: teacherSurname,
                    tcNo: teacherTcNo
                }
            }),
        });
        const updatePersonalData = await updatePersonalRes.json();
        if (updatePersonalData.success) {
            closeProcessingPersonalInfoUpdateNotification();
            openSuccessPersonalInfoUpdateNotification();
        } else {
            closeProcessingPersonalInfoUpdateNotification();
            openFailPersonalInfoUpdateNotification();
        }
    }
    return (
        <>
            <SISTitle/>
            <OfficerNavbar/>
            <div>
                <div className="select-none px-28 py-5 mx-auto space-y-6">
                    <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                        <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                            {name} {surname}
                        </a>
                        {teacherStatuses.map((teacherStatus) => (
                            status === teacherStatus.enum
                                ?
                                teacherStatus.component
                                :
                                null
                        ))}
                        {(
                            status !== 'DELETED'
                                ?
                                <button
                                    onClick={teacherDelete}
                                    type="submit"
                                    className="block float-right font-phenomenaBold ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-red-600 hover:bg-sis-darkblue"
                                >
                                    KAYDI SİL
                                </button>
                                :
                                null
                        )}

                        {(
                            status !== 'PASSIVE' && status !== 'DELETED'
                                ?
                                <button
                                    onClick={teacherPassivate}
                                    type="submit"
                                    className="float-right font-phenomenaBold ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                                >
                                    KAYDI DONDUR
                                </button>
                                :
                                null
                        )}

                        {(
                            status !== 'ACTIVE' && status !== 'DELETED'
                                ?
                                <button
                                    onClick={teacherActivate}
                                    type="submit"
                                    className="float-right font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                                >
                                    KAYDI AKTİFLEŞTİR
                                </button>
                                :
                                null
                        )}
                    </div>
                    <div className="md:col-span-1">
                        <form className="mt-5 px-4 max-w-3xl mx-auto space-y-6">
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
                                                defaultValue={teacherId}
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
                                                defaultValue={registrationDate}
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
                                                <option defaultValue={facultyId} selected>{facultyName}</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="department"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                BÖLÜMÜ
                                            </label>
                                            <select
                                                onChange={changeTeacherDepartmentId}
                                                id="department-id"
                                                name="department-id"
                                                autoComplete="department-id"
                                                disabled={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"}
                                                className={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"
                                                    ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                }>
                                                {departments.map((department) => (
                                                    departmentName === department.name
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
                                            <label htmlFor="department"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ÜNVANI
                                            </label>
                                            <select
                                                onChange={changeTeacherDegree}
                                                id="degree"
                                                name="degree"
                                                autoComplete="degree"
                                                disabled={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"}
                                                className={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"
                                                    ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                }>
                                                {teacherDegrees.map(tDegree => (
                                                    degree === tDegree.enum
                                                        ?
                                                        <option value={tDegree.enum}
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
                                                onChange={changeTeacherRole}
                                                id="role"
                                                name="role"
                                                autoComplete="role"
                                                disabled={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"}
                                                className={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"
                                                    ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                }>
                                                {teacherRoles.map(tRole => (
                                                    role === tRole.enum
                                                        ?
                                                        <option value={tRole.enum}
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
                                                onChange={changeTeacherFieldOfStudy}
                                                type="text"
                                                name="fieldOfStudy"
                                                id="fieldOfStudy"
                                                defaultValue={fieldOfStudy}
                                                disabled={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"}
                                                className={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"
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
                                                    changeTeacherPhone(e)
                                                }}
                                                type="text"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                defaultValue={phone}
                                                disabled={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"}
                                                className={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"
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
                                    status !== "DELETED" && status !== "PASSIVE"
                                        ?
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <button
                                                onClick={teacherUpdateAcademic}
                                                type="submit"
                                                className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                                            >
                                                GÜNCELLE
                                            </button>
                                        </div>
                                        :
                                        null
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

            <div className="select-none mt-10 sm:mt-0">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form className="px-4 max-w-3xl mx-auto space-y-6">
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
                                                onChange={changeTeacherName}
                                                type="text"
                                                name="name"
                                                id="name"
                                                defaultValue={name}
                                                disabled={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"}
                                                className={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"
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
                                                onChange={changeTeacherSurname}
                                                type="text"
                                                name="surname"
                                                id="surname"
                                                defaultValue={surname}
                                                disabled={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"}
                                                className={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"
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
                                                onChange={changeTeacherTcNo}
                                                type="text"
                                                name="tc-no"
                                                id="tc-no"
                                                minLength="11"
                                                maxLength="11"
                                                pattern="[0-9]+"
                                                required
                                                defaultValue={tcNo}
                                                disabled={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"}
                                                className={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"
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
                                                    changeTeacherBirthday(e)
                                                }}
                                                type="text"
                                                name="birthday"
                                                id="birthday"
                                                required
                                                minLength="10"
                                                maxLength="10"
                                                defaultValue={birthday}
                                                disabled={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"}
                                                className={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"
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
                                                onChange={changeTeacherEmail}
                                                type="text"
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                defaultValue={personalInfoResponse.email}
                                                disabled={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"}
                                                className={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"
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
                                                    changeTeacherPhoneNumber(e)
                                                }}
                                                type="text"
                                                name="phone-number"
                                                id="phone-number"
                                                required
                                                minLength="19"
                                                maxLength="19"
                                                defaultValue={phoneNumber}
                                                disabled={status === "DELETED" || academicInfoResponse.status === "PASSIVE"}
                                                className={status === "DELETED" || academicInfoResponse.status === "PASSIVE"
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
                                                onChange={changeTeacherAddress}
                                                type="text"
                                                name="home-address"
                                                id="home-address"
                                                autoComplete="home-address"
                                                defaultValue={address}
                                                disabled={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"}
                                                className={academicInfoResponse.status === "DELETED" || academicInfoResponse.status === "PASSIVE"
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
                                    status !== "DELETED" && status !== "PASSIVE"
                                        ?
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <button
                                                onClick={teacherUpdatePersonal}
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