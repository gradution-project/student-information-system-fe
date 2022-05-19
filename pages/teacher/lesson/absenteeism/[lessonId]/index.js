import SisTeacherStorage from "../../../../../public/storage/teacher/SisTeacherStorage";
import UnauthorizedAccessPage from "../../../../401";
import SISTitle from "../../../../../public/components/page-titles";
import TeacherNavbar from "../../../../../public/components/navbar/teacher/teacher-navbar";
import PageNotFound from "../../../../404";
import StudentLessonAbsenteeismController
    from "../../../../../public/api/student/absenteeism/StudentLessonAbsenteeismController";
import StudentLessonAbsenteeismStatus
    from "../../../../../public/constants/student/absenteeism/StudentLessonAbsenteeismStatus";
import {useState} from 'react'
import {useRouter} from "next/router";
import ProcessNotification from "../../../../../public/notifications/process";
import SuccessNotification from "../../../../../public/notifications/success";
import FailNotification from "../../../../../public/notifications/fail";


export async function getServerSideProps(context) {
    const teacherId = SisTeacherStorage.getNumberWithContext(context);
    if (teacherId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const {lessonId} = context.query;
    const weekData = await StudentLessonAbsenteeismController.getTotalLessonAbsenteeismWeek();
    const studentsLessonAbsenteeismData = await StudentLessonAbsenteeismController.getAllStudentsLessonsAbsenteeismByLessonId(lessonId, 1);

    if (studentsLessonAbsenteeismData.success && weekData.success) {

        const weeksNumbers = [];
        for (let number = 1; number <= weekData.response; number++) {
            weeksNumbers.push(number);
        }

        return {
            props: {
                isPagePermissionSuccess: true,
                isDataFound: true,
                operationUserId: teacherId,
                initStudentsLessonAbsenteeism: studentsLessonAbsenteeismData.response,
                weeksNumbers: weeksNumbers,
                lessonId: lessonId
            }
        }
    } else {
        return {
            props: {
                isPagePermissionSuccess: true,
                isDataFound: false
            }
        }
    }
}

export default function TeacherLessonAbsenteeismDetailList({
                                                               isPagePermissionSuccess,
                                                               isDataFound,
                                                               operationUserId,
                                                               initStudentsLessonAbsenteeism,
                                                               weeksNumbers,
                                                               lessonId
                                                           }) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="teacher"/>
        )
    }

    if (!isDataFound) {
        return (
            <PageNotFound user="/teacher"/>
        )
    }

    let [isOpenFailAbsenteeismApiNotification, setIsOpenFailAbsenteeismApiNotification] = useState(false);

    function closeFailAbsenteeismApiNotification() {
        setIsOpenFailAbsenteeismApiNotification(false);
    }

    function openFailAbsenteeismApiNotification() {
        setIsOpenFailAbsenteeismApiNotification(true);
    }

    const [studentsLessonAbsenteeism, setStudentsLessonAbsenteeism] = useState(initStudentsLessonAbsenteeism);
    const changeStudentsLessonAbsenteeism = async (event) => {
        const week = event.target.value
        const studentsLessonAbsenteeismData = await StudentLessonAbsenteeismController.getAllStudentsLessonsAbsenteeismByLessonId(lessonId, week);

        if (studentsLessonAbsenteeismData.success) {
            setStudentsLessonAbsenteeism(studentsLessonAbsenteeismData.response);
        } else {
            openFailAbsenteeismApiNotification();
        }
    }


    const absenteeismIdsAndTheoreticalHoursAndPracticeHours = new Map();
    const tempHoursMap = new Map();
    {
        studentsLessonAbsenteeism.map((studentLessonAbsenteeism) => (
            (
                studentLessonAbsenteeism.lessonResponse.theoreticalHours !== 0
                    ?
                    (
                        tempHoursMap.set("theoreticalHours", studentLessonAbsenteeism.lessonResponse.theoreticalHours),
                            absenteeismIdsAndTheoreticalHoursAndPracticeHours.set(studentLessonAbsenteeism.id, tempHoursMap)
                    )
                    :
                    null,
                    studentLessonAbsenteeism.lessonResponse.practiceHours !== 0
                        ?
                        (
                            tempHoursMap.set("practiceHours", studentLessonAbsenteeism.lessonResponse.practiceHours),
                                absenteeismIdsAndTheoreticalHoursAndPracticeHours.set(studentLessonAbsenteeism.id, tempHoursMap)
                        )
                        :
                        null
            )
        ))

    }

    const updateTheoreticalHoursValuesInMap = (event, absenteeismId) => {
        const isCheckBoxChecked = event.target.checked
        if (isCheckBoxChecked) {
            setTheoreticalHoursToMap(absenteeismId, -1)
        } else {
            setTheoreticalHoursToMap(absenteeismId, +1)
        }
    }

    const setTheoreticalHoursToMap = (absenteeismId, hours) => {
        const prevHours = absenteeismIdsAndTheoreticalHoursAndPracticeHours.get(absenteeismId)

        const hoursMap = new Map()
        const prevTheoreticalHours = prevHours.get('theoreticalHours')
        hoursMap.set('theoreticalHours', (prevTheoreticalHours + hours))
        const prevPracticeHours = prevHours.get('practiceHours')
        hoursMap.set('practiceHours', prevPracticeHours)

        absenteeismIdsAndTheoreticalHoursAndPracticeHours.set(absenteeismId, prevHours)

    }

    const updatePracticeHoursValuesInMap = (event, absenteeismId) => {
        const isCheckBoxChecked = event.target.checked
        if (isCheckBoxChecked) {
            setPracticeHoursToMap(absenteeismId, -1)
        } else {
            setPracticeHoursToMap(absenteeismId, +1)
        }

    }

    const setPracticeHoursToMap = (absenteeismId, hours) => {
        const prevHours = absenteeismIdsAndTheoreticalHoursAndPracticeHours.get(absenteeismId)

        const hoursMap = new Map()
        const prevTheoreticalHours = prevHours.get('theoreticalHours')
        hoursMap.set('theoreticalHours', (prevTheoreticalHours))
        const prevPracticeHours = prevHours.get('practiceHours')
        hoursMap.set('practiceHours', (prevPracticeHours + hours))

        absenteeismIdsAndTheoreticalHoursAndPracticeHours.set(absenteeismId, prevHours)

    }

    const createArrayListWithHoursValue = (hours) => {
        const numbers = [];
        for (let number = 1; number <= hours; number++) {
            numbers.push(number);
        }
        return numbers;
    }

    const router = useRouter();

    let [isOpenProcessingLessonAbsenteeismNotification, setIsOpenProcessingLessonAbsenteeismNotification] = useState(false);

    function closeProcessingLessonAbsenteeismNotification() {
        setIsOpenProcessingLessonAbsenteeismNotification(false);
    }

    function openProcessingLessonAbsenteeismNotification() {
        setIsOpenProcessingLessonAbsenteeismNotification(true);
    }

    let [isOpenSuccessLessonAbsenteeismNotification, setIsOpenSuccessLessonAbsenteeismNotification] = useState(false);

    function closeSuccessLessonAbsenteeismNotification() {
        setIsOpenSuccessLessonAbsenteeismNotification(false);
        router.reload();
    }

    function openSuccessLessonAbsenteeismNotification() {
        setIsOpenSuccessLessonAbsenteeismNotification(true);
    }

    let [isOpenFailLessonAbsenteeismNotification, setIsOpenFailLessonAbsenteeismNotification] = useState(false);

    function closeFailLessonAbsenteeismNotification() {
        setIsOpenFailLessonAbsenteeismNotification(false);
    }

    function openFailLessonAbsenteeismNotification() {
        setIsOpenFailLessonAbsenteeismNotification(true);
    }

    const updateStudentsLessonAbsenteeism = async (event) => {
        openProcessingLessonAbsenteeismNotification();

        event.preventDefault();

        const studentsLessonAbsenteeismData = await StudentLessonAbsenteeismController.updateStudentsLessonAbsenteeism(operationUserId, Object.fromEntries(absenteeismIdsAndTheoreticalHoursAndPracticeHours));
        if (studentsLessonAbsenteeismData.success) {
            closeProcessingLessonAbsenteeismNotification();
            openSuccessLessonAbsenteeismNotification();
        } else {
            closeProcessingLessonAbsenteeismNotification();
            openFailLessonAbsenteeismNotification();
        }
    }

    return (
        <div>
            <SISTitle/>
            <TeacherNavbar/>
            <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                    <a className="select-none mr-2 font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                        ÖĞRENCİ DEVAMSIZLIK LİSTESİ
                    </a>
                    <button
                        onClick={updateStudentsLessonAbsenteeism}
                        className="font-phenomenaBold float-right ml-2 py-2 px-4 shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                    >
                        DEVAMSIZLIKLARI KAYDET
                    </button>
                    <div className="inline-grid grid-cols-2 gap-2">
                        <div className="col-span-7 sm:col-span-6">
                            <select
                                onChange={changeStudentsLessonAbsenteeism}
                                id="weekNames"
                                name="weekNames"
                                autoComplete="weekNames"
                                className="font-phenomenaRegular py-1.5 text-gray-700 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                            >
                                {(weeksNumbers.map((weekNumber) =>
                                    <option key={weekNumber} value={weekNumber}>{weekNumber + '. Hafta'}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {(
                    studentsLessonAbsenteeism.length !== 0
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
                                                    ÖĞRENCİ
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
                                                    DURUMU
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {studentsLessonAbsenteeism.map((studentLessonAbsenteeism) => (
                                                <tr key={studentLessonAbsenteeism.id}>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{studentLessonAbsenteeism.studentResponse.name} {studentLessonAbsenteeism.studentResponse.surname}</div>
                                                                <div
                                                                    className="select-all font-phenomenaRegular text-lg text-gray-500">{studentLessonAbsenteeism.studentResponse.studentId}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        {createArrayListWithHoursValue(studentLessonAbsenteeism.lessonResponse.theoreticalHours).map((number) =>
                                                            <div className="mt-2 flex items-center">
                                                                <input type="checkbox"
                                                                       id="theoretical-hours-checkbox"
                                                                       name="theoretical-hours-checkbox"
                                                                       onChange={(event) => updateTheoreticalHoursValuesInMap(event, studentLessonAbsenteeism.id)}
                                                                       className="w-6 h-6 text-sis-yellow border border-sis-yellow rounded bg-gray-50 focus:ring-0 focus:ring-sis-yellow dark:border-sis-yellow cursor-pointer"/>
                                                                <a
                                                                    className="font-phenomenaBold ml-2 text-lg text-sis-darkblue">
                                                                    {number}. Saat

                                                                </a>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        {createArrayListWithHoursValue(studentLessonAbsenteeism.lessonResponse.practiceHours).map((number) =>
                                                            <div className="mt-2 flex items-center">
                                                                <input type="checkbox"
                                                                       id="practice-hours-checkbox"
                                                                       name="practice-hours-checkbox"
                                                                       onClick={(event) => updatePracticeHoursValuesInMap(event, studentLessonAbsenteeism.id)}
                                                                       className="w-6 h-6 text-sis-darkblue border border-sis-yellow rounded bg-gray-50 focus:ring-0 focus:ring-sis-yellow dark:border-sis-yellow cursor-pointer"/>
                                                                <a
                                                                    className="font-phenomenaBold ml-2 text-lg text-gray-500">
                                                                    {number}. Saat
                                                                </a>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span>
                                                            {StudentLessonAbsenteeismStatus.getAll.map((lStatus) => (
                                                                studentLessonAbsenteeism.status === lStatus.enum
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
                                            {/**
                                             * Lesson Absenteeism Notification
                                             */}
                                            <ProcessNotification
                                                isOpen={isOpenProcessingLessonAbsenteeismNotification}
                                                closeNotification={closeProcessingLessonAbsenteeismNotification}
                                                title="Öğrenci Ders Devamsızlıkları Kaydedeliyor..."
                                            />

                                            <SuccessNotification
                                                isOpen={isOpenSuccessLessonAbsenteeismNotification}
                                                closeNotification={closeSuccessLessonAbsenteeismNotification}
                                                title="Öğrenci Ders Devamsızlıkları Kaydedildi"
                                                description="Öğrencilere ait ders devamsızlıkları kaydedildi."

                                            />

                                            <FailNotification
                                                isOpen={isOpenFailLessonAbsenteeismNotification}
                                                closeNotification={closeFailLessonAbsenteeismNotification}
                                                title="Öğrenci Ders Devamsızlıkları Kaydedilemedi!"
                                                description="Sistemsel bir hatadan dolayı öğrenci ders devamsızlıkları kaydedilemedi."
                                            />

                                            {/**
                                             * Lesson Absenteeism Api Notification
                                             */}

                                            <FailNotification
                                                isOpen={isOpenFailAbsenteeismApiNotification}
                                                closeNotification={closeFailAbsenteeismApiNotification}
                                                title="Kayıt Bulunamadı"
                                            />
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
