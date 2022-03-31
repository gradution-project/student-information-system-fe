import SisTeacherStorage from "../../../../../public/storage/teacher/SisTeacherStorage";
import UnauthorizedAccessPage from "../../../../401";
import SISTitle from "../../../../../public/components/page-titles";
import TeacherNavbar from "../../../../../public/components/navbar/teacher/teacher-navbar";
import FeatureToggleController from "../../../../../public/api/university/FeatureToggleController";
import FeatureToggleName from "../../../../../public/constants/university/FeatureToggleName";
import PageNotFound from "../../../../404";
import StudentLessonRegistrationController from "../../../../../public/api/student/lesson/registration/StudentLessonRegistrationController";
import RegistrationStatus from "../../../../../public/constants/lesson/registration/RegistrationStatus";
import LessonSemester from "../../../../../public/constants/lesson/LessonSemester";
import LessonCompulsoryOrElective from "../../../../../public/constants/lesson/LessonCompulsoryOrElective";
import LessonStatus from "../../../../../public/constants/lesson/LessonStatus";

export async function getServerSideProps(context) {
    const teacherId = SisTeacherStorage.getNumberWithContext(context);
    if (teacherId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const lessonRegistrationOperationsToggleData = await FeatureToggleController.isFeatureToggleEnabled(FeatureToggleName.LESSON_REGISTRATION_OPERATIONS);
    const {registrationId} = context.query;
    const studentsLessonRegistrationData = await StudentLessonRegistrationController.getAllStudentsLessonRegistrationByRegistrationId(registrationId);
    if (studentsLessonRegistrationData.success) {
        return {
            props: {
                lessonRegistrations: studentsLessonRegistrationData.response,
                isPagePermissionSuccess: true,
                isRegistrationOperationsFeatureToggleEnabled: lessonRegistrationOperationsToggleData.response.isFeatureToggleEnabled,
                operationUserId: teacherId
            }
        }
    }
}

export default function StudentLessonRegistrationsList({
                                                           lessonRegistrations,
                                                           isPagePermissionSuccess,
                                                           operationUserId,
                                                           isRegistrationOperationsFeatureToggleEnabled,
                                                           }) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="teacher"/>
        )
    }

    if (!isRegistrationOperationsFeatureToggleEnabled) {
        return (
            <PageNotFound user="teacher"/>
        )
    }



    return (
        <div>
            <SISTitle/>
            <TeacherNavbar/>
            <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                    <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                        {lessonRegistrations.studentInfoResponse.name} {lessonRegistrations.studentInfoResponse.surname}
                    </a>
                    <button
                        type="submit"
                        className="font-phenomenaBold float-right ml-2 py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-fail hover:bg-sis-darkblue"
                    >
                        DERS KAYDINI REDDET
                    </button>
                    <button
                        type="submit"
                        className="font-phenomenaBold float-right py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                    >
                        DERS KAYDINI ONAYLA
                    </button>
                </div>
                {(
                    lessonRegistrations.length !== 0
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
                                                    DERS
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
                                            {lessonRegistrations.lessonResponses.map((studentLessonRegistration) => (
                                                <tr key={studentLessonRegistration.registrationId}>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{studentLessonRegistration.name}</div>
                                                                {LessonSemester.getAll.map((lSemester) => (
                                                                    studentLessonRegistration.semester === lSemester.enum
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
                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{studentLessonRegistration.credit}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {LessonCompulsoryOrElective.getAll.map((lCompulsory) => (
                                                            studentLessonRegistration.compulsoryOrElective === lCompulsory.enum
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
                                                                studentLessonRegistration.status === lStatus.enum
                                                                    ?
                                                                    lStatus.miniComponent
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
                        :
                        null
                )}
            </div>
        </div>
    )
}
