import StudentNavbar from "../../../../public/components/navbar/student/student-navbar";
import SISTitle from "../../../../public/components/page-titles";
import UnauthorizedAccessPage from "../../../401";
import LessonStatus from "../../../../public/constants/lesson/LessonStatus";
import LessonCompulsoryOrElective from "../../../../public/constants/lesson/LessonCompulsoryOrElective";
import FeatureToggleController from "../../../../public/api/university/FeatureToggleController";
import SisStudentStorage from "../../../../public/storage/student/SisStudentStorage";
import LessonController from "../../../../public/api/lesson/LessonController";
import FeatureToggleName from "../../../../public/constants/university/FeatureToggleName";
import LessonSemester from "../../../../public/constants/lesson/LessonSemester";
import {Tab} from "@headlessui/react";
import StudentClassLevel from "../../../../public/constants/student/StudentClassLevel";
import {useState} from "react";
import PageNotFound from "../../../404";
import FailNotification from "../../../../public/notifications/fail";
import SuccessNotification from "../../../../public/notifications/success";
import StudentLessonRegistrationController
    from "../../../../public/api/student/lesson/registration/StudentLessonRegistrationController";
import ProcessNotification from "../../../../public/notifications/process";
import StudentLessonRegistrationStatus
    from "../../../../public/constants/student/registration/StudentLessonRegistrationStatus";
import {useRouter} from "next/router";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export async function getServerSideProps(context) {
    const studentId = SisStudentStorage.getNumberWithContext(context);
    if (studentId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false,
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
    const registrationIdData = await StudentLessonRegistrationController.getStudentLessonRegistrationIdByStudentId(studentId);
    if (registrationIdData.success) {
        const registrationId = registrationIdData.response
        const registrationData = await StudentLessonRegistrationController.getStudentLessonRegistrationByRegistrationId(registrationId);
        if (registrationData.success && registrationData.response.status !== StudentLessonRegistrationStatus.REJECTED) {
            return {
                props: {
                    isPagePermissionSuccess: true,
                    isLessonRegistrationOperationsFeatureToggleEnabled: true,
                    isLessonRegistrationExist: true,
                    registrationData: registrationData
                }
            }
        }
    }

    const lessonsData = await LessonController.getAllLessonsByStatus(LessonStatus.ACTIVE)
    if (lessonsData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                isLessonRegistrationOperationsFeatureToggleEnabled: true,
                isFirstLessonRegistrationOperationsFeatureToggleEnabled: isFirstLessonRegistrationOperationsFeatureToggleEnabled,
                isSecondLessonRegistrationOperationsFeatureToggleEnabled: isSecondLessonRegistrationOperationsFeatureToggleEnabled,
                isLessonRegistrationExist: false,
                lessons: lessonsData.response,
                operationUserId: studentId,
                studentId: studentId
            }
        }
    }
}

