import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";

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

    const {departmentResponse, studentId, classLevel, degree, registrationDate, modifiedDate} = academicInfoResponse;
    const {name, surname, phoneNumber, email, tcNo, birthday, address} = personalInfoResponse;
    const {facultyResponse, totalClassLevel, isTherePreparatoryClass} = departmentResponse;

    const facultyId = facultyResponse.facultyId;
    const facultyName = facultyResponse.name;
    const departmentName = departmentResponse.name;

    const [studentsId, setStudentsId] = useState();
    const changeStudentId = event => {
        const studentsId = event.target.value;
        setStudentsId(studentsId);
    }

    const [studentClassLevel, setStudentClassLevel] = useState();
    const changeStudentClassLevel = event => {
        const studentClassLevel = event.target.value;
        setStudentClassLevel(studentClassLevel);
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

    const studentGraduate = async (event) => {
        event.preventDefault()
        const graduateRes = await fetch(`http://localhost:8585/student/graduate`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PATCH',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: 12004
                },
                studentId: studentsId
            }),
        });
        const graduateData = await graduateRes.json();
        return graduateData;
    }

    const studentActivate = async (event) => {
        event.preventDefault()
        const activateRes = await fetch(`http://localhost:8585/student/activate`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PATCH',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: 12004
                },
                studentId: studentsId
            }),
        });
        const activateData = await activateRes.json();
        return activateData;
    }

    const studentPassivate = async (event) => {
        event.preventDefault()
        const passivateRes = await fetch(`http://localhost:8585/student/passivate`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PATCH',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: 12004
                },
                studentId: studentsId
            }),
        });
        const passivateData = await passivateRes.json();
        return passivateData;
    }

    const studentDelete = async (event) => {
        event.preventDefault()
        const deleteRes = await fetch(`http://localhost:8585/student/delete`, {
            headers: {'Content-Type': 'application/json'},
            method: 'DELETE',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: 12004
                },
                studentId: studentsId
            }),
        });
        const deleteData = await deleteRes.json();
        return deleteData;
    }

    const studentUpdate = async (event) => {
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
        const updateData = await updateRes.json();
        return updateData;
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
                                    <div className="px-4 sm:px-0 bg-gray-50 rounded-xl">
                                        <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                            AKADEMİK BİLGİLER
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="student-number"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ÖĞRENCİ NUMARASI
                                            </label>
                                            <input
                                                onChange={changeStudentId}
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                Value={studentId}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
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
                                                Value={registrationDate}
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
                                    <button
                                        onClick={studentGraduate}
                                        type="submit"
                                        className=" float-left font-phenomenaBold mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                                    >
                                        MEZUN
                                    </button>
                                    <button
                                        onClick={studentActivate}
                                        type="submit"
                                        className="float-left font-phenomenaBold mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                                    >
                                        KAYDI AÇ
                                    </button>
                                    <button
                                        onClick={studentPassivate}
                                        type="submit"
                                        className="float-left font-phenomenaBold mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-blue hover:bg-sis-darkblue"
                                    >
                                        DONDUR
                                    </button>
                                    <button
                                        onClick={studentDelete}
                                        type="submit"
                                        className=" float-left font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-red-600 hover:bg-sis-darkblue"
                                    >
                                        SİL
                                    </button>
                                    <button
                                        onClick={studentUpdate}
                                        type="submit"
                                        className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                                    >
                                        GÜNCELLE
                                    </button>

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
                        <form className="px-4 max-w-2xl mx-auto space-y-6" action="#" method="POST">
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
                                                type="text"
                                                name="name"
                                                id="name"
                                                Value={name}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                SOYADI
                                            </label>
                                            <input
                                                type="text"
                                                name="surname"
                                                id="surname"
                                                Value={surname}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="tc-no"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                T.C. KİMLİK NUMARASI
                                            </label>
                                            <input
                                                type="text"
                                                name="tc-no"
                                                id="tc-no"
                                                Value={tcNo}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="birthday"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DOĞUM TARİHİ
                                            </label>
                                            <input
                                                type="text"
                                                name="birthday"
                                                id="birthday"
                                                Value={birthday}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                E-MAİL ADRESİ
                                            </label>
                                            <input
                                                type="text"
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                Value={email}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="phone-number"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                TELEFON NUMARASI
                                            </label>
                                            <input
                                                type="text"
                                                name="phone-number"
                                                id="phone-number"
                                                maxLength="13"
                                                Value={phoneNumber}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="home-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                EV ADRESİ
                                            </label>
                                            <input
                                                type="text"
                                                name="home-address"
                                                id="home-address"
                                                autoComplete="home-address"
                                                Value={address}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
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