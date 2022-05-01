import SisTeacherStorage from "../../../../../public/storage/teacher/SisTeacherStorage";
import UnauthorizedAccessPage from "../../../../401";
import SISTitle from "../../../../../public/components/page-titles";
import TeacherNavbar from "../../../../../public/components/navbar/teacher/teacher-navbar";
import FeatureToggleController from "../../../../../public/api/university/FeatureToggleController";
import FeatureToggleName from "../../../../../public/constants/university/FeatureToggleName";
import PageNotFound from "../../../../404";
import StudentLessonRegistrationController
    from "../../../../../public/api/student/lesson/registration/StudentLessonRegistrationController";
import LessonSemester from "../../../../../public/constants/lesson/LessonSemester";
import LessonCompulsoryOrElective from "../../../../../public/constants/lesson/LessonCompulsoryOrElective";
import LessonStatus from "../../../../../public/constants/lesson/LessonStatus";
import {useState} from "react";
import {useRouter} from "next/router";
import SuccessNotification from "../../../../../public/notifications/success";
import FailNotification from "../../../../../public/notifications/fail";
import ProcessNotification from "../../../../../public/notifications/process";
import TeacherRole from "../../../../../public/constants/teacher/TeacherRole";
import StudentLessonRegistrationStatus
    from "../../../../../public/constants/student/registration/StudentLessonRegistrationStatus";

export async function getServerSideProps(context) {
    const teacherId = SisTeacherStorage.getNumberWithContext(context);
    const teacherRole = SisTeacherStorage.getRoleWithContext(context);
    if (teacherId === undefined || teacherRole !== TeacherRole.ADVISOR) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const firstLessonRegistrationOperationsToggleData = await FeatureToggleController
        .isFeatureToggleEnabled(FeatureToggleName.FIRST_SEMESTER_LESSON_REGISTRATION_OPERATIONS)
    const secondLessonRegistrationOperationsToggleData = await FeatureToggleController
        .isFeatureToggleEnabled(FeatureToggleName.SECOND_SEMESTER_LESSON_REGISTRATION_OPERATIONS)

    const isFirstLessonRegistrationOperationsFeatureToggleEnabled = firstLessonRegistrationOperationsToggleData.response.isFeatureToggleEnabled;
    const isSecondLessonRegistrationOperationsFeatureToggleEnabled = secondLessonRegistrationOperationsToggleData.response.isFeatureToggleEnabled;
    if (!isFirstLessonRegistrationOperationsFeatureToggleEnabled && !isSecondLessonRegistrationOperationsFeatureToggleEnabled) {
        return {
            props: {
                isPagePermissionSuccess: true,
                isLessonRegistrationOperationsFeatureToggleEnabled: false
            }
        }
    }

    const {registrationId} = context.query;
    const studentsLessonRegistrationData = await StudentLessonRegistrationController.getStudentLessonRegistrationByRegistrationId(registrationId);
    if (studentsLessonRegistrationData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                isLessonRegistrationOperationsFeatureToggleEnabled: true,
                isDataFound: true,
                operationUserId: teacherId,
                studentsLessonRegistrationsData: studentsLessonRegistrationData.response
            }
        }
    } else {
        return {
            props: {
                isPagePermissionSuccess: true,
                isLessonRegistrationOperationsFeatureToggleEnabled: true,
                isDataFound: false
            }
        }
    }
}