export default function StudentLessonRegistration({
                                                      isPagePermissionSuccess,
                                                      isLessonRegistrationOperationsFeatureToggleEnabled,
                                                      isFirstLessonRegistrationOperationsFeatureToggleEnabled,
                                                      isSecondLessonRegistrationOperationsFeatureToggleEnabled,
                                                      isLessonRegistrationExist,
                                                      registrationData,
                                                      lessons,
                                                      operationUserId,
                                                      studentId
                                                  }) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="student"/>
        )
    }

    if (!isLessonRegistrationOperationsFeatureToggleEnabled) {
        return (
            <PageNotFound user="student"/>
        )
    }

    const router = useRouter();

    let [isOpenSuccessChooseLessonNotification, setIsOpenSuccessChooseLessonNotification] = useState(false);

    function closeSuccessChooseLessonNotification() {
        setIsOpenSuccessChooseLessonNotification(false);
    }

    function openSuccessChooseLessonNotification() {
        setIsOpenSuccessChooseLessonNotification(true);
    }

    let [isOpenFailChooseLessonNotification, setIsOpenFailChooseLessonNotification] = useState(false);

    function closeFailChooseLessonNotification() {
        setIsOpenFailChooseLessonNotification(false);
    }

    function openFailChooseLessonNotification() {
        setIsOpenFailChooseLessonNotification(true);
    }

    let [isOpenProcessingRegistrationLessonNotification, setIsOpenProcessingRegistrationLessonNotification] = useState(false);

    function closeProcessingRegistrationLessonNotification() {
        setIsOpenProcessingRegistrationLessonNotification(false);
    }

    function openProcessingRegistrationLessonNotification() {
        setIsOpenProcessingRegistrationLessonNotification(true);
    }

    let [isOpenSuccessRegistrationLessonNotification, setIsOpenSuccessRegistrationLessonNotification] = useState(false);

    function closeSuccessRegistrationLessonNotification() {
        setIsOpenSuccessRegistrationLessonNotification(false);
        router.reload();
    }

    function openSuccessRegistrationLessonNotification() {
        setIsOpenSuccessRegistrationLessonNotification(true);
    }

    let [isOpenFailRegistrationLessonNotification, setIsOpenFailRegistrationLessonNotification] = useState(false);

    function closeFailRegistrationLessonNotification() {
        setIsOpenFailRegistrationLessonNotification(false);
    }

    function openFailRegistrationLessonNotification() {
        setIsOpenFailRegistrationLessonNotification(true);
    }

    const [studentLessons] = useState([])
    const [studentLessonIds] = useState([])
    const insertLesson = async (lesson) => {
        let isIdExistInCurrentList = false;
        {
            (
                studentLessonIds.map((studentLessonId) => {
                    if (studentLessonId === lesson.lessonId) {
                        isIdExistInCurrentList = true
                        openFailChooseLessonNotification()
                    }
                })
            )
        }
        if (!isIdExistInCurrentList) {
            studentLessonIds.push(lesson.lessonId)
            studentLessons.push(lesson)
            openSuccessChooseLessonNotification()
        }
    }

    const saveRegistrationLesson = async (event) => {
        openProcessingRegistrationLessonNotification();

        event.preventDefault();
        const studentData = await StudentLessonRegistrationController.saveStudentLessonRegistration(operationUserId, studentLessonIds, studentId);
        if (studentData.success) {
            closeProcessingRegistrationLessonNotification();
            openSuccessRegistrationLessonNotification();
        } else {
            closeProcessingRegistrationLessonNotification();
            openFailRegistrationLessonNotification();
        }
    }

    let studentDepartmentNumber = SisStudentStorage.getDepartmentNumber();

    let [lessonsBySemesters] = useState({
        First: [],
        Second: [],
        Third: [],
        Fourth: []
    })

    {
        !isLessonRegistrationExist
        &&
        lessonsBySemesters.First.length === 0
        &&
        lessonsBySemesters.Second.length === 0
        &&
        lessonsBySemesters.Third.length === 0
        &&
        lessonsBySemesters.Fourth.length === 0
            ?
            isFirstLessonRegistrationOperationsFeatureToggleEnabled
                ?
                lessons.map((lesson) => (
                    (studentDepartmentNumber == lesson.departmentResponse.departmentId
                            ?
                            lesson.semester === LessonSemester.FIRST
                                ?
                                lessonsBySemesters.First.push(lesson)
                                :
                                lesson.semester === LessonSemester.THIRD
                                    ?
                                    lessonsBySemesters.Second.push(lesson)
                                    :
                                    lesson.semester === LessonSemester.FIFTH
                                        ?
                                        lessonsBySemesters.Third.push(lesson)
                                        :
                                        lesson.semester === LessonSemester.SEVENTH
                                            ?
                                            lessonsBySemesters.Fourth.push(lesson)
                                            :
                                            null
                            :
                            null
                    )
                ))
                :
                isSecondLessonRegistrationOperationsFeatureToggleEnabled
                    ?
                    lessons.map((lesson) => (
                        (studentDepartmentNumber == lesson.departmentResponse.departmentId
                                ?
                                lesson.semester === LessonSemester.SECOND
                                    ?
                                    lessonsBySemesters.First.push(lesson)
                                    :
                                    lesson.semester === LessonSemester.FOURTH
                                        ?
                                        lessonsBySemesters.Second.push(lesson)
                                        :
                                        lesson.semester === LessonSemester.SIXTH
                                            ?
                                            lessonsBySemesters.Third.push(lesson)
                                            :
                                            lesson.semester === LessonSemester.EIGHTH
                                                ?
                                                lessonsBySemesters.Fourth.push(lesson)
                                                :
                                                null
                                :
                                null
                        )
                    ))
                    :
                    null
            :
            null
    }

    return (
        <div>
            <SISTitle/>
            <StudentNavbar/>
            {(
                isLessonRegistrationExist
                    ?
                    registrationData.response.status === StudentLessonRegistrationStatus.WAITING
                        ?
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="px-28 py-5 mx-auto space-y-6">
                                <div
                                    className="max-w-7xl mx-auto px-12 py-10 text-center bg-gray-50 rounded-2xl shadow-xl">
                                    <a className="select-none font-phenomenaExtraBold text-4xl text-sis-yellow">
                                        Daha Önce Yapılmış Ders Kaydınız Bulunmaktadır!
                                    </a>
                                </div>
                            </div>
                            <div className="max-w-6xl select-none py-5 mx-auto space-y-6">
                                <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                                    <a className="font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                                        DERS KAYDI YAPTIĞINIZ DERSLER
                                    </a>
                                </div>
                                <div className="flex flex-col">
                                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                            <div
                                                className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                <table className="bg-gray-50 min-w-full divide-y divide-gray-200">
                                                    <thead
                                                        className="font-phenomenaBold text-xl text-gray-500 text-left">
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
                                                    {registrationData.response.lessonResponses.map((studentLessonRegistration) => (
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
                            </div>
                        </div>

                        :
                        registrationData.response.status === StudentLessonRegistrationStatus.APPROVED
                            ?
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <div className="px-28 py-5 mx-auto space-y-6">
                                    <div
                                        className="max-w-7xl mx-auto px-12 py-10 text-center bg-gray-50 rounded-2xl shadow-xl">
                                        <a className="select-none font-phenomenaExtraBold text-4xl text-sis-success">
                                            Ders Kaydınız Başarıyla Tamamlandı Derslerim Ekranından Derslerinizi Kontrol
                                            Edebilirsiniz!
                                        </a>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                    :
                    <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                        <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                            <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                                DERS KAYIT
                            </a>
                            <button
                                onClick={saveRegistrationLesson}
                                type="submit"
                                className="font-phenomenaBold float-right py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                            >
                                DANIŞMAN'IN ONAYINA GÖNDER
                            </button>
                        </div>
                        <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                            <Tab.Group>
                                <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                                    {StudentClassLevel.getAll.map((sClassLevel) => (
                                        sClassLevel.enum !== StudentClassLevel.PREPARATORY
                                        &&
                                        sClassLevel.enum !== StudentClassLevel.FIFTH
                                        &&
                                        sClassLevel.enum !== StudentClassLevel.SIXTH
                                            ?
                                            <Tab
                                                key={sClassLevel.value}
                                                className={({selected}) =>
                                                    classNames(
                                                        'w-full py-2.5 text-xl leading-5 font-phenomenaBold text-sis-yellow rounded-lg',
                                                        'ring-offset-sis-yellow ring-opacity-60',
                                                        selected
                                                            ? 'bg-white shadow'
                                                            : 'text-sis-yellow hover:bg-white/[0.12] hover:text-sis-darkblue'
                                                    )
                                                }
                                            >
                                                {sClassLevel.tr}
                                            </Tab>
                                            :
                                            null
                                    ))}
                                </Tab.List>
                                <Tab.Panels className="mt-2">
                                    {Object.values(lessonsBySemesters).map((lessons) => (
                                        lessons.length !== 0
                                            ?
                                            <Tab.Panel key={lessons.id}
                                                       className={classNames(
                                                           'bg-white rounded-xl p-3',
                                                           ''
                                                       )}>
                                                {lessons.map((lesson) => (
                                                    <ul>
                                                        <li
                                                            key={lesson.lessonId}
                                                            className="relative p-3 rounded-md hover:bg-coolGray-100"
                                                        >

                                                            <a className=" text-sis-darkblue">
                                                                <h2 className="text-xl font-phenomenaExtraBold">
                                                                    {lesson.name}
                                                                </h2>

                                                                <h2 className="text-sis-success float-right font-phenomenaBold text-xl mb-4">
                                                                    <button
                                                                        onClick={() => insertLesson(lesson)}>
                                                                        DERSİ SEÇ
                                                                    </button>
                                                                </h2>
                                                                <h2 className="select-all text-xl font-phenomenaBold">
                                                                    {lesson.lessonId}
                                                                </h2>
                                                            </a>
                                                            <ul className="flex mt-1 space-x-1 text-xl font-phenomenaRegular leading-4 text-sis-darkblue">
                                                                {LessonSemester.getAll.map((lSemester) => (
                                                                    lesson.semester === lSemester.enum
                                                                        ?
                                                                        <li>
                                                                            {lSemester.tr} -
                                                                        </li>
                                                                        :
                                                                        null
                                                                ))}
                                                                <li> {lesson.credit} Kredi</li>
                                                                {
                                                                    lesson.theoreticalHours !== 0
                                                                        ?
                                                                        <li> - {lesson.theoreticalHours} Saat
                                                                            Teori </li>
                                                                        :
                                                                        null
                                                                }
                                                                {
                                                                    lesson.practiceHours !== 0
                                                                        ?
                                                                        <li> - {lesson.practiceHours} Saat
                                                                            Uygulama</li>
                                                                        :
                                                                        null
                                                                }
                                                                {LessonCompulsoryOrElective.getAll.map((lCompulsory) => (
                                                                    lesson.compulsoryOrElective === lCompulsory.enum
                                                                        ?
                                                                        <li> - {lCompulsory.tr}</li>
                                                                        :
                                                                        null
                                                                ))}
                                                            </ul>
                                                        </li>
                                                    </ul>

                                                ))}
                                            </Tab.Panel>
                                            :
                                            <Tab.Panel key={lessons.id}
                                                       className={classNames(
                                                           'bg-white rounded-xl p-3',
                                                           'text-center font-phenomenaBold text-sis-fail text-xl'
                                                       )}>
                                                DERS BULUNAMADI!
                                            </Tab.Panel>
                                    ))}
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                        {(
                            studentLessons.length !== 0
                                ?
                                <div className="flex flex-col">
                                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                                                    {studentLessons.map((lesson) => (
                                                        <tr key={lesson.lessonId}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="ml-0.5">
                                                                        <div
                                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.name}</div>
                                                                        <div
                                                                            className="select-all font-phenomenaRegular text-lg text-gray-500">{lesson.lessonId}</div>
                                                                        {LessonSemester.getAll.map((lSemester) => (
                                                                            lesson.semester === lSemester.enum
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
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.credit}</div>
                                                            </td>
                                                            {
                                                                lesson.theoreticalHours !== 0
                                                                    ?
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div
                                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.theoreticalHours} Saat
                                                                        </div>
                                                                    </td>
                                                                    :
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                    </td>
                                                            }
                                                            {
                                                                lesson.practiceHours !== 0
                                                                    ?
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div
                                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.practiceHours} Saat
                                                                        </div>
                                                                    </td>
                                                                    :
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                    </td>
                                                            }
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {LessonCompulsoryOrElective.getAll.map((lCompulsory) => (
                                                                    lesson.compulsoryOrElective === lCompulsory.enum
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
                                                                lesson.status === lStatus.enum
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

                        <SuccessNotification
                            isOpen={isOpenSuccessChooseLessonNotification}
                            closeNotification={closeSuccessChooseLessonNotification}
                            title="Ders Seçildi!"
                            description="Seçtiğiniz Ders başarıyla listeye eklendi."
                        />

                        <FailNotification
                            isOpen={isOpenFailChooseLessonNotification}
                            closeNotification={closeFailChooseLessonNotification}
                            title="Bu Dersi Zaten Seçtiniz!"
                            description="Bu Ders seçtiğiniz ders listesinde mevcut, lütfen farklı bir ders seçmeyi deneyiniz."
                        />

                        <ProcessNotification
                            isOpen={isOpenProcessingRegistrationLessonNotification}
                            closeNotification={closeProcessingRegistrationLessonNotification}
                            title="Ders Kaydınızı Danışman Onayına Gönderme İsteğiniz İşleniyor..."
                        />

                        <SuccessNotification
                            isOpen={isOpenSuccessRegistrationLessonNotification}
                            closeNotification={closeSuccessRegistrationLessonNotification}
                            title="Ders Kaydınız Başarıyla Oluşturuldu!"
                            description="Ders Kaydınız Danışman Onayına Gönderildi"
                        />

                        <FailNotification
                            isOpen={isOpenFailRegistrationLessonNotification}
                            closeNotification={closeFailRegistrationLessonNotification}
                            title="Ders Kaydınız Oluşturulamadı!"
                            description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                        />
                    </div>
            )}
        </div>
    )
}
