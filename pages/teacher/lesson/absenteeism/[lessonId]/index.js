import SisTeacherStorage from "../../../../../public/storage/teacher/SisTeacherStorage";
import UnauthorizedAccessPage from "../../../../401";
import SISTitle from "../../../../../public/components/page-titles";
import TeacherNavbar from "../../../../../public/components/navbar/teacher/teacher-navbar";
import {useRouter} from "next/router";
import PageNotFound from "../../../../404";
import StudentLessonAbsenteeismController
    from "../../../../../public/api/student/absenteeism/StudentLessonAbsenteeismController";
import StudentLessonAbsenteeismStatus
    from "../../../../../public/constants/student/absenteeism/StudentLessonAbsenteeismStatus";
import {useState} from 'react'
import {isBoolean} from "util";

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
            <PageNotFound user="/officer"/>
        )
    }

    const router = useRouter();

    const [studentsLessonAbsenteeism, setStudentsLessonAbsenteeism] = useState(initStudentsLessonAbsenteeism);
    const changeStudentsLessonAbsenteeism = async (event) => {
        const week = event.target.value
        const studentsLessonAbsenteeismData = await StudentLessonAbsenteeismController.getAllStudentsLessonsAbsenteeismByLessonId(lessonId, week);

        if (studentsLessonAbsenteeismData.success) {
            setStudentsLessonAbsenteeism(studentsLessonAbsenteeismData.response);
        } else {
            await router.push("/404");
        }
    }

    const numberOfCheckbox = (numberOfCheckbox) => {
        const checkBoxNumbers = [];
        for (let number = 1; number <= numberOfCheckbox; number++) {
            checkBoxNumbers.push(number);
        }
        return checkBoxNumbers;
    }

    const addCheckBoxes = () => {
        const checked = true;
        if (!checked){
            return false;
        }else {
            return true
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
                        className="font-phenomenaBold float-right ml-2 py-2 px-4 shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                    >
                        KAYDET
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
                                                    Ders Adı
                                                </th>
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
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{studentLessonAbsenteeism.lessonResponse.name}</div>
                                                                <div
                                                                    className="select-all font-phenomenaRegular text-lg text-gray-500">{studentLessonAbsenteeism.lessonResponse.lessonId}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{studentLessonAbsenteeism.studentResponse.name} {studentLessonAbsenteeism.studentResponse.surname}</div>
                                                                <div
                                                                    className="select-all font-phenomenaRegular text-lg text-gray-500">{studentLessonAbsenteeism.studentResponse.studentId}</div>

                                                                {/*TODO: iş bitince kaldırılacak ve select-all gibi şeyler olmayacak gerekli olmayan yerlerde*/}
                                                                <div
                                                                    className="select-all font-phenomenaRegular text-lg text-gray-500">{studentLessonAbsenteeism.week} .
                                                                    Hafta
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        {numberOfCheckbox(studentLessonAbsenteeism.lessonResponse.theoreticalHours).map((number) =>
                                                            <div className="mt-2 flex items-center">
                                                                <input type="checkbox"
                                                                       id="checkbox"
                                                                       name="checkbox"
                                                                       onClick={addCheckBoxes}
                                                                       className="w-6 h-6 text-sis-darkblue border border-sis-yellow rounded bg-gray-50 focus:ring-sis-yellow focus:ring-sis-yellow dark:border-sis-yellow "/>
                                                                <a
                                                                    className="font-phenomenaRegular ml-2 text-lg text-sis-darkblue">
                                                                    {number}. Saat

                                                                </a>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        {numberOfCheckbox(studentLessonAbsenteeism.lessonResponse.practiceHours).map((number) =>
                                                            <div className="mt-2 flex items-center">
                                                                <input type="checkbox"
                                                                       id="checkbox"
                                                                       className="w-6 h-6 text-sis-darkblue border border-sis-yellow rounded bg-gray-50 focus:ring-sis-yellow focus:ring-sis-yellow dark:border-sis-yellow "/>
                                                                <a
                                                                    className="font-phenomenaRegular ml-2 text-lg text-gray-500">
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