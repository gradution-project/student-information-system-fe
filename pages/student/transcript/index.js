import SisStudentStorage from "../../../public/storage/student/SisStudentStorage";
import UnauthorizedAccessPage from "../../401";
import SISTitle from "../../../public/components/page-titles";
import StudentNavbar from "../../../public/components/navbar/student/student-navbar";
import StudentTranscriptController from "../../../public/api/student/transcript/StudentTranscriptController";
import LessonSemester from "../../../public/constants/lesson/LessonSemester";
import LessonCompulsoryOrElective from "../../../public/constants/lesson/LessonCompulsoryOrElective";
import LessonNoteStatus from "../../../public/constants/lesson/note/LessonNoteStatus";

export async function getServerSideProps(context) {
    const studentId = SisStudentStorage.getNumberWithContext(context);
    if (studentId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const transcriptDetailData = await StudentTranscriptController.getStudentTranscriptDetailByStudentId(studentId);
    return {
        props: {
            isPagePermissionSuccess: true,
            transcriptDetailData: transcriptDetailData
        }
    }
}

export default function StudentTranscriptDetail({isPagePermissionSuccess, transcriptDetailData}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="student"/>
        )
    }

    const transcriptDetail = transcriptDetailData.response;

    return (
        <div>
            <SISTitle/>
            <StudentNavbar/>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="px-28 py-5 mx-auto space-y-6">
                    {(
                        transcriptDetailData.success === true
                            ?
                            <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                                <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                                    <a className="font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                                        TRANSKRİPT DETAYLARI
                                        <span
                                            className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-blue font-phenomenaBold text-2xl text-sis-white ">
                                            Genel Not Ortalaması : {transcriptDetail.meanOfAllNotes}
                                        </span>
                                    </a>
                                    <a
                                        href={transcriptDetail.fileDownloadUrl}
                                        className="font-phenomenaBold float-right py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                    >
                                        TRANSKRİPT DOSYASINI İNDİR
                                    </a>
                                </div>
                                {(
                                    Object.entries(transcriptDetail.studentLessonsSemestersNotesResponse).map(([semester, semesterResponse]) => (
                                        <>
                                            <div>
                                                {LessonSemester.getAll.map((lSemester) => (
                                                    semester === lSemester.enum
                                                        ?
                                                        <div
                                                            className="mt-8 px-10 py-4 bg-gray-50 rounded-2xl shadow-xl">
                                                            <a className="font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                                                                {lSemester.tr}
                                                                <span
                                                                    className="ml-4 select-none px-4 inline-flex leading-10 rounded-full bg-sis-blue font-phenomenaBold text-2xl text-sis-white ">
                                                                    Not Ortalaması : {semesterResponse.meanOfAllNotes}
                                                                </span>
                                                            </a>
                                                        </div>
                                                        :
                                                        null
                                                ))}
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="mb-0.5 -my-6 mt overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                    <div
                                                        className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                        <div
                                                            className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                            <table
                                                                className="bg-gray-50 min-w-full divide-y divide-gray-200">
                                                                <thead
                                                                    className="font-phenomenaBold text-xl text-gray-500 text-left">
                                                                <tr>
                                                                    <th
                                                                        scope="col"
                                                                        className="select-none px-6 py-3 tracking-wider"
                                                                    >
                                                                        DERS KODU
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="select-none px-6 py-3 tracking-wider"
                                                                    >
                                                                        DERS ADI
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
                                                                        ZORUNLU/SEÇMELİ
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="select-none px-6 py-3 tracking-wider"
                                                                    >
                                                                        NOT ORTALAMASI
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="select-none px-6 py-3 tracking-wider"
                                                                    >
                                                                        NOT DURUMU
                                                                    </th>
                                                                </tr>
                                                                </thead>
                                                                <tbody className="bg-white divide-y divide-gray-200">
                                                                {semesterResponse.studentTranscriptLessonNoteResponse.map((transcriptLessonNoteResponse) => (
                                                                    <tr key={transcriptLessonNoteResponse.lessonId}>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="flex items-center">
                                                                                <div className="ml-0.5">
                                                                                    <div
                                                                                        className="select-all font-phenomenaBold text-xl text-sis-darkblue">{transcriptLessonNoteResponse.lessonId}</div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="flex items-center">
                                                                                <div className="ml-0.5">
                                                                                    <div
                                                                                        className="font-phenomenaBold text-xl text-sis-darkblue">{transcriptLessonNoteResponse.name}</div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="flex items-center">
                                                                                <div className="ml-0.5">
                                                                                    <div
                                                                                        className="font-phenomenaBold text-xl text-sis-darkblue">{transcriptLessonNoteResponse.credit}</div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            {LessonCompulsoryOrElective.getAll.map((lCompulsory) => (
                                                                                transcriptLessonNoteResponse.compulsoryOrElective === lCompulsory.enum
                                                                                    ?
                                                                                    <div
                                                                                        className="font-phenomenaBold text-xl text-sis-darkblue">{lCompulsory.tr}</div>
                                                                                    :
                                                                                    null
                                                                            ))}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <div className="flex items-center">
                                                                                <div className="ml-0.5">
                                                                                    <div
                                                                                        className="font-phenomenaBold text-xl text-sis-darkblue">{transcriptLessonNoteResponse.meanOfNote}</div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                            <span>
                                                                                {LessonNoteStatus.getAll.map((lNoteStatus) => (
                                                                                    transcriptLessonNoteResponse.status === lNoteStatus.enum
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
                                        </>
                                    )))
                                }
                            </div>
                            :
                            <div
                                className="max-w-7xl mx-auto px-12 py-10 text-center bg-gray-50 rounded-2xl shadow-xl">
                                <a className="select-none font-phenomenaExtraBold text-4xl text-sis-fail">
                                    Kesinleştirilmiş Bir Notunuz Bulunmadığından Transcript Detayları Oluşturulamadı!
                                </a>
                            </div>
                    )}
                </div>
            </div>
        </div>
    )
}
