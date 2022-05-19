import SisTeacherStorage from "../../../../../../public/storage/teacher/SisTeacherStorage";
import UnauthorizedAccessPage from "../../../../../401";
import SISTitle from "../../../../../../public/components/page-titles";
import TeacherNavbar from "../../../../../../public/components/navbar/teacher/teacher-navbar";
import PageNotFound from "../../../../../404";
import StudentLessonAbsenteeismController
    from "../../../../../../public/api/student/absenteeism/StudentLessonAbsenteeismController";
import StudentLessonAbsenteeismStatus
    from "../../../../../../public/constants/student/absenteeism/StudentLessonAbsenteeismStatus";
import {useState} from 'react'
import {useRouter} from "next/router";
import SelectedNotification from "../../../../../../public/notifications/selected";

export async function getServerSideProps(context) {
    const teacherId = SisTeacherStorage.getNumberWithContext(context);
    if (teacherId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const {lessonId, week} = context.query;
    const weekData = await StudentLessonAbsenteeismController.getTotalLessonAbsenteeismWeek();
    const studentsLessonAbsenteeismData = await StudentLessonAbsenteeismController.getAllStudentsLessonsAbsenteeismByLessonId(lessonId, week);
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
                initWeek: week,
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
                                                               initWeek,
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


    const [studentsLessonAbsenteeism] = useState(initStudentsLessonAbsenteeism);
    const initAbsenteeismIdsAndTheoreticalHoursAndPracticeHours = new Map();
    const tempHoursMap = new Map()
    {
        initStudentsLessonAbsenteeism.map((studentLessonAbsenteeism) => (
            studentLessonAbsenteeism.lessonResponse.theoreticalHours !== 0
                ?
                (
                    tempHoursMap.set("theoreticalHours", studentLessonAbsenteeism.lessonResponse.theoreticalHours),
                        initAbsenteeismIdsAndTheoreticalHoursAndPracticeHours.set(studentLessonAbsenteeism.id, tempHoursMap)
                )
                :
                null,
                studentLessonAbsenteeism.lessonResponse.practiceHours !== 0
                    ?
                    (
                        tempHoursMap.set("practiceHours", studentLessonAbsenteeism.lessonResponse.practiceHours),
                            initAbsenteeismIdsAndTheoreticalHoursAndPracticeHours.set(studentLessonAbsenteeism.id, tempHoursMap)
                    )
                    :
                    null
        ))
    }

    const [absenteeismIdsAndTheoreticalHoursAndPracticeHours] = useState(initAbsenteeismIdsAndTheoreticalHoursAndPracticeHours);

    const router = useRouter();

    const pushPage = async (week) => {
        await router.push(`/teacher/lesson/absenteeism/${lessonId}/${week}`)
        router.reload()
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
        if (prevTheoreticalHours !== undefined) {
            hoursMap.set('theoreticalHours', (prevTheoreticalHours + hours))
        }

        const prevPracticeHours = prevHours.get('practiceHours')
        if (prevPracticeHours !== undefined) {
            hoursMap.set('practiceHours', prevPracticeHours)
        }

        absenteeismIdsAndTheoreticalHoursAndPracticeHours.set(absenteeismId, hoursMap)
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
        if (prevTheoreticalHours !== undefined) {
            hoursMap.set('theoreticalHours', (prevTheoreticalHours))
        }

        const prevPracticeHours = prevHours.get('practiceHours')
        if (prevPracticeHours !== undefined) {
            hoursMap.set('practiceHours', (prevPracticeHours + hours))
        }

        absenteeismIdsAndTheoreticalHoursAndPracticeHours.set(absenteeismId, hoursMap)
    }

    const createArrayListWithHoursValue = (hours) => {
        const numbers = [];
        for (let number = 1; number <= hours; number++) {
            numbers.push(number);
        }
        return numbers;
    }

    let [isOpenSelectedUpdateStudentsLessonAbsenteeismNotification, setIsOpenSelectedUpdateStudentsLessonAbsenteeismNotification] = useState(false);

    function closeSelectedUpdateStudentsLessonAbsenteeismNotification() {
        setIsOpenSelectedUpdateStudentsLessonAbsenteeismNotification(false);
    }

    function openSelectedUpdateStudentsLessonAbsenteeismNotification() {
        setIsOpenSelectedUpdateStudentsLessonAbsenteeismNotification(true);
    }

    const updateStudentsLessonAbsenteeism = () => {
        StudentLessonAbsenteeismController.updateStudentsLessonAbsenteeism(operationUserId, absenteeismIdsAndTheoreticalHoursAndPracticeHours)
        pushPage(initWeek).then(r => "")
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
                    {
                        (
                            studentsLessonAbsenteeism[0].status === 'ENTERED'
                                ?
                                null
                                :
                                <button
                                    onClick={openSelectedUpdateStudentsLessonAbsenteeismNotification}
                                    className="font-phenomenaBold float-right ml-2 py-2 px-4 shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                                >
                                    DEVAMSIZLIKLARI KAYDET
                                </button>
                        )
                    }
                    <div className="inline-grid grid-cols-2 gap-2">
                        <div className="col-span-7 sm:col-span-6">
                            <select
                                onChange={(event) => {
                                    pushPage(event.target.value)
                                }}
                                id="weekNames"
                                name="weekNames"
                                autoComplete="weekNames"
                                className="font-phenomenaRegular py-1.5 text-gray-700 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                            >
                                {(weeksNumbers.map((weekNumber) =>
                                    weekNumber == initWeek
                                        ?
                                        <option key={weekNumber} value={weekNumber}
                                                selected>{weekNumber + '. Hafta'}</option>
                                        :
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
                                                    {
                                                        studentLessonAbsenteeism.theoreticalHoursState === 'ENTERED'
                                                            ?
                                                            <td className="px-2 py-4 whitespace-nowrap">
                                                                {createArrayListWithHoursValue((studentLessonAbsenteeism.lessonResponse.theoreticalHours)).map((number) =>
                                                                    <div className="mt-2 flex items-center">
                                                                        <input type="checkbox"
                                                                               id="theoretical-hours-checkbox"
                                                                               name="theoretical-hours-checkbox"
                                                                               value="1"
                                                                               checked={!(studentLessonAbsenteeism.theoreticalHours > (studentLessonAbsenteeism.lessonResponse.theoreticalHours - number))}
                                                                               disabled
                                                                               className="w-6 h-6 text-gray-300 rounded bg-gray-50"/>
                                                                        <a
                                                                            className="font-phenomenaBold ml-2 text-lg text-gray-400">
                                                                            {number}. Saat
                                                                        </a>
                                                                    </div>
                                                                )}
                                                            </td>
                                                            :
                                                            <td className="px-2 py-4 whitespace-nowrap">
                                                                {createArrayListWithHoursValue(studentLessonAbsenteeism.lessonResponse.theoreticalHours).map((number) =>
                                                                    <div className="mt-2 flex items-center">
                                                                        <input type="checkbox"
                                                                               id="theoretical-hours-checkbox"
                                                                               name="theoretical-hours-checkbox"
                                                                               value="1"
                                                                               onClick={(event) => updateTheoreticalHoursValuesInMap(event, studentLessonAbsenteeism.id)}
                                                                               className="w-6 h-6 text-sis-darkblue border border-sis-yellow rounded bg-gray-50 focus:ring-sis-yellow focus:ring-sis-yellow dark:border-sis-yellow cursor-pointer"/>
                                                                        <a
                                                                            className="font-phenomenaBold ml-2 text-lg text-sis-darkblue">
                                                                            {number}. Saat
                                                                        </a>
                                                                    </div>
                                                                )}
                                                            </td>

                                                    }
                                                    {
                                                        studentLessonAbsenteeism.practiceHoursState === 'ENTERED'
                                                            ?
                                                            <td className="px-2 py-4 whitespace-nowrap">
                                                                {createArrayListWithHoursValue(studentLessonAbsenteeism.lessonResponse.practiceHours).map((number) =>
                                                                    <div className="mt-2 flex items-center">
                                                                        <input type="checkbox"
                                                                               id="theoretical-hours-checkbox"
                                                                               name="theoretical-hours-checkbox"
                                                                               value="1"
                                                                               checked={!(studentLessonAbsenteeism.practiceHours > (studentLessonAbsenteeism.lessonResponse.practiceHours - number))}
                                                                               disabled
                                                                               onClick={(event) => updateTheoreticalHoursValuesInMap(event, studentLessonAbsenteeism.id)}
                                                                               className="w-6 h-6 text-gray-300 rounded bg-gray-50"/>
                                                                        <a
                                                                            className="font-phenomenaBold ml-2 text-lg text-gray-400">
                                                                            {number}. Saat
                                                                        </a>
                                                                    </div>
                                                                )}
                                                            </td>
                                                            :
                                                            <td className="px-2 py-4 whitespace-nowrap">
                                                                {createArrayListWithHoursValue(studentLessonAbsenteeism.lessonResponse.practiceHours).map((number) =>
                                                                    <div className="mt-2 flex items-center">
                                                                        <input type="checkbox"
                                                                               id="theoretical-hours-checkbox"
                                                                               name="theoretical-hours-checkbox"
                                                                               value="1"
                                                                               onClick={(event) => updatePracticeHoursValuesInMap(event, studentLessonAbsenteeism.id)}
                                                                               className="w-6 h-6 text-sis-darkblue border border-sis-yellow rounded bg-gray-50 focus:ring-sis-yellow focus:ring-sis-yellow dark:border-sis-yellow cursor-pointer"/>
                                                                        <a
                                                                            className="font-phenomenaBold ml-2 text-lg text-sis-darkblue">
                                                                            {number}. Saat
                                                                        </a>
                                                                    </div>
                                                                )}
                                                            </td>
                                                    }
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
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                )}
            </div>

            <SelectedNotification
                isOpen={isOpenSelectedUpdateStudentsLessonAbsenteeismNotification}
                closeNotification={closeSelectedUpdateStudentsLessonAbsenteeismNotification}
                title="Devamsızlıkları Kaydetmek İstediğinize Emin Misiniz?"
                description="Kaydetme sonrası aynı hafta için not girişi yapamayacaksınız, seçimleri doğru yaptığınıza emin olunuz!"
                acceptOnClick={updateStudentsLessonAbsenteeism}
            />
        </div>
    )
}
