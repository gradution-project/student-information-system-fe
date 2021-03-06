import SISTitle from "../../../../../public/components/page-titles";
import StudentNavbar from "../../../../../public/components/navbar/student/student-navbar";
import UnauthorizedAccessPage from "../../../../401";
import SisStudentStorage from "../../../../../public/storage/student/SisStudentStorage";
import LessonScheduleFileController from "../../../../../public/api/schedule/file/lesson/LessonScheduleFileController";

export async function getServerSideProps(context) {
    const studentId = SisStudentStorage.getNumberWithContext(context);
    if (studentId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const departmentId = SisStudentStorage.getDepartmentNumberWithContext(context);
    const lessonScheduleFileData = await LessonScheduleFileController.getLessonScheduleFileDetailByLessonScheduleFileId(departmentId);
    if (lessonScheduleFileData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                lessonScheduleFile: lessonScheduleFileData.response
            }
        }
    } else {
        return {
            props: {
                isPagePermissionSuccess: true,
                lessonScheduleFile: null
            }
        }
    }
}

export default function StudentLessonScheduleFile({isPagePermissionSuccess, lessonScheduleFile}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user=""/>
        )
    }

    return (
        <div>
            <SISTitle/>
            <StudentNavbar/>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="px-28 py-5 mx-auto space-y-6">
                    {(
                        lessonScheduleFile !== null
                            ?
                            <div
                                className="max-w-7xl mx-auto h-52 px-12 py-10 text-center bg-gray-50 rounded-2xl shadow-xl">
                                <a className="select-none font-phenomenaExtraBold text-4xl text-sis-darkblue">
                                    {lessonScheduleFile.departmentResponse.name} Ders Program??
                                </a>
                                <div className="mt-10 content-center">
                                    <div>
                                        <a href={lessonScheduleFile.fileViewUrl}
                                           className="select-none font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                        >
                                            DOSYAYI G??R??NT??LE
                                        </a>
                                        <a href={lessonScheduleFile.fileDownloadUrl}
                                           className="select-none ml-2 font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                        >
                                            DOSYAYI ??ND??R
                                        </a>
                                    </div>
                                </div>
                            </div>
                            :
                            <div
                                className="max-w-7xl mx-auto px-12 py-10 text-center bg-gray-50 rounded-2xl shadow-xl">
                                <a className="select-none font-phenomenaExtraBold text-4xl text-sis-fail">
                                    Ders Program?? Hen??z Sisteme Y??klenmedi!
                                </a>
                            </div>
                    )}
                </div>
            </div>
        </div>
    )
}
