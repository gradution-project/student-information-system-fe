import SISTitle from "../../../../public/components/page-titles";
import OfficerNavbar from "../../../../public/components/navbar/officer/officer-navbar";
import {useRouter} from "next/router";
import {useState} from "react";

export const getStaticProps = async () => {
    const studentResponse = await fetch("http://localhost:8585/student?status=ALL", {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const studentsData = await studentResponse.json();
    if (studentsData.success) {
        return {
            props: {students: studentsData.result}
        }
    }
}

export default function StudentList({students}) {

    const [setStudentNumber] = useState();

    const changeStudentNumber = event => {
        const studentNumber = event.target.value;
        setStudentNumber(studentNumber);
    }

    const router = useRouter();

    const pushSavePage = async (event) => {
        event.preventDefault();
        await router.push('/officer/operation/student/save');
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="px-28 py-5 mx-auto space-y-6">
                <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                    <a className="font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                        ÖĞRENCİ LİSTESİ
                    </a>
                    <button
                        type="submit"
                        onClick={pushSavePage}
                        className="font-phenomenaBold float-right py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success"
                    >
                        ÖĞRENCİ EKLE
                    </button>
                </div>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="bg-gray-50 min-w-full divide-y divide-gray-200">
                                    <thead className="">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            ADI SOYADI
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            ROLÜ
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            BÖLÜMÜ
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            SINIFI
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            STATÜSÜ
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {students.map((student) => (
                                        <tr key={student.studentId}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full"
                                                             src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                                                             alt=""/>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div
                                                            className="text-sm font-medium text-gray-900">{student.name} {student.surname}</div>
                                                        <div className="text-sm text-gray-500">{student.studentId}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{student.degree}</div>
                                                <div className="text-sm text-gray-500">{student.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{student.departmentId}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{student.classLevel}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {student.status}
                                                </span>
                                            </td>
                                            <td className="ml-10 px-6 py-4 text-right font-phenomenaBold text-xl">
                                                <a href={'/officer/operation/teacher/detail/' + student.studentId}
                                                   className='text-sis-yellow'>
                                                    DETAY
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
