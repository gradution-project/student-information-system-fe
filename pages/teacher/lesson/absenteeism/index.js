import SisTeacherStorage from "../../../../public/storage/teacher/SisTeacherStorage";
import TeacherLessonController from "../../../../public/api/teacher/lesson/TeacherLessonController";
import UnauthorizedAccessPage from "../../../401";
import SISTitle from "../../../../public/components/page-titles";
import TeacherNavbar from "../../../../public/components/navbar/teacher/teacher-navbar";
import LessonSemester from "../../../../public/constants/lesson/LessonSemester";
import LessonCompulsoryOrElective from "../../../../public/constants/lesson/LessonCompulsoryOrElective";
import LessonStatus from "../../../../public/constants/lesson/LessonStatus";

export async function getServerSideProps(context) {
    const teacherId = SisTeacherStorage.getNumberWithContext(context);
    if (teacherId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const lessonsData = await TeacherLessonController.getTeacherLessonsByTeacherId(teacherId);
    if (lessonsData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                lessons: lessonsData.response
            }
        }
    }
}

export default function TeacherLessonsList({isPagePermissionSuccess, lessons}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="teacher"/>
        )
    }
    return (
        <div>
            <SISTitle/>
            <TeacherNavbar/>
            {(
                lessons.length !== 0
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
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    STATÜSÜ
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {lessons.map((lesson) => (
                                                <tr key={lesson.lessonResponse.lessonId}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-0.5">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.lessonResponse.name}</div>
                                                                <div
                                                                    className="select-all font-phenomenaRegular text-lg text-gray-500">{lesson.lessonResponse.lessonId}</div>
                                                                {LessonSemester.getAll.map((lSemester) => (
                                                                    lesson.lessonResponse.semester === lSemester.enum
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
                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.lessonResponse.departmentResponse.facultyResponse.name}</div>

                                                        <div
                                                            className="font-phenomenaRegular text-xl text-sis-darkblue">{lesson.lessonResponse.departmentResponse.name}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div
                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.lessonResponse.credit}</div>

                                                    </td>
                                                    {
                                                        lesson.lessonResponse.theoreticalHours !== 0
                                                            ?
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.lessonResponse.theoreticalHours} Saat
                                                                </div>
                                                            </td>
                                                            :
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                            </td>
                                                    }
                                                    {
                                                        lesson.lessonResponse.practiceHours !== 0
                                                            ?
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.lessonResponse.practiceHours} Saat
                                                                </div>
                                                            </td>
                                                            :
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                            </td>
                                                    }
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {LessonCompulsoryOrElective.getAll.map((lCompulsory) => (
                                                            lesson.lessonResponse.compulsoryOrElective === lCompulsory.enum
                                                                ?
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lCompulsory.tr}</div>
                                                                :
                                                                null
                                                        ))}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span>
                                                            {LessonStatus.getAll.map((lStatus) => (
                                                                lesson.lessonResponse.status === lStatus.enum
                                                                    ?
                                                                    lStatus.miniComponent
                                                                    :
                                                                    null
                                                            ))}
                                                        </span>
                                                    </td>
                                                    {(
                                                        lesson.lessonResponse.status === LessonStatus.ACTIVE
                                                            ?
                                                            <td className="ml-10 px-6 py-4 text-right font-phenomenaBold text-xl">
                                                                <a href={`/teacher/lesson/absenteeism/${lesson.lessonResponse.lessonId}/1`}
                                                                   className='text-sis-yellow'>
                                                                    DEVAMSIZLIK İŞLEMLERİ
                                                                </a>
                                                            </td>
                                                            :

                                                            <td className="ml-10 px-6 py-4 text-right font-phenomenaBold text-xl">
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
                                    Size Ait Kayıtlı Dersiniz Bulunmamaktadır!
                                </a>
                            </div>
                        </div>
                    </div>
            )}
        </div>
    )
}
