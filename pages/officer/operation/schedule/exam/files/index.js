import SISTitle from "../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../public/components/navbar/officer/officer-navbar";
import {useRouter} from "next/router";
import SisOfficerStorage from "../../../../../../public/storage/officer/SisOfficerStorage";
import UnauthorizedAccessPage from "../../../../../401";
import ExamScheduleFileController from "../../../../../../public/api/exam-file/ExamScheduleFileController";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const facultyId = SisOfficerStorage.getFacultyNumberWithContext(context);
    const examScheduleFilesData = await ExamScheduleFileController.getAllExamScheduleFilesDetailByFacultyId(facultyId);
    if (examScheduleFilesData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                examScheduleFiles: examScheduleFilesData.response
            }
        }
    }
}

export default function ExamScheduleFileList({isPagePermissionSuccess, examScheduleFiles}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const router = useRouter();

    const pushSavePage = async (event) => {
        event.preventDefault();
        await router.push('/officer/operation/schedule/exam/file/save');
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                    <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                        SINAV PROGRAMLARI
                    </a>
                    <button
                        type="submit"
                        onClick={pushSavePage}
                        className="font-phenomenaBold float-right py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                    >
                        SINAV PROGRAMI YÜKLE
                    </button>
                </div>
                {(examScheduleFiles.length > 0
                        ?
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
                                                    BÖLÜM ADI
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    DOSYA ADI
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    DOSYA YÜKLENME TARİHİ
                                                </th>
                                            </tr>
                                            </thead>
                                            {examScheduleFiles.map((examScheduleFile) => (
                                                examScheduleFile !== null
                                                    ?
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr key={examScheduleFile.fileId}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div
                                                                className="font-phenomenaBold text-xl text-sis-darkblue">{examScheduleFile.departmentResponse.name}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div
                                                                className="font-phenomenaLight text-xl text-sis-darkblue">{examScheduleFile.fileName}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className="select-none px-4 inline-flex leading-8 rounded-full bg-sis-success font-phenomenaLight text-lg text-sis-white ">
                                                        {examScheduleFile.createdDate}
                                                </span>
                                                        </td>
                                                        <td className="ml-10 px-6 py-4 text-right font-phenomenaBold text-xl">
                                                            <a href={'/officer/operation/schedule/exam/file/' + examScheduleFile.departmentResponse.departmentId}
                                                               className='text-sis-yellow'>
                                                                DETAY
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                    :
                                                    null
                                            ))}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                )}
            </div>
        </div>
    )
}
