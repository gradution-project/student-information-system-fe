import UnauthorizedAccessPage from "../../../401";
import SISTitle from "../../../../public/components/page-titles";
import PageNotFound from "../../../404";
import SisStudentStorage from "../../../../public/storage/student/SisStudentStorage";
import StudentLessonAbsenteeismController
    from "../../../../public/api/student/lesson/absenteeism/StudentLessonAbsenteeismController";
import StudentNavbar from "../../../../public/components/navbar/student/student-navbar";
import StudentLessonAbsenteeismHoursState
    from "../../../../public/constants/student/absenteeism/StudentLessonAbsenteeismHoursState";


export async function getServerSideProps(context) {
    const studentId = SisStudentStorage.getNumberWithContext(context);
    if (studentId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const studentLessonAbsenteeismData = await StudentLessonAbsenteeismController.getAllStudentLessonsAbsenteeismByStudentId(studentId);

    if (studentLessonAbsenteeismData) {
        return {
            props: {
                isPagePermissionSuccess: true,
                isDataFound: true,
                studentLessonAbsenteeism: studentLessonAbsenteeismData,
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

export default function StudentLessonAbsenteeismDetail({
                                                           isPagePermissionSuccess,
                                                           isDataFound,
                                                           studentLessonAbsenteeism,
                                                       }) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="student"/>
        )
    }

    if (!isDataFound) {
        return (
            <PageNotFound user="/student"/>
        )
    }

    return (
        <div>
            <SISTitle/>
            <StudentNavbar/>
            {(
                studentLessonAbsenteeism.success
                    ?
                    <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                        <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                            <a className="select-none mr-2 font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                                DEVAMSIZLIK DURUMU
                            </a>
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
                                                    ÖĞRETMEN
                                                    BİLGİLERİ
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    DERS
                                                    BİLGİLERİ
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    TEORİ
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    KALAN
                                                    DEVAMSIZLIK
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    UYGULAMA
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    KALAN
                                                    DEVAMSIZLIK
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {studentLessonAbsenteeism.response.map((studentLessonAbsenteeism) => (
                                                <tr key={studentLessonAbsenteeism.id}>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{studentLessonAbsenteeism.teacherResponse.name} {studentLessonAbsenteeism.teacherResponse.surname}</div>
                                                                <div
                                                                    className="select-all font-phenomenaRegular text-lg text-gray-500">{studentLessonAbsenteeism.teacherResponse.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{studentLessonAbsenteeism.lessonResponse.name}</div>
                                                                <div
                                                                    className="select-all font-phenomenaRegular text-lg text-gray-500">{studentLessonAbsenteeism.lessonResponse.lessonId}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {(
                                                        studentLessonAbsenteeism.theoreticalHoursState !== StudentLessonAbsenteeismHoursState.NOT_EXIST
                                                            ?
                                                            (
                                                                studentLessonAbsenteeism.theoreticalHoursState !== StudentLessonAbsenteeismHoursState.NOT_ENTERED
                                                                    ?
                                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                            <div className="ml-4">
                                                                                <div
                                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{studentLessonAbsenteeism.currentTheoreticalHours} Saat
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    :
                                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                            <div className="ml-4">
                                                                                <span
                                                                                    className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-success font-phenomenaBold text-lg text-sis-white"> Devamsızlığınız Bulunmamaktadır
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                            )
                                                            :
                                                            <td className="px-2 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="ml-4">
                                                                                <span
                                                                                    className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-fail font-phenomenaBold text-lg text-sis-white"> Ders Saati Bulunmuyor!
                                                                                </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                    )}
                                                    {(
                                                        studentLessonAbsenteeism.theoreticalHoursState !== StudentLessonAbsenteeismHoursState.NOT_EXIST
                                                            ?
                                                            <td className="px-2 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="ml-4">
                                                                        <div
                                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{studentLessonAbsenteeism.balanceTheoreticalHours} Saat
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            :
                                                            <td className="px-2 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="ml-4">
                                                                                <span
                                                                                    className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-fail font-phenomenaBold text-lg text-sis-white"> Ders Saati Bulunmuyor!
                                                                                </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                    )}
                                                    {(
                                                        studentLessonAbsenteeism.practiceHoursState !== StudentLessonAbsenteeismHoursState.NOT_EXIST
                                                            ?
                                                            (
                                                                studentLessonAbsenteeism.practiceHoursState !== StudentLessonAbsenteeismHoursState.NOT_ENTERED
                                                                    ?
                                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                            <div className="ml-4">
                                                                                <div
                                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{studentLessonAbsenteeism.currentPracticeHours} Saat
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    :
                                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                            <div className="ml-4">
                                                                                <span
                                                                                    className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-success font-phenomenaBold text-lg text-sis-white"> Devamsızlığınız Bulunmamaktadır
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                            )
                                                            :
                                                            <td className="px-2 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="ml-4">
                                                                                <span
                                                                                    className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-fail font-phenomenaBold text-lg text-sis-white"> Ders Saati Bulunmuyor!
                                                                                </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                    )}
                                                    {(studentLessonAbsenteeism.practiceHoursState !== StudentLessonAbsenteeismHoursState.NOT_EXIST
                                                            ?
                                                            <td className="px-2 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="ml-4">
                                                                        <div
                                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{studentLessonAbsenteeism.balancePracticeHours} Saat
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            :
                                                            <td className="px-2 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="ml-4">
                                                                                <span
                                                                                    className="select-none px-2 inline-flex leading-7 rounded-full bg-sis-fail font-phenomenaBold text-lg text-sis-white"> Ders Saati Bulunmuyor!
                                                                                </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                    )}
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
                                    Henüz Ders Kaydınız Olmadığı İçin Devamsızlık Durumunuzu Görüntüleyemezsiniz!
                                </a>
                            </div>
                        </div>
                    </div>
            )}
                </div>
                )
            }
