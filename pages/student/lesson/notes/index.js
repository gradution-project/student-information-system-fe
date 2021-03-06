import SisStudentStorage from "../../../../public/storage/student/SisStudentStorage";
import StudentLessonNoteController from "../../../../public/api/student/lesson/note/StudentLessonNoteController";
import StudentNavbar from "../../../../public/components/navbar/student/student-navbar";
import SISTitle from "../../../../public/components/page-titles";
import UnauthorizedAccessPage from "../../../401";
import LessonNoteStatus from "../../../../public/constants/lesson/note/LessonNoteStatus";

export async function getServerSideProps(context) {
    const studentId = SisStudentStorage.getNumberWithContext(context);
    if (studentId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const studentLessonsNotesData = await StudentLessonNoteController.getAllStudentLessonsNotesByStudentId(studentId);
    return {
        props: {
            isPagePermissionSuccess: true,
            studentLessonsNotesData: studentLessonsNotesData
        }
    }

}

export default function StudentLessonsNotesList({isPagePermissionSuccess, studentLessonsNotesData}) {
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
                studentLessonsNotesData.success
                    ?
                    <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                        <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                            <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                                NOTLARIM
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
                                                    ????RETMEN B??LG??LER??
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    DERS B??LG??LER??
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    V??ZE
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    F??NAL
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    B??T??NLEME
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    ORTALAMA
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    DURUMU
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {studentLessonsNotesData.response.map((studentLessonNotes) => (
                                                <tr key={studentLessonNotes.id}>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{studentLessonNotes.teacherResponse.name} {studentLessonNotes.teacherResponse.surname}</div>
                                                                <div
                                                                    className="select-all font-phenomenaRegular text-lg text-gray-500">{studentLessonNotes.teacherResponse.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{studentLessonNotes.lessonResponse.name}</div>
                                                                <div
                                                                    className="select-all font-phenomenaRegular text-lg text-gray-500">{studentLessonNotes.lessonResponse.lessonId}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaRegular text-2xl text-sis-darkblue">{studentLessonNotes.midtermNote}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaRegular text-2xl text-sis-darkblue">{studentLessonNotes.finalNote}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaRegular text-2xl text-sis-darkblue">{studentLessonNotes.resitNote}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaBold text-2xl text-sis-darkblue">{studentLessonNotes.meanOfNote}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span>
                                                            {LessonNoteStatus.getAll.map((lNoteStatus) => (
                                                                studentLessonNotes.status === lNoteStatus.enum
                                                                    ?
                                                                    lNoteStatus.miniComponent
                                                                    :
                                                                    null
                                                            ))}
                                                        </span>
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
                                    Ders Kayd??n??z Yap??lmad?????? i??in Notlar??n??z?? G??r??nt??leyemiyorsunuz!
                                </a>
                            </div>
                        </div>
                    </div>
            )}
        </div>
    )
}
