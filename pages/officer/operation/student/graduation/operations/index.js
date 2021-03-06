import SisOfficerStorage from "../../../../../../public/storage/officer/SisOfficerStorage";
import StudentGraduationController from "../../../../../../public/api/student/graduation/StudentGraduationController";
import StudentGraduationStatus from "../../../../../../public/constants/student/graduated/StudentGraduationStatus";
import UnauthorizedAccessPage from "../../../../../401";
import SISTitle from "../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../public/components/navbar/officer/officer-navbar";
import StudentDegree from "../../../../../../public/constants/student/StudentDegree";
import StudentClassLevel from "../../../../../../public/constants/student/StudentClassLevel";
import {useRouter} from "next/router";


export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }
    const studentsData = await StudentGraduationController.getAllStudentGraduationsByStatus(StudentGraduationStatus.ALL);
    if (studentsData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                students: studentsData.response
            }
        }
    }
}


export default function StudentGraduationList({isPagePermissionSuccess, students}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="teacher"/>
        )
    }

    const router = useRouter();

    const pushSavePage = async (event) => {
        event.preventDefault();
        await router.push('/officer/operation/student/graduated');
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            {(
                students.length !== 0
                    ?
                    <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                        <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                            <a className="font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                                MEZUN??YET ????LEM L??STES??
                            </a>
                            <button
                                type="submit"
                                onClick={pushSavePage}
                                className="font-phenomenaBold float-right py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                            >
                                MEZUN OLAN ????RENC??LER
                            </button>
                        </div>
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="bg-gray-50 min-w-full divide-y divide-gray-200">
                                            <thead className="font-phenomenaBold text-xl text-gray-500 text-left">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    ADI SOYADI
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    AKADEM??K B??LG??LER
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    B??L??M ADI
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    STAT??S??
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {students.map((student) => (
                                                <tr key={student.studentId}>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        {/*<td className="px-6 py-4 whitespace-nowrap">*/}
                                                        <div className="flex items-center">
                                                            {/*<div className="flex-shrink-0 h-10 w-10">*/}
                                                            {/*    <img className="h-10 w-10 rounded-full"*/}
                                                            {/*         src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"*/}
                                                            {/*         alt=""/>*/}
                                                            {/*</div>*/}
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{student.studentInfoResponse.name} {student.studentInfoResponse.surname}</div>
                                                                <div
                                                                    className="font-phenomenaRegular text-lg text-gray-500">{student.studentInfoResponse.studentId}</div>
                                                                <div
                                                                    className="font-phenomenaExtraLight text-lg text-gray-600">{student.studentInfoResponse.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {StudentDegree.getAll.map((sDegree) => (
                                                            student.studentInfoResponse.degree === sDegree.enum
                                                                ?
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{sDegree.tr}</div>
                                                                :
                                                                null
                                                        ))}

                                                        {StudentClassLevel.getAll.map((sClassLevel) => (
                                                            student.studentInfoResponse.classLevel === sClassLevel.enum
                                                                ?
                                                                <div
                                                                    className="font-phenomenaRegular text-xl text-sis-darkblue">{sClassLevel.tr}</div>
                                                                :
                                                                null
                                                        ))}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div
                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{student.studentInfoResponse.departmentResponse.name}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {StudentGraduationStatus.getAll.map((sStatus) => (
                                                            student.status === sStatus.enum
                                                                ?
                                                                sStatus.miniComponent
                                                                :
                                                                null
                                                        ))}
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
                    :
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="px-28 py-5 mx-auto space-y-6">
                            <div
                                className="max-w-7xl mx-auto px-12 py-10 text-center bg-gray-50 rounded-2xl shadow-xl">
                                <a className="select-none font-phenomenaExtraBold text-4xl text-sis-fail">
                                    Hen??z Mezuniyet ????lemi Ba??lat??lan ????renci Bulunmamaktad??r!
                                </a>
                            </div>
                        </div>
                    </div>
            )}
        </div>
    )
}