export default function StudentLessonRegistrationDetail({
                                                           isPagePermissionSuccess,
                                                           isLessonRegistrationOperationsFeatureToggleEnabled,
                                                           isDataFound,
                                                           operationUserId,
                                                           studentsLessonRegistrationsData
                                                       }) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="teacher"/>
        )
    }

    if (!isLessonRegistrationOperationsFeatureToggleEnabled || !isDataFound) {
        return (
            <PageNotFound user="teacher"/>
        )
    }


    const registrationId = studentsLessonRegistrationsData.registrationId

    const router = useRouter()

    /**
     * LESSON REGISTRATION APPROVE OPERATION
     */

    let [isOpenProcessingApproveNotification, setIsOpenProcessingApproveNotification] = useState(false);

    function closeProcessingApproveNotification() {
        setIsOpenProcessingApproveNotification(false);
    }

    function openProcessingApproveNotification() {
        setIsOpenProcessingApproveNotification(true);
    }

    let [isOpenSuccessApproveNotification, setIsOpenSuccessApproveNotification] = useState(false);

    function closeSuccessApproveNotification() {
        setIsOpenSuccessApproveNotification(false);
        router.reload();
    }

    function openSuccessApproveNotification() {
        setIsOpenSuccessApproveNotification(true);
    }

    let [isOpenFailApproveNotification, setIsOpenFailApproveNotification] = useState(false);

    function closeFailApproveNotification() {
        setIsOpenFailApproveNotification(false);
    }

    function openFailApproveNotification() {
        setIsOpenFailApproveNotification(true);
    }
    const approveLessonRegistration = async (event) => {
        openProcessingApproveNotification();

        event.preventDefault();

        const lessonRegistrationData = await StudentLessonRegistrationController.approvedLessonRegistration(operationUserId, registrationId);
        if (lessonRegistrationData.success) {
            closeProcessingApproveNotification();
            openSuccessApproveNotification();

        } else {
            closeProcessingApproveNotification();
            openFailApproveNotification();
        }
    }

    /**
     * LESSON REGISTRATION REJECT OPERATION
     */
    let [isOpenProcessingRejectNotification, setIsOpenProcessingRejectNotification] = useState(false);

    function closeProcessingRejectNotification() {
        setIsOpenProcessingRejectNotification(false);
    }

    function openProcessingRejectNotification() {
        setIsOpenProcessingRejectNotification(true);
    }

    let [isOpenSuccessRejectNotification, setIsOpenSuccessRejectNotification] = useState(false);

    function closeSuccessRejectNotification() {
        setIsOpenSuccessRejectNotification(false);
        router.reload();
    }

    function openSuccessRejectNotification() {
        setIsOpenSuccessRejectNotification(true);
    }

    let [isOpenFailRejectNotification, setIsOpenFailRejectNotification] = useState(false);

    function closeFailRejectNotification() {
        setIsOpenFailRejectNotification(false);
    }

    function openFailRejectNotification() {
        setIsOpenFailRejectNotification(true);
    }


    const rejectLessonRegistration = async (event) => {
        openProcessingRejectNotification();

        event.preventDefault();

        const lessonRegistrationData = await StudentLessonRegistrationController.rejectedLessonRegistration(operationUserId, registrationId);
        if (lessonRegistrationData.success) {
            closeProcessingRejectNotification();
            openSuccessRejectNotification();
        } else {
            closeProcessingRejectNotification();
            openFailRejectNotification();
        }
    }

    return (
        <div>
            <SISTitle/>
            <TeacherNavbar/>
            <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                    <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                        {studentsLessonRegistrationsData.studentInfoResponse.name} {studentsLessonRegistrationsData.studentInfoResponse.surname}
                    </a>
                    {StudentLessonRegistrationStatus.getAll.map((rStatus) => (
                        studentsLessonRegistrationsData.status === rStatus.enum
                            ?
                            rStatus.component
                            :
                            null
                    ))}
                    {(
                        studentsLessonRegistrationsData.status !== StudentLessonRegistrationStatus.WAITING
                            ?
                            null
                            :
                            <button
                                onClick={rejectLessonRegistration}
                                type="submit"
                                className="font-phenomenaBold float-right ml-2 py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-fail hover:bg-sis-darkblue"
                            >
                                DERS KAYDINI REDDET
                            </button>
                    )}
                    {(
                        studentsLessonRegistrationsData.status !== StudentLessonRegistrationStatus.WAITING
                            ?
                            null
                            :
                            <button
                                onClick={approveLessonRegistration}
                                type="submit"
                                className="font-phenomenaBold float-right py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                            >
                                DERS KAYDINI ONAYLA
                            </button>
                    )}
                </div>
                {(
                    studentsLessonRegistrationsData.length !== 0
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
                                            {studentsLessonRegistrationsData.lessonResponses.map((studentLessonRegistration) => (
                                                <tr key={studentLessonRegistration.registrationId}>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{studentLessonRegistration.name}</div>
                                                                <div
                                                                    className="select-all font-phenomenaRegular text-lg text-gray-500">{studentLessonRegistration.lessonId}</div>
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
                {/**
                 * Approve
                 */}
                <ProcessNotification
                    isOpen={isOpenProcessingApproveNotification}
                    closeNotification={closeProcessingApproveNotification}
                    title="Öğrenci Ders Kayıt Onay İsteğiniz İşleniyor..."
                />

                <SuccessNotification
                    isOpen={isOpenSuccessApproveNotification}
                    closeNotification={closeSuccessApproveNotification}
                    title="Öğrenci Ders Kaydı Onaylandı!"
                    description="Öğrenci Ders Kaydı Onaylama İşlemi başarıyla gerçekleşti."
                />

                <FailNotification
                    isOpen={isOpenFailApproveNotification}
                    closeNotification={closeFailApproveNotification}
                    title="Öğrenci Ders Kaydı Onaylanamadı!"
                    description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                />

                {/**
                 * Reject
                 */}
                <ProcessNotification
                    isOpen={isOpenProcessingRejectNotification}
                    closeNotification={closeProcessingRejectNotification}
                    title="Öğrenci Ders Kayıt Reddetme İsteğiniz İşleniyor..."
                />

                <SuccessNotification
                    isOpen={isOpenSuccessRejectNotification}
                    closeNotification={closeSuccessRejectNotification}
                    title="Öğrenci Ders Kaydı Reddedildi!"
                    description="Öğrenci Ders Kaydı Reddetme İşlemi başarıyla gerçekleşti."
                />

                <FailNotification
                    isOpen={isOpenFailRejectNotification}
                    closeNotification={closeFailRejectNotification}
                    title="Öğrenci Ders Kaydı Reddedilemedi!"
                    description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                />
            </div>
        </div>
    )
}
