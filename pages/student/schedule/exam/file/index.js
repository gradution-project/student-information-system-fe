import SISTitle from "../../../../../public/components/page-titles";
import StudentNavbar from "../../../../../public/components/navbar/student/student-navbar";
import UnauthorizedAccessPage from "../../../../401";

export async function getServerSideProps(context) {
    const studentId = context.req.cookies['studentNumber']
    if (studentId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const SIS_API_URL = process.env.SIS_API_URL;
    const departmentId = context.req.cookies['studentDepartmentNumber']
    const examScheduleFileResponse = await fetch(`${SIS_API_URL}/exam-schedule-file/department/` + departmentId, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const examScheduleFileData = await examScheduleFileResponse.json();
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
                examScheduleFile: null
            }
        }
    }
}

export default function StudentExamScheduleFile({isPagePermissionSuccess, examScheduleFile}) {

    if (isPagePermissionSuccess) {
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
                                        {examScheduleFile.departmentResponse.name} Sınav Programı
                                    </a>
                                    <div className="mt-10 content-center">
                                        <div>
                                            <a href={examScheduleFile.fileViewUrl}
                                               className="select-none font-phenomenaBold py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                            >
                                                DOSYAYI GÖRÜNTÜLE
                                            </a>
                                            <a href={examScheduleFile.fileDownloadUrl}
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
                                        Sınav Programı Henüz Sisteme Yüklenmedi!
                                    </a>
                                </div>
                        )}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <UnauthorizedAccessPage user="student"/>
        )
    }
}
