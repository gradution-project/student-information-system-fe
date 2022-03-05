import SISTitle from "../../../../../public/components/page-titles";
import TeacherNavbar from "../../../../../public/components/navbar/teacher/teacher-navbar";
import UnauthorizedAccessPage from "../../../../401";
import {
    getTeacherDepartmentNumberWithContext,
    getTeacherNumberWithContext
} from "../../../../../public/storage/teacher";

export async function getServerSideProps(context) {
    const teacherId = getTeacherNumberWithContext(context);
    if (teacherId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const SIS_API_URL = process.env.SIS_API_URL;
    const departmentId = getTeacherDepartmentNumberWithContext(context);
    const lessonScheduleFileResponse = await fetch(`${SIS_API_URL}/lesson-schedule-file/department/` + departmentId, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const lessonScheduleFileData = await lessonScheduleFileResponse.json();
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

export default function TeacherLessonScheduleFile({isPagePermissionSuccess, lessonScheduleFile}) {

    if (isPagePermissionSuccess) {
        return (
            <div>
                <SISTitle/>
                <TeacherNavbar/>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="px-28 py-5 mx-auto space-y-6">
                        {(
                            lessonScheduleFile !== null
                                ?
                                <div
                                    className="max-w-7xl mx-auto h-52 px-12 py-10 text-center bg-gray-50 rounded-2xl shadow-xl">
                                    <a className="select-none font-phenomenaExtraBold text-4xl text-sis-darkblue">
                                        {lessonScheduleFile.departmentResponse.name} Ders Programı
                                    </a>
                                    <div className="mt-10 content-center">
                                        <div>
                                            <a href={lessonScheduleFile.fileViewUrl}
                                               className="select-none font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                            >
                                                DOSYAYI GÖRÜNTÜLE
                                            </a>
                                            <a href={lessonScheduleFile.fileDownloadUrl}
                                               className="select-none ml-2 font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                            >
                                                DOSYAYI İNDİR
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div
                                    className="max-w-7xl mx-auto px-12 py-10 text-center bg-gray-50 rounded-2xl shadow-xl">
                                    <a className="select-none font-phenomenaExtraBold text-4xl text-sis-fail">
                                        Ders Programı Henüz Sisteme Yüklenmedi!
                                    </a>
                                </div>
                        )}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <UnauthorizedAccessPage user="teacher"/>
        )
    }
}
