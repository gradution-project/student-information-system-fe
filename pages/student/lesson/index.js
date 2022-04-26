import SISTitle from "../../../public/components/page-titles";
import LessonSemester from "../../../public/constants/lesson/LessonSemester";
import UnauthorizedAccessPage from "../../401";
import LessonCompulsoryOrElective from "../../../public/constants/lesson/LessonCompulsoryOrElective";
import SisStudentStorage from "../../../public/storage/student/SisStudentStorage";
import StudentNavbar from "../../../public/components/navbar/student/student-navbar";
import StudentLessonController from "../../../public/api/student/lesson/StudentLessonController";

export async function getServerSideProps(context) {
    const studentId = SisStudentStorage.getNumberWithContext(context);
    if (studentId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false,
            }
        }
    }

    const studentLessonsData = await StudentLessonController.getAllStudentLessonsByStudentId(studentId);
    if (studentLessonsData.success) {
        return {
            props: {
                lessons: studentLessonsData.response,
                isPagePermissionSuccess: true
            }
        }
    }else {
        return {
            props: {
                lessons: studentLessonsData.success,
                isPagePermissionSuccess: true
            }
        }
    }
}

export default function StudentLessonsList({isPagePermissionSuccess, lessons}) {
    console.log(lessons)
    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="student"/>
        )
    }
    return (
        <div>
            <SISTitle/>
            <StudentNavbar/>
            {(
                lessons.length !== 0 && lessons.lessonsResponses
                    ?
                    <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                        <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                            <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                                DERSLERİM
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
                                                    DERS
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    AKADEMİK BİLGİLER
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    KREDİ
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
                                                    UYGULAMA
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    DERS DURUMU
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {lessons.lessonsResponses.map((lesson) => (
                                                <tr key={lesson.lessonId}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-0.5">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.name}</div>
                                                                <div
                                                                    className="select-all font-phenomenaRegular text-lg text-gray-500">{lesson.lessonId}</div>
                                                                {LessonSemester.getAll.map((lSemester) => (
                                                                    lesson.semester === lSemester.enum
                                                                        ?
                                                                        <div
                                                                            className="font-phenomenaBold text-xl text-gray-500">{lSemester.tr}</div>
                                                                        :
                                                                        null
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div
                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.departmentResponse.facultyResponse.name}</div>

                                                        <div
                                                            className="font-phenomenaRegular text-xl text-sis-darkblue">{lesson.departmentResponse.name}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div
                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.credit}</div>
                                                    </td>
                                                    {
                                                        lesson.theoreticalHours !== 0
                                                            ?
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.theoreticalHours} Saat
                                                                </div>
                                                            </td>
                                                            :
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                            </td>
                                                    }
                                                    {
                                                        lesson.practiceHours !== 0
                                                            ?
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.practiceHours} Saat
                                                                </div>
                                                            </td>
                                                            :
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                            </td>
                                                    }
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {LessonCompulsoryOrElective.getAll.map((lCompulsory) => (
                                                            lesson.compulsoryOrElective === lCompulsory.enum
                                                                ?
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lCompulsory.tr}</div>
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
                    <div
                        className="max-w-7xl mt-20 mx-auto px-12 py-10 text-center bg-gray-50 rounded-2xl shadow-xl">
                        <a className="select-none font-phenomenaExtraBold text-4xl text-sis-fail">
                            Henüz Ders Kaydınız Yapılmadı!
                        </a>
                    </div>
            )}
        </div>
    )
}
