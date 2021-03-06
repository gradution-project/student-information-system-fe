import SISTitle from "../../../../../public/components/page-titles";
import StudentNavbar from "../../../../../public/components/navbar/student/student-navbar";
import UnauthorizedAccessPage from "../../../../401";
import SisStudentStorage from "../../../../../public/storage/student/SisStudentStorage";
import ExamScheduleFileController from "../../../../../public/api/schedule/file/exam/ExamScheduleFileController";

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
    const examScheduleFileData = await ExamScheduleFileController.getExamScheduleFileDetailByDepartmentId(departmentId);
    if (examScheduleFileData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                examScheduleFile: examScheduleFileData.response
            }
        }
    } else {
        return {
            props: {
                isPagePermissionSuccess: true,
                examScheduleFile: null
            }
        }
    }
}

export default function StudentExamScheduleFile({isPagePermissionSuccess, examScheduleFile}) {

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
                        examScheduleFile !== null
                            ?
                            <div
                                className="max-w-7xl mx-auto h-52 px-12 py-10 text-center bg-gray-50 rounded-2xl shadow-xl">
                                <a className="select-none font-phenomenaExtraBold text-4xl text-sis-darkblue">
                                    {examScheduleFile.departmentResponse.name} S??nav Program??
                                </a>
                                <div className="mt-10 content-center">
                                    <div>
                                        <a href={examScheduleFile.fileViewUrl}
                                           className="select-none font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                        >
                                            DOSYAYI G??R??NT??LE
                                        </a>
                                        <a href={examScheduleFile.fileDownloadUrl}
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
                                    S??nav Program?? Hen??z Sisteme Y??klenmedi!
                                </a>
                            </div>
                    )}
                </div>
            </div>
        </div>
    )
}
