import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import {Fragment, useState} from "react";
import {useRouter} from "next/router";
import {Dialog, Transition} from "@headlessui/react";

export async function getServerSideProps({query}) {
    const {id} = query;
    const departmentResponses = await fetch("http://localhost:8585/department?status=ACTIVE", {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const studentResponse = await fetch("http://localhost:8585/student/" + id, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });

    const departmentDatas = await departmentResponses.json();
    const studentData = await studentResponse.json();
    if (studentData.success && departmentDatas.success) {
        console.log(departmentDatas.response)
        console.log(studentData.response)
        return {
            props: {
                departments: departmentDatas.response,
                student: studentData.response
            }
        }
    }
}

const studentDegrees = [
    {
        value: 'ASSOCIATE',
        name: 'Önlisans'
    },
    {
        value: 'UNDERGRADUATE',
        name: 'Lisans'
    },
    {
        value: 'POSTGRADUATE',
        name: 'Yüksek Lisans'
    },
    {
        value: 'DOCTORAL',
        name: 'Doktora'
    }
]

const studentClassLevels = [
    {
        enum: 'PREPARATORY',
        name: 'Hazırlık Sınıfı',
        value: 0
    },
    {
        enum: 'FIRST',
        name: '1. Sınıf',
        value: 1
    },
    {
        enum: 'SECOND',
        name: '2. Sınıf',
        value: 2
    },
    {
        enum: 'THIRD',
        name: '3. Sınıf',
        value: 3
    },
    {
        enum: 'FOURTH',
        name: '4. Sınıf',
        value: 4
    },
    {
        enum: 'FIFTH',
        name: '5. Sınıf',
        value: 5
    },
    {
        enum: 'SIXTH',
        name: '6. Sınıf',
        value: 6
    }
]

export default function StudentDetail({departments, student}) {
    const {academicInfoResponse} = student;
    const {personalInfoResponse} = student;

    const {
        departmentResponse,
        studentId,
        classLevel,
        degree,
        registrationDate,
        modifiedDate,
        status
    } = academicInfoResponse;
    const {name, surname, phoneNumber, email, tcNo, birthday, address} = personalInfoResponse;
    const {facultyResponse, totalClassLevel, isTherePreparatoryClass} = departmentResponse;

    const facultyId = facultyResponse.facultyId;
    const facultyName = facultyResponse.name;
    const departmentName = departmentResponse.name;

    const [studentName, setStudentName] = useState();
    const changeStudentName = event => {
        const studentName = event.target.value;
        setStudentName(studentName);
    }

    const [studentSurname, setStudentSurname] = useState();
    const changeStudentSurname = event => {
        const studentSurname = event.target.value;
        setStudentSurname(studentSurname);
    }

    const [studentTcNo, setStudentTcNo] = useState();
    const changeStudentTcNo = event => {
        const studentTcNo = event.target.value;
        setStudentTcNo(studentTcNo);
    }

    const [studentBirthday, setStudentBirthday] = useState();
    const changeStudentBirthday = event => {
        const studentBirthday = event.target.value;
        setStudentBirthday(studentBirthday);
    }

    const [studentEmail, setStudentEmail] = useState();
    const changeStudentEmail = event => {
        const studentEmail = event.target.value;
        setStudentEmail(studentEmail);
    }

    const [studentClassLevel, setStudentClassLevel] = useState();
    const changeStudentClassLevel = event => {
        const studentClassLevel = event.target.value;
        setStudentClassLevel(studentClassLevel);
    }

    const [studentAddress, setStudentAddress] = useState();
    const changeStudentAddress = event => {
        const studentAddress = event.target.value;
        setStudentAddress(studentAddress);
    }

    const [studentDegree, setStudentDegree] = useState();
    const changeStudentDegree = event => {
        const studentDegree = event.target.value;
        setStudentDegree(studentDegree);
    }

    const [studentDepartmentId, setStudentDepartmentId] = useState();
    const changeStudentDepartmentId = event => {
        const studentDepartmentId = event.target.value;
        setStudentDepartmentId(studentDepartmentId);
    }

    const [studentPhoneNumber, setStudentPhoneNumber] = useState();
    const changeStudentPhoneNumber = event => {
        const studentPhoneNumber = event.target.value;
        setStudentPhoneNumber(studentPhoneNumber);
    }

    const routerActive = useRouter();
    const routerPassive = useRouter();
    const routerGraduate = useRouter();
    const routerDelete = useRouter();
    const routerAcademic = useRouter();
    const routerPersonal = useRouter();

    let [isOpenSuccessActive, setIsOpenSuccessActive] = useState(false);

    function closeSuccessModalActive() {
        setIsOpenSuccessActive(false);
        routerActive.push("/officer/operation/student");
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

    let [isOpenSuccessGraduate, setIsOpenSuccessGraduate] = useState(false);

    function closeSuccessModalGraduate() {
        setIsOpenSuccessGraduate(false);
        routerGraduate.push("/officer/operation/student");
    }

    function openSuccessModalGraduate() {
        setIsOpenSuccessGraduate(true);
    }

    let [isOpenFailGraduate, setIsOpenFailGraduate] = useState(false);

    function closeFailModalGraduate() {
        setIsOpenFailGraduate(false);
    }

    function openFailModalGraduate() {
        setIsOpenFailGraduate(true);
    }

    let [isOpenProcessingGraduate, setIsOpenProcessingGraduate] = useState(false);

    function closeProcessingModalGraduate() {
        setIsOpenProcessingGraduate(false);
    }

    function openProcessingModalGraduate() {
        setIsOpenProcessingGraduate(true);
    }

    let [isOpenSuccessPassivate, setIsOpenSuccessPassivate] = useState(false);

    function closeSuccessModalPassivate() {
        setIsOpenSuccessPassivate(false);
        routerPassive.push("/officer/operation/student");
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
        routerDelete.push("/officer/operation/student");
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

    let [isOpenSuccessAcademic, setIsOpenSuccessAcademic] = useState(false);

    function closeSuccessModalAcademic() {
        setIsOpenSuccessAcademic(false);
        routerAcademic.push("/officer/operation/student");
    }

    function openSuccessModalAcademic() {
        setIsOpenSuccessAcademic(true);
    }

    let [isOpenFailAcademic, setIsOpenFailAcademic] = useState(false);

    function closeFailModalAcademic() {
        setIsOpenFailAcademic(false);
    }

    function openFailModalAcademic() {
        setIsOpenFailAcademic(true);
    }

    let [isOpenProcessingAcademic, setIsOpenProcessingAcademic] = useState(false);

    function closeProcessingModalAcademic() {
        setIsOpenProcessingAcademic(false);
    }

    function openProcessingModalAcademic() {
        setIsOpenProcessingAcademic(true);
    }

    let [isOpenSuccessPersonal, setIsOpenSuccessPersonal] = useState(false);

    function closeSuccessModalPersonal() {
        setIsOpenSuccessPersonal(false);
        routerPersonal.push("/officer/operation/student");
    }

    function openSuccessModalPersonal() {
        setIsOpenSuccessPersonal(true);
    }

    let [isOpenFailPersonal, setIsOpenFailPersonal] = useState(false);

    function closeFailModalPersonal() {
        setIsOpenFailPersonal(false);
    }

    function openFailModalPersonal() {
        setIsOpenFailPersonal(true);
    }

    let [isOpenProcessingPersonal, setIsOpenProcessingPersonal] = useState(false);

    function closeProcessingModalPersonal() {
        setIsOpenProcessingPersonal(false);
    }

    function openProcessingModalPersonal() {
        setIsOpenProcessingPersonal(true);
    }


    const studentGraduate = async (event) => {
        openProcessingModalGraduate();

        event.preventDefault()
        const graduateRes = await fetch(`http://localhost:8585/student/graduate`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PATCH',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: 12004
                },
                studentId: studentId
            }),
        });
        const graduateData = await graduateRes.json();
        if (graduateData.success) {
            closeProcessingModalGraduate();
            openSuccessModalGraduate()
        } else {
            closeProcessingModalGraduate();
            openFailModalGraduate();
        }
    }

    const studentActivate = async (event) => {
        openProcessingModalActive();

        event.preventDefault()
        const activateRes = await fetch(`http://localhost:8585/student/activate`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PATCH',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: 12004
                },
                studentId: studentId
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

    const studentPassivate = async (event) => {
        openProcessingModalPassivate();

        event.preventDefault()
        const passivateRes = await fetch(`http://localhost:8585/student/passivate`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PATCH',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: 12004
                },
                studentId: studentId
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

    const studentDelete = async (event) => {
        openProcessingModalDelete();

        event.preventDefault()
        const deleteRes = await fetch(`http://localhost:8585/student/delete`, {
            headers: {'Content-Type': 'application/json'},
            method: 'DELETE',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: 12004
                },
                studentId: studentId
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

    const studentUpdateAcademic = async (event) => {
        openProcessingModalAcademic();

        event.preventDefault()
        const updateRes = await fetch(`http://localhost:8585/student/update/academic-info/${studentId}`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PUT',
            body: JSON.stringify({
                academicInfoRequest: {
                    classLevel: studentClassLevel,
                    degree: studentDegree,
                    departmentId: studentDepartmentId
                },
                operationInfoRequest: {
                    userId: 12004
                }
            }),
        });
        const updateAcademicData = await updateRes.json();
        if (updateAcademicData.success) {
            closeProcessingModalAcademic();
            openSuccessModalAcademic()
        } else {
            closeProcessingModalAcademic();
            openFailModalAcademic();
        }
    }

    const studentUpdatePersonal = async (event) => {
        openProcessingModalPersonal();

        event.preventDefault()
        const updatePersonalRes = await fetch(`http://localhost:8585/student/update/personal-info/${studentId}`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PUT',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: 12004
                },
                personalInfoRequest: {
                    address: studentAddress,
                    birthday: studentBirthday,
                    email: studentEmail,
                    name: studentName,
                    phoneNumber: studentPhoneNumber,
                    surname: studentSurname,
                    tcNo: studentTcNo
                }
            }),
        });
        const updatePersonalData = await updatePersonalRes.json();
        if (updatePersonalData.success) {
            closeProcessingModalPersonal();
            openSuccessModalPersonal()
        } else {
            closeProcessingModalPersonal();
            openFailModalPersonal();
        }
    }
    return (
        <>
            <SISTitle/>
            <OfficerNavbar/>
            <div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="md:col-span-1">
                        <form className="mt-10 px-4 max-w-2xl mx-auto space-y-6">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div className="px-4 py-8 text-left bg-gray-50 rounded-xl ">
                                        <a className="select-none font-phenomenaExtraBold text-left text-3xl text-sis-darkblue">
                                            {name} {surname}
                                        </a>
                                        {(
                                            status !== 'Aktif'
                                                ?
                                                <button
                                                    onClick={studentActivate}
                                                    type="submit"
                                                    className="float-right font-phenomenaBold mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                                                >
                                                    KAYDI AKTİFLEŞTİR
                                                </button>
                                                :
                                                null
                                        )}
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="student-number"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ÖĞRENCİ NUMARASI
                                            </label>
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                value={studentId}
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
                                                value={registrationDate}
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
                                                <option value={facultyId} selected>{facultyName}</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="department"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                BÖLÜMÜ
                                            </label>
                                            <select
                                                onChange={changeStudentDepartmentId}
                                                id="department-id"
                                                name="department-id"
                                                autoComplete="department-id"
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >

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
                                                DERECESİ
                                            </label>
                                            <select
                                                onChange={changeStudentDegree}
                                                id="degree"
                                                name="degree"
                                                autoComplete="degree"
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                {studentDegrees.map(studentDegree => (
                                                    degree === studentDegree.name
                                                        ?
                                                        <option value={studentDegree.value}
                                                                selected>{studentDegree.name}</option>
                                                        :
                                                        <option
                                                            value={studentDegree.value}>{studentDegree.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="student-class"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                SINIF
                                            </label>
                                            <select
                                                onChange={changeStudentClassLevel}
                                                id="class"
                                                name="class"
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl">

                                                {/*{(*/}
                                                {/*    isTherePreparatoryClass === true*/}
                                                {/*        ?*/}
                                                {/*        <option value="PREPARATORY">Hazırlık Sınıfı</option>*/}
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
                                                {studentClassLevels.map(studentClassLevel => (
                                                    classLevel === studentClassLevel.name
                                                        ?
                                                        <option value={studentClassLevel.enum}
                                                                selected>{studentClassLevel.name}</option>
                                                        :
                                                        <option
                                                            value={studentClassLevel.enum}>{studentClassLevel.name}</option>
                                                ))}
                                            </select>
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
                                                value={email}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    {(
                                        status !== 'Mezun'
                                            ?
                                            <button
                                                onClick={studentGraduate}
                                                type="submit"
                                                className="float-left font-phenomenaBold mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl text-sis-white rounded-md text-white bg-sis-darkblue hover:bg-sis-blue"
                                            >
                                                MEZUN YAP
                                            </button>
                                            :
                                            null
                                    )}
                                    <button
                                        onClick={studentUpdateAcademic}
                                        type="submit"
                                        className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                                    >
                                        GÜNCELLE
                                    </button>
                                    {(
                                        status !== 'Pasif'
                                            ?
                                            <button
                                                onClick={studentPassivate}
                                                type="submit"
                                                className=" font-phenomenaBold ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-blue hover:bg-sis-darkblue"
                                            >
                                                KAYDI DONDUR
                                            </button>
                                            :
                                            null
                                    )}
                                    {(
                                        status !== 'Silinmiş'
                                            ?
                                            <button
                                                onClick={studentDelete}
                                                type="submit"
                                                className="font-phenomenaBold ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-red-600 hover:bg-sis-darkblue"
                                            >
                                                SİL
                                            </button>
                                            :
                                            null
                                    )}
                                </div>

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

            <div className="mt-10 sm:mt-0">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form className="px-4 max-w-2xl mx-auto space-y-6">
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
                                                onChange={changeStudentName}
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={name}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                SOYADI
                                            </label>
                                            <input
                                                onChange={changeStudentSurname}
                                                type="text"
                                                name="surname"
                                                id="surname"
                                                value={surname}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="tc-no"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                T.C. KİMLİK NUMARASI
                                            </label>
                                            <input
                                                onChange={changeStudentTcNo}
                                                type="text"
                                                name="tc-no"
                                                id="tc-no"
                                                value={tcNo}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="birthday"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DOĞUM TARİHİ
                                            </label>
                                            <input
                                                onChange={changeStudentBirthday}
                                                type="text"
                                                name="birthday"
                                                id="birthday"
                                                value={birthday}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                E-MAİL ADRESİ
                                            </label>
                                            <input
                                                onChange={changeStudentEmail}
                                                type="text"
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                value={email}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="phone-number"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                TELEFON NUMARASI
                                            </label>
                                            <input
                                                onChange={changeStudentPhoneNumber}
                                                type="text"
                                                name="phone-number"
                                                id="phone-number"
                                                maxLength="13"
                                                value={phoneNumber}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="home-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                EV ADRESİ
                                            </label>
                                            <input
                                                onChange={changeStudentAddress}
                                                type="text"
                                                name="home-address"
                                                id="home-address"
                                                autoComplete="home-address"
                                                value={address}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        onClick={studentUpdatePersonal}
                                        type="submit"
                                        className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                                    >
                                        GÜNCELLE
                                    </button>
                                </div>
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
                                                            Öğrenci Kayıt Aktifleştirme İşlemi Başarılı!
                                                        </div>
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                            Öğrenci Kayıt Aktifleştirme İşlemi başarıyla gerçekleşti.
                                                            Mesaj penceresini kapattıktan sonra öğrenci listeleme
                                                            ekranına yönlendirileceksiniz.
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
                                                            Öğrenci Kayıt Aktifleştirme İşlemi Başarısız!
                                                        </div>
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                            Lütfen girdiğiniz verileri kontrol ediniz.
                                                            Verilerinizi doğru girdiyseniz öğrenci kaydı
                                                            silinmiş veya mezun olmuş olabilir.
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
                                                        İsteğiniz İşleniyor...
                                                    </Dialog.Title>
                                                </div>
                                            </Transition.Child>
                                        </div>
                                    </Dialog>
                                </Transition>

                                <Transition appear show={isOpenSuccessGraduate} as={Fragment}>
                                    <Dialog
                                        as="div"
                                        className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                        onClose={closeSuccessModalGraduate}
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
                                                            Öğrenci Mezun İşlemi Başarılı!
                                                        </div>
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                            Öğrenci Mezun İşlemi başarıyla gerçekleşti.
                                                            Mesaj penceresini kapattıktan sonra öğrenci listeleme
                                                            ekranına yönlendirileceksiniz.
                                                        </p>
                                                    </div>
                                                </div>
                                            </Transition.Child>
                                        </div>
                                    </Dialog>
                                </Transition>
                                <Transition appear show={isOpenFailGraduate} as={Fragment}>
                                    <Dialog
                                        as="div"
                                        className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                        onClose={closeFailModalGraduate}
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
                                                            Öğrenci Mezun İşlemi Başarısız!
                                                        </div>
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                            Lütfen girdiğiniz verileri kontrol ediniz.
                                                            Verilerinizi doğru girdiyseniz öğrenci
                                                            kaydı silinmiş olabilir.
                                                        </p>
                                                    </div>
                                                </div>
                                            </Transition.Child>
                                        </div>
                                    </Dialog>
                                </Transition>

                                <Transition appear show={isOpenProcessingGraduate} as={Fragment}>
                                    <Dialog
                                        as="div"
                                        className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                        onClose={closeProcessingModalGraduate}
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
                                                            Öğrenci Kayıt Dondurma İşlemi Başarılı!
                                                        </div>
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                            Öğrenci Kayıt Dondurma İşlemi başarıyla gerçekleşti.
                                                            Mesaj penceresini kapattıktan sonra öğrenci listeleme
                                                            ekranına yönlendirileceksiniz.
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
                                                            Öğrenci Kayıt Dondurma İşlemi Başarısız!
                                                        </div>
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                            Lütfen girdiğiniz verileri kontrol ediniz.
                                                            Verilerinizi doğru girdiyseniz öğrenci kaydı
                                                            silinmiş veya öğrenci mezun olmuş olabilir.
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
                                                        İsteğiniz İşleniyor...
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
                                                            Öğrenci Silme İşlemi Başarılı!
                                                        </div>
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                            Öğrenci Silme İşlemi başarıyla gerçekleşti.
                                                            Mesaj penceresini kapattıktan sonra öğrenci listeleme
                                                            ekranına yönlendirileceksiniz.
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
                                                            Öğrenci Silme İşlemi Başarısız!
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
                                                        İsteğiniz İşleniyor...
                                                    </Dialog.Title>
                                                </div>
                                            </Transition.Child>
                                        </div>
                                    </Dialog>
                                </Transition>

                                <Transition appear show={isOpenSuccessAcademic} as={Fragment}>
                                    <Dialog
                                        as="div"
                                        className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                        onClose={closeSuccessModalAcademic}
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
                                                            Öğrenci Akademik Bilgi Güncelleme İşlemi Başarılı!
                                                        </div>
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                            Öğrenci Akademik Bilgi Güncellene İşlemi başarıyla
                                                            gerçekleşti.
                                                            Mesaj penceresini kapattıktan sonra öğrenci listeleme
                                                            ekranına yönlendirileceksiniz.
                                                        </p>
                                                    </div>
                                                </div>
                                            </Transition.Child>
                                        </div>
                                    </Dialog>
                                </Transition>
                                <Transition appear show={isOpenFailAcademic} as={Fragment}>
                                    <Dialog
                                        as="div"
                                        className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                        onClose={closeFailModalAcademic}
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
                                                            Öğrenci Akademik Bilgi Güncelleme İşlemi Başarısız!
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

                                <Transition appear show={isOpenProcessingAcademic} as={Fragment}>
                                    <Dialog
                                        as="div"
                                        className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                        onClose={closeProcessingModalAcademic}
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

                                <Transition appear show={isOpenSuccessPersonal} as={Fragment}>
                                    <Dialog
                                        as="div"
                                        className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                        onClose={closeSuccessModalPersonal}
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
                                                            Öğrenci Kişisel Bilgi Güncelleme İşlemi Başarılı!
                                                        </div>
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                            Öğrenci Kişisel Bilgi Güncelleme İşlemi başarıyla
                                                            gerçekleşti.
                                                            Mesaj penceresini kapattıktan sonra öğrenci listeleme
                                                            ekranına yönlendirileceksiniz.
                                                        </p>
                                                    </div>
                                                </div>
                                            </Transition.Child>
                                        </div>
                                    </Dialog>
                                </Transition>
                                <Transition appear show={isOpenFailPersonal} as={Fragment}>
                                    <Dialog
                                        as="div"
                                        className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                        onClose={closeFailModalPersonal}
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
                                                            Öğrenci Kişisel Bilgi Güncelleme İşlemi Başarısız!
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

                                <Transition appear show={isOpenProcessingPersonal} as={Fragment}>
                                    <Dialog
                                        as="div"
                                        className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                        onClose={closeProcessingModalPersonal}
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

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                </div>
            </div>
        </>
    )
}